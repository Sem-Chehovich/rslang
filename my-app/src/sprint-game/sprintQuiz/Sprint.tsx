import './Sprint.css';
import './timer.scss'
import pokemon1 from '../../assets/png/pokemon1.png';
import pokemon2 from '../../assets/png/pokemon2.png';
import pokemon3 from '../../assets/png/pokemon3.png';
import pokemon4 from '../../assets/png/pokemon4.png';
import wrongAnswer from '../../assets/sounds/wrongAnswer.mp3';
import rightAnswer from '../../assets/sounds/rightAnswer.mp3';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import React, { useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { IResult, IWord } from '../../types/sprint';
import { getRandomNum } from '../../utilities/utilities';
import { useNavigate } from 'react-router';
import ScrollCrid from '../sprintResults/sprintResults';



const Sprint: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [corrrectAnsCounter, setCorrrectAnsCounter] = useState(1);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isSoudOn, setSoundOn] = useState(false);
  const [isCorrect, setIsCorrect] = useState<Array<boolean>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(10);
  const { questions, group, score } = useTypedSelector(state => state.sprint);
  const { fetchWords, setResults, setScore } = useActions();
  const navigate = useNavigate();
  
  // setTimeout(() => {
  //   const box = document.querySelector('.sprint-page__game') as HTMLElement;
  //   box.style.borderColor = 'rgb(243 233 233 / 70%)';
  // }, 500);


  setTimeout(() => {
    setGameOver(true);
  }, 60000);

  const showRightAnswer = (corrrectAnsCounter: number) => {
    const bulb1 = document.querySelector('.bulb-1') as HTMLElement;
    const bulb2 = document.querySelector('.bulb-2') as HTMLElement;
    const bulb3 = document.querySelector('.bulb-3') as HTMLElement;

    const color = 'invert(37%) sepia(70%) saturate(329%) hue-rotate(5deg) brightness(89%) contrast(90%)';
    const white = '';

    switch (corrrectAnsCounter) {
      case 0:
        bulb1.style.filter = white;
        bulb2.style.filter = white;
        bulb3.style.filter = white;
        break;
      case 1:
        bulb1.style.filter = color;
        bulb2.style.filter = white;
        bulb3.style.filter = white;
        break;
      case 2:
        bulb2.style.filter = color;
        bulb3.style.filter = white;
        break;
      case 3:
        setCorrrectAnsCounter(0);
        bulb3.style.filter = color;
        break;
      default:
        bulb1.style.filter = white;
        bulb2.style.filter = white;
        bulb3.style.filter = white;
    }
  }

  function soundOn(answerSound: string) {
    const sound = new Audio(answerSound);
    sound.play();
  }

  function isCorrectAnswer(question: IWord[], answerId: string, btn: string): IResult[] {
    let  ans: boolean;

    if (question[0].id === answerId) { 
      ans = btn === '1' ? true : false;
      isCorrect.push(ans);
      return [{ questions: question, isRight: ans }];
    } 
    
    ans = btn === '0' ? true : false;
    isCorrect.push(ans);
    return [{ questions: question, isRight: ans }];
  }

  const randomAns = getRandomNum(questionNumber);

  const wordEng = questions.slice(questionNumber, questionNumber + 1);
  const wordRu = questions.slice(randomAns, randomAns + 1);

  const checkAnswer = () => {
    let number: number; 
    const box = document.querySelector('.sprint-page__game') as HTMLElement;

    if (isCorrect[isCorrect.length - 1] === false) {
      box.style.borderColor = '#a70b0b'; 
      setCorrrectAnsCounter(1);
      showRightAnswer(0); 
      isCorrect.length = 0;
      setPoints(10);
      if (isSoudOn === false) {
        soundOn(wrongAnswer);
      }
      
    } else {
      setScore(points)
      box.style.borderColor = '#25a70b';
      number = corrrectAnsCounter + 1
      setCorrrectAnsCounter(number);
      showRightAnswer(corrrectAnsCounter); 
      if (isSoudOn === false) {
        soundOn(rightAnswer);
      }

      if (isCorrect.length % 4 === 0) { 
        setPoints(points + 10);
      }
    }  


    if (questionNumber > 15) {
      const page = getRandomNum(0, 29);
      setQuestionNumber(0);
      fetchWords(group, page);
    } else {
      const number = questionNumber + 1;
      setQuestionNumber(number);
    }
  }

  document.onkeydown = function(e) {
    switch ((e || window.event).keyCode) {
      case 37:
        const res1 = isCorrectAnswer(wordEng, wordRu[0].id, '0');
        setResults(res1);
        checkAnswer();
      break;
      case 39:
        const res2 = isCorrectAnswer(wordEng, wordRu[0].id, '1');
        setResults(res2);
        checkAnswer();
      break;
    }
  }

  const nextQuestion = (e: React.MouseEvent) => {    
    const target = e.target as HTMLElement;
    const btn = target.dataset.btn!;
    const res = isCorrectAnswer(wordEng, wordRu[0].id, btn);
    setResults(res);
    checkAnswer();
  }

  const fullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  }

  const onSoundOn = () => {
    if (isSoudOn === false) {
      setSoundOn(true);
    } else {
      setSoundOn(false);
    }
  }

  const backPage = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate('/game');
  }

  return (
    <div className='sprint-page'>
      <div className='sprint-page__controls'>
        <div className='sprint-btn back-icon' onClick={() => backPage()}></div>
        <div className='game-control'>
          <div className={ isSoudOn === false ? 'sprint-btn sound-icon' : 'sprint-btn sound-of-icon'} onClick={() => onSoundOn()}></div>
          <div className={ isFullScreen === false ? 'sprint-btn screen-icon' : 'sprint-btn compress-screen-icon'} onClick={(e) => fullScreen()}></div>
        </div>       
      </div>
       { gameOver === false ?
      <div className='game-box'>
        <div className='sprint-page__game-data'>
          <div className='sprint-page__timer'>
            <div className="wrapper">
              <div className="timer">
                <div className="border"></div>
              </div>
            </div>
          </div>
          <div className='game-points'>+{points} очков</div> 
          <div className='sprint-page__score'>{ score }</div>
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
              <img className='pokemon pokemon2' style={isCorrect.length > 3 ? {visibility: 'visible'} : {visibility: 'hidden'} } src={pokemon2} alt="pokemon2" />
              <img className='pokemon pokemon3' style={isCorrect.length > 7 ? {visibility: 'visible'} : {visibility: 'hidden'} } src={pokemon3} alt="pokemon3" />
              <img className='pokemon pokemon4' style={isCorrect.length > 11 ? {visibility: 'visible'} : {visibility: 'hidden'} } src={pokemon4} alt="pokemon4" />
            </div>           
          </div>
          <div className='question-box'>
            <div className='question'>
              { wordEng.map(q => <div key={q.id}>{q.word}</div>) }
            </div>
            <div className='answer'>
              { wordRu.map(q => <div key={q.id}>{q.wordTranslate}</div>) }
            </div>
          </div>
          <div className='game-keys'>
            <button className='answer-btn key-wrong' data-btn={0} onClick={(e) => nextQuestion(e)}>Неверно</button>
            <button className='answer-btn key-right' data-btn={1} onClick={(e) => nextQuestion(e)}>Верно</button>
          </div>
        </div>
      </div>
      : 
        <ScrollCrid />
      }
    </div>
)}

export default Sprint;
