import {  } from '../audio-challenge-constants';
import './audio-challenge-page.css';

interface RightAnswer {
  [key: string]: string
}

export default function RenderAudioChallengePage() {
  const words = ['green', 'blue', 'yellow', 'red'] as Array<string>;
  return (
    <div className='audio-challenge-page'>
      <button className='audio-challenge-page__close-btn'>
        <i className='fa fa-times fa-3x'></i>
      </button>
      <div className='audio-challenge-page__audio-container'>
        <img className='audio-challenge-page__answer-img' src="" alt="" />
        <div className='audio-challenge-page__right-answer'>
          <button className='audio-challenge-page__audio-btn'>
            <i className='fa fa-volume-up fa-3x'></i>
          </button>
          <h2>ashamed</h2>
        </div>
      </div>
      <div className='audio-challenge-page__words'>
        {words.map((word: string) => 
            <button key={word} className='audio-challenge-page__words-btn'><h3>{word}</h3></button>
          )}
      </div>
      <button className='audio-challenge-page__next-btn'><h3>Next word</h3></button>
    </div>
  );
}
