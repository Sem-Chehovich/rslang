import {  } from '../audioChallengeConstants';
import './audioChallengeCard.css';
import React from 'react';
import { Word } from '../../interface/interface';
import { getCorrectUrl } from '../../utilities/utilities';

type Props = {
  words: Array<Word>,
  handleAnswerClick: React.MouseEventHandler,
  handleNextQuestionClick: React.MouseEventHandler,
  isRightAnswerShown: boolean
}

export const AudioChallengeCard: React.FC<Props> = ({words, handleAnswerClick, handleNextQuestionClick, isRightAnswerShown}) => {
  let rightAnswer = words.find((x) => x.isRight === true) as Word;

  const handleSoundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const sound = new Audio();
    sound.src = getCorrectUrl(rightAnswer.audio as string);
    sound.play();
  }

  return (
    <div className='audio-challenge-card'>
    <div className='audio-challenge-card__audio-container'>
      <img className={ isRightAnswerShown === true ? 'audio-challenge-card__answer-img_active' : 'audio-challenge-card__answer-img' } src={getCorrectUrl(rightAnswer.image as string)} alt='' />
      <div className='audio-challenge-card__right-answer'>
        <button className={ isRightAnswerShown === true ? 'audio-challenge-card__audio-btn_active' : 'audio-challenge-card__audio-btn' } onClick={handleSoundClick}>
          <i className='fa fa-volume-up fa-3x'></i>
        </button>
        <h2 className={ isRightAnswerShown === true ? 'audio-challenge-card__right-answer-word_active' : 'audio-challenge-card__right-answer-word' }>{rightAnswer.word}</h2>
      </div>
    </div>
    <div className='audio-challenge-card__words'>
      {words.map((word: Word, index: number) => 
        <button key={index} value={word.wordTranslate as string} onClick={handleAnswerClick} className='audio-challenge-card__words-btn'>{word.wordTranslate}</button>
      )};
    </div>
    <button onClick={handleNextQuestionClick} className='audio-challenge-card__next-btn'>I don't know</button>
  </div>
  )
}
