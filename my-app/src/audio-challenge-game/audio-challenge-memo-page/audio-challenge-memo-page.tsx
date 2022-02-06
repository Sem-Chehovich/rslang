import { levels } from '../audio-challenge-constants';
import './audio-challenge-memo-page.css';

export default function RenderAudioChallengeMemo() {
  return (
    <>
    <section className='audio-challenge-memo-page'>
      <div className='audio-challenge-memo'>
        <h2>Audio challenge</h2>
        <p>Improve your listening comprehension and auditory memory.</p>
        <p>You must choose the right meaning of the word you will hear.</p>
        <p>Select word difficulty level:</p>
        <div className='audio-challenge-memo__game-levels'>
          {levels.map((level: number) => 
            <button key={level} className='audio-challenge-memo__game-levels-btn'><p>{level}</p></button>
          )}
        </div>
      </div>
    </section>
    </>
  );
}
