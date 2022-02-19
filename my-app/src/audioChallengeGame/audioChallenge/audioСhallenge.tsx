import { levels } from '../audioChallengeConstants';
import './audioСhallenge.css';
import React, { useState } from 'react';
import { AudioChallengeCard } from '../audioChallengeCard/audioChallengeCard';
import { Spinner } from '../../spinner/spinner';
import { shuffleWords, getRandomNum, getCorrectUrl, sliceArrIntoChunks } from '../../utilities/utilities';
import { Word, IUserWord } from '../../interface/interface';
import { AudioChallengeScore } from '../audioChallengeScore/audioChallengeScore';
import { wordPageApiService } from '../../wordsPage/service/wordPageApiService';
import { isAuthorizedUser } from '../../authorization/validateToken';
import wrongAnswer from '../../assets/sounds/wrongAnswer.mp3';
import rightAnswer from '../../assets/sounds/rightAnswer.mp3';

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
  const [isRightAnswerShown, setIsRightAnswerShown] = useState(false);
  const [isOpenFromDictionary] = useState(localStorage.getItem('isAudioGameTurnOnByDictionary'));
  const [isSoundOn, setSoundOn] = useState(false);

  React.useEffect(() => {
    
    console.log(isOpenFromDictionary);
    
    async function renderPage() {
      setLoading(true);
      const section = localStorage.getItem('section') as string;
      let pageNumber1 = (+(localStorage.getItem('page') as string) - 1) + '';
      let pageNumber2: string;

      if (pageNumber1 === '0') {
         pageNumber2 = '29';
      } else {
        pageNumber2 = (+pageNumber1 - 1) + '';
      }
      
      await wordPageApiService.getWords(pageNumber1, section)
      .then((data) => {
        wordsArr.push(...data as any);
      })
  
      await wordPageApiService.getWords(pageNumber2, section)
      .then((data) => {
        wordsArr.push(...data as any);
      })
  
      generateMixedArray(wordsArr);
      setGameOver(false);
      setLoading(false);
    }

    isOpenFromDictionary && renderPage()
    return function cleanUp() {
      localStorage.removeItem('isAudioGameTurnOnByDictionary');
    }
  }, [isOpenFromDictionary]);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setLoading(true);
    const id = (event.target as HTMLButtonElement).id as string;

    setDifficulty(Number(id));

    let pageNumber1 = getRandomNum(0, 29) as number;
    let pageNumber2 = getRandomNum(0, 29) as number;
    await wordPageApiService.getWords(pageNumber1.toString(), difficulty.toString())
    .then((data) => {
      
      wordsArr.push(...data as any);
    })

    while (pageNumber1 === pageNumber2) {
      pageNumber2 = getRandomNum(0, 29) as number;
    }

    await wordPageApiService.getWords(pageNumber2.toString(), difficulty.toString())
    .then((data) => {
      wordsArr.push(...data as any);
    })

    generateMixedArray(wordsArr);
    setGameOver(false);
    setLoading(false);
    isAuthorizedUser();
  }

  async function pushNewWord(wordId: string, isRight: boolean) {
    const userId = localStorage.getItem('userId') as string;

    if (userId != null) {
      const userWords = await wordPageApiService.getAllUserWords(userId) as Array<IUserWord>;
      userWords.filter((word: IUserWord) => word.difficulty !== 'weak');
      const currDate = new Date() as Date;
      const currDateStr = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}` as string;
      console.log(userWords)
      let dbWord = userWords.find((dbWord: IUserWord) => dbWord.wordId === wordId) as IUserWord;

      if (dbWord === undefined) {
        // console.log('новое');
        const progressObj = {
          difficulty: 'strong',
          optional: {
            audioGame: {
              date: currDateStr,
              newWord: true,
              wrongAns: isRight ? 0 : 1,
              rightAns: isRight ? 1 : 0,
              totalRightAns: isRight ? 1 : 0,
            },
            sprintGame: {
              date: '',
              newWord: true,
              wrongAns: 0,
              rightAns: 0,
              totalRightAns: 0,
            }
          }
        };
        await wordPageApiService.createUserWord(userId, wordId as string, progressObj);
      } else {
        // console.log('было уже!');
        let audioGameObj = Object.assign(dbWord?.optional?.audioGame);
        let wordDifficulty = dbWord.difficulty;
        let data = {} as IUserWord;
        if (audioGameObj['date'] === currDateStr) {
          audioGameObj['newWord'] = true;
        } else {
          audioGameObj['newWord'] = false;
        }

        if (isRight) {
          audioGameObj['rightAns'] = audioGameObj['rightAns'] + 1;
          audioGameObj['totalRightAns'] = audioGameObj['totalRightAns'] + 1;
        } else {
          audioGameObj['wrongAns'] = audioGameObj['wrongAns'] + 1;
          audioGameObj['totalRightAns'] = 0;
          wordDifficulty = 'strong';
        }

        if (audioGameObj['totalRightAns'] === 3) {
          wordDifficulty = 'weak';
        } else {
          wordDifficulty = 'strong';
          audioGameObj['totalRightAns'] = 0;
        }
        data.difficulty = wordDifficulty;
        data.optional.audioGame = audioGameObj;
        data.optional.sprintGame.date = dbWord.optional.sprintGame.date;
        data.optional.sprintGame.newWord = dbWord.optional.sprintGame.newWord;
        data.optional.sprintGame.rightAns = dbWord.optional.sprintGame.rightAns;
        data.optional.sprintGame.wrongAns = dbWord.optional.sprintGame.wrongAns;
        data.optional.sprintGame.totalRightAns = dbWord.optional.sprintGame.totalRightAns;

        await wordPageApiService.updateUserWord(userId, wordId as string, data);
      }
    }
  }

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLButtonElement>;
    const challengeNextBtn = document.querySelector('.audio-challenge-card__next-btn') as HTMLButtonElement;
    const chosenAnswer = event.currentTarget.value as string;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;
    let isCorrect = false as boolean;
    isAnswered.push(true);

    if (challengeNextBtn.innerHTML === 'I don\'t know') {
      setIsRightAnswerShown(true);
      challengeNextBtn.innerHTML = 'Next';
      event.currentTarget.style.textDecoration = 'line-through';
      answerBtns.forEach((x) => {
       if (x.innerHTML === correctAnswer.wordTranslate) {
        x.innerHTML = `<u>${x.innerHTML}</u>`;
       }});
    }

    answerBtns.forEach((x) => {
      x.setAttribute('disabled', 'disabled');
    })

    if (chosenAnswer === correctAnswer.wordTranslate) {
      setScore(score + 1);
      isCorrect = true;
      event.currentTarget.style.textDecoration = 'underline';
      if (!isSoundOn) {
        soundOn(rightAnswer);
      }
    } else {
      if (!isSoundOn) {
        soundOn(wrongAnswer);
      }
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
    pushNewWord(correctAnswer.id as string, isCorrect);
  }

  const handleNextQuestionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLElement>;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;

    answerBtns.forEach((x) => {
      x.removeAttribute('disabled');
    })

    if (event.currentTarget.innerHTML === 'I don\'t know') {
      event.currentTarget.innerHTML = 'Next';
      setIsRightAnswerShown(true);
      if (!isSoundOn) {
        soundOn(wrongAnswer);
      }
      answerBtns.forEach((x) => {
        if (x.innerHTML === correctAnswer.wordTranslate) {
         x.innerHTML = `<u>${x.innerHTML}</u>`;
        }});
    } else {
      setIsRightAnswerShown(false);
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

  const onSoundOn = () => {
    if (!isSoundOn) {
      setSoundOn(true);
    } else {
      setSoundOn(false);
    }
  }

  function soundOn(answerSound: string) {
    const sound = new Audio(answerSound);
    sound.play();
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
          isRightAnswerShown={isRightAnswerShown}
          handleAnswerClick={handleAnswerClick}
          handleNextQuestionClick={handleNextQuestionClick}
          isSoundOn={isSoundOn}
          onSoundOn={onSoundOn}/>
          : 
          <section className='audio-challenge-memo-page'>
            <AudioChallengeScore answers={chosenAnswers} handleExitClick={handleExitClick} score={score} />
          </section>)     
        }
    </div>
  );
}
