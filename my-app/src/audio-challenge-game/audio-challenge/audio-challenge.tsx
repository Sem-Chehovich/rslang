import { levels } from '../audio-challenge-constants';
import './audio-challenge.css';
import React, { useState } from 'react';
import { audioChallengeApiService } from '../audio-challenge-api-service/api-service';
import { AudioChallengeCard } from '../audio-challenge-card/audio-challenge-card';
import { Spinner } from '../../spinner/spinner';
import { shuffleWords, getRandomNum, getCorrectUrl, sliceArrIntoChunks } from '../../utilities/utilities';
import { Word } from '../../interface/interface';
import { AudioChallengeScore } from '../audio-challenge-score/audio-challenge-score';

export type AnswerObject = {
  answer: string,
  correctAnswer: Word,
  correct: boolean,
  correctAnswerAudioHandler: React.MouseEventHandler
}

export let wordsArr = [] as Array<Word>;

export const AudioChallenge: React.FC = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [words, setWords] = useState<Array<Array<Word>>>([]); 
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<AnswerObject[]>([]);
  const [isAnswered] = useState<Array<boolean>>([]);
  const [gameOver, setGameOver] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [isOpenFromDictionary] = useState(localStorage.getItem('isAudioGameTurnOnByDictionary'))

   React.useEffect(() => {
    
    console.log(isOpenFromDictionary)
    
    async function renderPage() {
      setLoading(true);
      const section = localStorage.getItem('section') as string
      let pageNumber1 = (+(localStorage.getItem('page') as string) - 1) + ''
      let pageNumber2

      if (pageNumber1 === '0') {
         pageNumber2 = '29';
      } else {
        pageNumber2 = (+pageNumber1 - 1) + ''
      }
      
      await audioChallengeApiService.getWords(pageNumber1, section)
      .then((data) => {
        wordsArr.push(...data);
      })
  
      await audioChallengeApiService.getWords(pageNumber2, section)
      .then((data) => {
        wordsArr.push(...data);
      })
  
      generateMixedArray(wordsArr);
      setGameOver(false);
      setLoading(false);
    }

    isOpenFromDictionary && renderPage()
    return function cleanUp() {
      localStorage.removeItem('isAudioGameTurnOnByDictionary')
    }
  }, [isOpenFromDictionary])

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setLoading(true);
    const id = (event.target as HTMLButtonElement).id as string;

    setDifficulty(Number(id));

    let pageNumber1 = getRandomNum(0, 29) as number;
    let pageNumber2 = getRandomNum(0, 29) as number;
    await audioChallengeApiService.getWords(pageNumber1.toString(), difficulty.toString())
    .then((data) => {
      wordsArr.push(...data);
    })

    while (pageNumber1 === pageNumber2) {
      pageNumber2 = getRandomNum(0, 29) as number;
    }

    await audioChallengeApiService.getWords(pageNumber2.toString(), difficulty.toString())
    .then((data) => {
      wordsArr.push(...data);
    })

    generateMixedArray(wordsArr);
    setGameOver(false);
    setLoading(false);
  }

  const showRightAnswer = () => {
    const audioBtn = document.querySelector('.audio-challenge-card__audio-btn') as HTMLElement;
    const answerImage = document.querySelector('.audio-challenge-card__answer-img') as HTMLImageElement;
    const answerWord = document.querySelector('.audio-challenge-card__right-answer-word') as HTMLElement;
    audioBtn.style.width = '70px';
    audioBtn.style.height = '70px';
    answerImage.style.display = 'block';
    answerWord.style.display = 'block';
  }

  const hideRightAnswer = () => {
    const audioBtn = document.querySelector('.audio-challenge-card__audio-btn') as HTMLElement;
    const answerImage = document.querySelector('.audio-challenge-card__answer-img') as HTMLImageElement;
    const answerWord = document.querySelector('.audio-challenge-card__right-answer-word') as HTMLElement;
    audioBtn.style.width = '120px';
    audioBtn.style.height = '120px';
    answerImage.style.display = 'none';
    answerWord.style.display = 'none';
  }

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLElement>;
    const challengeNextBtn = document.querySelector('.audio-challenge-card__next-btn') as HTMLElement;
    const chosenAnswer = event.currentTarget.value as string;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;
    let isCorrect = false as boolean;
    isAnswered.push(true);

    if (challengeNextBtn.innerHTML === 'I don\'t know') {
      showRightAnswer();
      challengeNextBtn.innerHTML = 'Next';
      event.currentTarget.style.textDecoration = 'line-through';
      answerBtns.forEach((x) => {
       if (x.innerHTML === correctAnswer.wordTranslate) {
        x.innerHTML = `<u>${x.innerHTML}</u>`;
       }});
    }

    if (chosenAnswer === correctAnswer.wordTranslate) {
      setScore(score + 1);
      isCorrect = true;
      event.currentTarget.style.textDecoration = 'underline';
    }

    const handleSoundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const sound = new Audio();
      sound.src = getCorrectUrl(correctAnswer.audio as string);
      sound.play();
    }

    const answerObject = {
      answer: chosenAnswer,
      correctAnswer: correctAnswer,
      correct: isCorrect,
      correctAnswerAudioHandler: handleSoundClick
    } as AnswerObject;

    setChosenAnswers((prev) => [...prev, answerObject]);
  }

  const handleNextQuestionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLElement>;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;

    if (event.currentTarget.innerHTML === 'I don\'t know') {
      event.currentTarget.innerHTML = 'Next';
      showRightAnswer();
      answerBtns.forEach((x) => {
        if (x.innerHTML === correctAnswer.wordTranslate) {
         x.innerHTML = `<u>${x.innerHTML}</u>`;
        }});
    } else {
      hideRightAnswer();
      answerBtns.forEach((btn) => {
        btn.style.textDecoration = 'none';
      });
      event.currentTarget.innerHTML = 'I don\'t know'

      const handleSoundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const sound = new Audio();
        sound.src = getCorrectUrl(correctAnswer.audio as string);
        sound.play();
      }

      if (isAnswered[questionNumber] !== true) {
        isAnswered.push(false);
      }

      if (questionNumber < 9) {
        setQuestionNumber(questionNumber + 1);
      } else {
        setGameOver(true);
        setShowScore(true);
        setQuestionNumber(0);
      }

      const answerObject = {
        answer: '',
        correctAnswer: correctAnswer,
        correct: false,
        correctAnswerAudioHandler: handleSoundClick
      } as AnswerObject;

      if (chosenAnswers[questionNumber] === undefined) {
        setChosenAnswers((prev) => [...prev, answerObject]);
      }
    }
  }

  const handleExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGameOver(true);
    setShowScore(false);
    setScore(0);
    setQuestionNumber(0);
    setChosenAnswers([]);
  }

  const generateMixedArray = (arr: Array<Word>) => {
    arr = shuffleWords(arr);
    setWords(sliceArrIntoChunks(arr));
  }

  return (
    <div className='audio-challenge'>
      {loading === true ? <Spinner /> : 
        gameOver === true && showScore === false && !isOpenFromDictionary ?
        <section className='audio-challenge-memo-page'>
          <div className='audio-challenge-memo'>
            <h2>Audio challenge</h2>
            <p>Improve your listening comprehension and auditory memory.</p>
            <p>You must choose the right meaning of the word you will hear.</p>
            <p>Select word difficulty level:</p>
            <div className='audio-challenge-memo__game-levels'>
              {levels.map((level: number, index: number) =>
                <button key={index} id={index.toString()} onClick={handleClick} className='audio-challenge-memo__game-levels-btn'>{level}</button>
              )}
            </div>
          </div>
        </section>
        :
        (showScore === false ? 
          <AudioChallengeCard words={words[questionNumber]} 
          handleAnswerClick={handleAnswerClick}
          handleNextQuestionClick={handleNextQuestionClick}/>
          : 
          <section className='audio-challenge-memo-page'>
            <AudioChallengeScore answers={chosenAnswers} handleExitClick={handleExitClick} score={score} />
          </section>)     
        }
    </div>
  );
}
