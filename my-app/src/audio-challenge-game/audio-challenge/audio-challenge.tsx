import { levels } from '../audio-challenge-constants';
import './audio-challenge.css';
import React, { useState } from 'react';
import { audioChallengeApiService } from '../audio-challenge-api-service/api-service';
import { AudioChallengeCard } from '../audio-challenge-card/audio-challenge-card';
import { Spinner } from '../../spinner/spinner';
import { shuffleWords, getRandomNum, getCorrectUrl } from '../../utilities/utilities';
import { Word } from '../../interface/interface';
import { AudioChallengeScore } from '../audio-challenge-score/audio-challenge-score';

export type AnswerObject = {
  answer: string,
  correctAnswer: Word,
  correct: boolean,
  correctAnswerAudioHandler: React.MouseEventHandler
}

export let wordsArr = [] as Array<Word>;

export const AudioChallenge: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [words, setWords] = useState<Array<Array<Word>>>([]); 
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [showScore, setShowScore] = useState(false);

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

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const chosenAnswer = event.currentTarget.value as string;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;
    let isCorrect = false as boolean;

    if (chosenAnswer === correctAnswer.wordTranslate) {
      setScore(score + 1);
      isCorrect = true;
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
    console.log(answerObject)
  }

  const handleNextQuestionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (questionNumber < 9) {
      setQuestionNumber(questionNumber + 1);
    } else {
      setGameOver(true);
      setShowScore(true);
    }
  }

  const handleExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGameOver(true);
    setShowScore(false);
    setQuestionNumber(0);
  }

  const generateMixedArray = (arr: Array<Word>) => {
    arr = shuffleWords(arr);
    setWords(sliceArrIntoChunks(arr));
  }

  const sliceArrIntoChunks = (arr: Array<Word>) => {
    const CHUNK_SIZE = 4 as number;
    const result = [] as Array<Array<Word>>;

    for (let i = 0; i < arr.length; i += CHUNK_SIZE) {
      const chunk = arr.slice(i, i + CHUNK_SIZE);

      for (let j = 0; j < chunk.length; j++) {
        chunk[j] = {
          ...chunk[j],
          isRight: false
        }
      }

      chunk[getRandomNum(0, CHUNK_SIZE - 1)].isRight = true;
      result.push(chunk);
    }

    return result;
  }

  return (
    <div className='audio-challenge'>
      {loading === true ? <Spinner /> : 
        gameOver === true && showScore === false ?
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
