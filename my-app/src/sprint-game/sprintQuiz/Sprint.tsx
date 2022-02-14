import './Sprint.css';
import './timer.scss'
import pokemon1 from '../../assets/png/pokemon1.png';
import pokemon2 from '../../assets/png/pokemon2.png';
import pokemon3 from '../../assets/png/pokemon3.png';
import pokemon4 from '../../assets/png/pokemon4.png';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { IResult, IWord } from '../../types/sprint';
import { getRandomNum } from '../../utilities/utilities';


const Sprint: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [corrrectAnsCounter, setCorrrectAnsCounter] = useState(1);
  const [isCorrect, setIsCorrect] = useState<Array<boolean>>([]);
  const [points, setPoints] = useState(10);
  const { questions, group, results } = useTypedSelector(state => state.sprint);
  const { fetchWords, setResults } = useActions();

  const showRightAnswer = (corrrectAnsCounter: number) => {
    console.log(corrrectAnsCounter);
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

  const nextQuestion = (e: React.MouseEvent) => {
    let number: number;
    const target = e.target as HTMLElement;
    const btn = target.dataset.btn!;
    const res = isCorrectAnswer(wordEng, wordRu[0].id, btn);
    setResults(res);
    const box = document.querySelector('.sprint-page__game') as HTMLElement;
    box.style.borderColor = 'rgb(243 233 233 / 70%)';

    if (isCorrect[isCorrect.length - 1] === false) {
      box.style.borderColor = '#a70b0b'; 
      setCorrrectAnsCounter(1);
      console.log(isCorrect);
      showRightAnswer(0); 
      isCorrect.length = 0;
      setPoints(10);
    } else {
      box.style.borderColor = '#25a70b';
      number = corrrectAnsCounter + 1
      setCorrrectAnsCounter(number);
      console.log(isCorrect);  
      showRightAnswer(corrrectAnsCounter); 
      if (isCorrect.length % 4 === 0) { 
        setPoints(points + 10);
      }
    }  


    if (questionNumber > 15) {
      setQuestionNumber(0);
      fetchWords(group);
    } else {
      const number = questionNumber + 1;
      setQuestionNumber(number);
    }
  }

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
          <div className='game-points'>+{points} очков</div> 
          <div className='sprint-page__score'>{ questionNumber }</div>
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
      <div>
        {
          results.map(res => 
            res.questions.map(r => <div key={r.id}>{r.word}
            { res.isRight ? ' yes' : ' no' }
          </div>))}
      </div>
    </div>
  );
}

export default Sprint;
