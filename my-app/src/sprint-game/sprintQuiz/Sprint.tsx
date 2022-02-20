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
import { IWord } from '../../types/sprint';
import { gePercentage, getCurrentDate, getRandomNum, setUserInitialStatistics } from '../../utilities/utilities';
import { useNavigate } from 'react-router';
import ScrollCrid from '../sprintResults/sprintResults';
import { createUserWord, getUserStatistics, getUserWord, updateUserWord, upsetUserStatistics } from '../service';
import { IUserStatistic, IUserWord } from '../../interface/interface';


const currDateStr = getCurrentDate();
const initStatOptional: IUserStatistic = {
  learnedWords: 0,
  optional: {
    date: currDateStr,
    sprintGame: {
      newWord: 0,
      questionsCount: 0,
      rightAnsCount: 0,
      percentage: 0,
      longestBatch: 0,
    },
    audioGame: {
      newWord: 0,
      rightAnsCount: 0,
      longestBatch: 0,
    }
  }
}

const initSprintWordOpt: IUserWord = {
  difficulty: 'weak',
  optional: {
    sprintGame: {
      date: currDateStr,
      newWord: true,
      wrongAns: 0,
      rightAns: 0,
      totalRightAns: 0,
    },
    audioGame: {
      date: '',
      newWord: true,
      wrongAns: 0,
      rightAns: 0,
      totalRightAns: 0,
    }
  } 
}

