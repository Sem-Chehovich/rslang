import {  } from '../audio-challenge-constants';
import './audio-challenge-card.css';
import React from 'react';
import { Word } from '../../interface/interface';
import { getCorrectUrl } from '../../utilities/utilities';

type Props = {
  words: Array<Word>,
  handleAnswerClick: React.MouseEventHandler,
  handleNextQuestionClick: React.MouseEventHandler
}

export const AudioChallengeCard: React.FC<Props> = ({words, handleAnswerClick, handleNextQuestionClick}) => {
  let rightAnswer = words.find((x) => x.isRight === true) as Word;

  const handleSoundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const sound = new Audio();
    sound.src = getCorrectUrl(rightAnswer.audio as string);
    sound.play();
  }

  return (
    <div className='audio-challenge-page'>
    <div className='audio-challenge-page__audio-container'>
      <img className='audio-challenge-page__answer-img' src={getCorrectUrl(rightAnswer.image as string)} alt='' />
      <div className='audio-challenge-page__right-answer'>
        <button className='audio-challenge-page__audio-btn' onClick={handleSoundClick}>
          <i className='fa fa-volume-up fa-3x'></i>
        </button>
        <h2 className='audio-challenge-page__right-answer-word'>{rightAnswer.word}</h2>
      </div>
    </div>
    <div className='audio-challenge-page__words'>
      {words.map((word: Word, index: number) => 
        <button key={index} value={word.wordTranslate as string} onClick={handleAnswerClick} className='audio-challenge-page__words-btn'>{word.wordTranslate}</button>
      )};
    </div>
    <button onClick={handleNextQuestionClick} className='audio-challenge-page__next-btn'>Next word</button>
  </div>
  )
}
