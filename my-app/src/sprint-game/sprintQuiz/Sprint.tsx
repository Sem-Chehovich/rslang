import './Sprint.css';
import './timer.scss'
import pokemon1 from '../../assets/png/pokemon1.png';
import pokemon2 from '../../assets/png/pokemon2.png';
import pokemon3 from '../../assets/png/pokemon3.png';
import pokemon4 from '../../assets/png/pokemon4.png';

const Sprint = () => {

  return (
    <div className='sprint-page'>
      <div className='sprint-page__controls'>
        <div className='sprint-btn back-icon'></div>
        <div className='game-control'>
          <div className='sprint-btn sound-icon'></div>
          <div className='sprint-btn screen-icon'></div>
        </div>       
      </div>
      <div className='game-box'>
        <div className='sprint-page__game-data'>
          <div className='sprint-page__timer'>
            <div className="wrapper">
              <div className="timer">
                <div className="border"></div>
              </div>
            </div>
          </div>
          <div className='game-points'>+10 очков</div> 
          <div className='sprint-page__score'>0</div>
        </div>
        <div className='sprint-page__game'>
          <div className='game-controls'>
            <div className='lightbulbs'>
              <div className='bulbs bulb-1'></div>
              <div className='bulbs bulb-2'></div>
              <div className='bulbs bulb-3'></div>
            </div> 
            <div className='score-imgs'>
              <img className='pokemon pokemon1' src={pokemon1} alt="pokemon1" />
              <img className='pokemon pokemon2' src={pokemon2} alt="pokemon2" />
              <img className='pokemon pokemon3' src={pokemon3} alt="pokemon3" />
              <img className='pokemon pokemon4' src={pokemon4} alt="pokemon4" />
            </div>           
          </div>
          <div className='question-box'>
            <div className='question'>Word</div>
            <div className='answer'>Слово</div>
          </div>
          <div className='game-keys'>
            <button className='answer-btn key-wrong'>Неверно</button>
            <button className='answer-btn key-right'>Верно</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sprint;