const Sprint: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [corrrectAnsCounter, setCorrrectAnsCounter] = useState(1);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isSoudOn, setSoundOn] = useState(false);
  const [isCorrect] = useState<Array<boolean>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(10);
  const { questions, group, score, page, pagePathSecond, userInGame } = useTypedSelector(state => state.sprint);
  const { fetchWords, setResults, setScore, setPage, setPagePath, clearWords, setPagePathSecond } = useActions();
  const navigate = useNavigate();
  const [randAns, setRandAns] = useState(0);
  
  let timerId = setTimeout(() => {
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

  async function checkWord(wordId: string, wordOptional: IUserWord) {
    const userWord = await getUserWord(wordId);
    const currDateStr = getCurrentDate();
    const userSt = await setUserInitialStatistics();
     
    if (typeof userWord === 'number') {
      if (wordOptional.optional.sprintGame.wrongAns === 1) { 
        wordOptional.difficulty = 'strong';
        wordOptional.optional.sprintGame.totalRightAns = 0;
      } else {
        initStatOptional.optional.sprintGame.rightAnsCount += 1;
        wordOptional.difficulty = 'weak';
      }
      await createUserWord(wordId, wordOptional);
    } else {
      if (typeof userWord !== 'number') {
        if (userWord.optional.sprintGame.date === '' || userWord.optional.sprintGame.date === currDateStr) { 
          if (userWord.optional.sprintGame.date === '') initStatOptional.optional.sprintGame.newWord += 1;
          wordOptional.optional.sprintGame.newWord = true;
        } else {
          wordOptional.optional.sprintGame.newWord = false;
        }
  
        if (wordOptional.optional.sprintGame.rightAns === 1) { 
          initStatOptional.optional.sprintGame.rightAnsCount += 1;
          wordOptional.optional.sprintGame.rightAns += userWord.optional.sprintGame.rightAns;
        } else {
          wordOptional.optional.sprintGame.wrongAns += userWord.optional.sprintGame.wrongAns;
        }
  
        if (wordOptional.optional.sprintGame.wrongAns === 1) { 
          wordOptional.difficulty = 'strong';
          wordOptional.optional.sprintGame.totalRightAns = 0;
        } else {
          wordOptional.optional.sprintGame.totalRightAns += userWord.optional.sprintGame.rightAns;
        }
  
        if (wordOptional.optional.sprintGame.totalRightAns >= 3) {
          wordOptional.difficulty = 'weak';
        }
  
        wordOptional.optional.audioGame.date = userWord.optional.audioGame.date;
        wordOptional.optional.audioGame.newWord = userWord.optional.audioGame.newWord;
        wordOptional.optional.audioGame.rightAns = userWord.optional.audioGame.rightAns;
        wordOptional.optional.audioGame.wrongAns = userWord.optional.audioGame.wrongAns;
        wordOptional.optional.audioGame.totalRightAns = userWord.optional.audioGame.totalRightAns;
      }
      await updateUserWord(wordId, wordOptional);
    } 

    if (typeof userSt !== 'number') {
      if (userSt.optional.sprintGame.longestBatch < isCorrect.length) {
        initStatOptional.optional.sprintGame.longestBatch = isCorrect.length;
      } else {
        initStatOptional.optional.sprintGame.longestBatch = userSt.optional.sprintGame.longestBatch;
      }

      initStatOptional.learnedWords = userSt.learnedWords + 1;
      initStatOptional.optional.sprintGame.newWord = userSt.optional.sprintGame.newWord + 1;
      initStatOptional.optional.sprintGame.percentage = 
        gePercentage(initStatOptional.optional.sprintGame.rightAnsCount, initStatOptional.optional.sprintGame.questionsCount);
      
      initStatOptional.optional.audioGame.longestBatch = userSt.optional.audioGame.longestBatch;
      initStatOptional.optional.audioGame.newWord = userSt.optional.audioGame.newWord;
      initStatOptional.optional.audioGame.rightAnsCount = userSt.optional.audioGame.rightAnsCount;

    }
    await upsetUserStatistics(initStatOptional);
  }

  function isCorrectAnswer(question: IWord[], answerId: string, btn: string) {
    let  ans: boolean;
    initStatOptional.optional.sprintGame.questionsCount += 1;

    if (question[0].id === answerId) { 
      ans = btn === '1' ? true : false;
      isCorrect.push(ans);

      if (userInGame === true)  { 
        initSprintWordOpt.optional.sprintGame.rightAns = ans === true ? 1 : 0;
        initSprintWordOpt.optional.sprintGame.wrongAns = ans === true ? 0 : 1;
        initSprintWordOpt.optional.sprintGame.totalRightAns = ans === true ? 1 : 0;
        
        checkWord(question[0].id, initSprintWordOpt);  
      } 

      return [{ questions: question, isRight: ans }];
    } 
    
    ans = btn === '0' ? true : false;
    isCorrect.push(ans);
    if (userInGame === true)  { 
      initSprintWordOpt.optional.sprintGame.rightAns = ans === true ? 1 : 0;
      initSprintWordOpt.optional.sprintGame.wrongAns = ans === true ? 0 : 1;
      initSprintWordOpt.optional.sprintGame.totalRightAns = ans === true ? 1 : 0;

      checkWord(question[0].id, initSprintWordOpt);
    } 

    return [{ questions: question, isRight: ans }];
  }

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

    if (questionNumber % 15 === 0 && questionNumber !== 0 && pagePathSecond !== 'isSprintFromDictionary') {
      let nextPage: number;
      nextPage = page + 1;
      
      setPage(nextPage);
      fetchWords(group, nextPage);
    }

    const numb = questionNumber + 1;
    setQuestionNumber(numb);
  }

  document.onkeydown = function(e) {
    switch ((e || window.event).keyCode) {
      case 37:
        const res1 = isCorrectAnswer([questions[questionNumber]], questions[randAns].id, '0');
        setResults(res1);
        checkAnswer();
        setRandAns(getRandomNum(questionNumber, questions.length - 1));
      break;
      case 39:
        const res2 = isCorrectAnswer([questions[questionNumber]], questions[randAns].id, '1');
        setResults(res2);
        checkAnswer();
        setRandAns(getRandomNum(questionNumber, questions.length - 1));
      break;
    }
  }

  const nextQuestion = (e: React.MouseEvent) => {    
    const target = e.target as HTMLElement;
    const btn = target.dataset.btn!;
    const res = isCorrectAnswer([questions[questionNumber]], questions[randAns].id, btn);
    setResults(res);
    checkAnswer();

    if (questionNumber === questions.length - 1) {
      clearTimeout(timerId);
      setGameOver(true);
    }

    setRandAns(getRandomNum(questionNumber, questions.length - 1));
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
    clearWords([]);
    setResults([]);
    setPagePath('');
    if (pagePathSecond === 'isSprintFromDictionary') {
      setPagePathSecond('');
      navigate('/textbook');
    } else {
      navigate('/game');
    }
    
    clearTimeout(timerId);
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
              { questions.slice(questionNumber, questionNumber + 1).map(q => <div key={q.id}>{q.word}</div>) }
            </div>
            <div className='answer'>
              { questions.slice(randAns, randAns + 1).map(q => <div key={q.id}>{q.wordTranslate}</div>) } 
            </div>
          </div>
          <div className='game-keys'>
            <button className='answer-btn key-wrong' data-btn={0} onClick={(e) => nextQuestion(e)}>&#8249; Неверно</button>
            <button className='answer-btn key-right' data-btn={1} onClick={(e) => nextQuestion(e)}>Верно &#8250;</button>
          </div>
        </div>
      </div>
      : 
        <ScrollCrid />
      }
    </div>
)}

export default Sprint;
