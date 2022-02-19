import { useNavigate } from 'react-router-dom';
import './categoryPage.css';
import { useActions } from '../../hooks/useActions';
import { getRandomNum } from '../../utilities/utilities';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { checkUser } from '../service';
import React from 'react';
import { clearWords } from '../../store/action-creators/sprint';


const levels = [1, 2, 3, 4, 5, 6];

const GameCategories = () => {
  const navigate = useNavigate();
  const { pagePathSecond, questions } = useTypedSelector(state => state.sprint);
  const { fetchWords, setGroup, setPage, setPagePath, setPagePathSecond, setUserInGame } = useActions();
  
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const group = target.dataset.group!;
    const startPage = getRandomNum(0, 29);

    const userIn = checkUser();
    userIn === 'authorized' ? setUserInGame(true) : setUserInGame(false);
    
    setPagePath('game-page');
    setPage(startPage);
    setGroup(Number(group));
    fetchWords(Number(group), startPage);
    
    navigate('/sprint');
  }

  const clickSingleBtn = () => {
    const group = Number(localStorage.getItem('section')) | 0;
    const startPage = Number(localStorage.getItem('page')) | 0;

    setPagePath('game-page');
    setGroup(group);
    setPage(startPage - 1);
    let prevPage = startPage;

    const userIn = checkUser();
    if (userIn === 'unauthorized') { 
      setUserInGame(false);

      while (prevPage--) {
        fetchWords(group, prevPage);
      }
    }

    navigate('/sprint');
  }

  const backPage = () => {
    clearWords([]);
    setPagePath('');
    if (pagePathSecond === 'isSprintFromDictionary') {
      setPagePathSecond('');
      navigate('/textbook');
    } else {
      navigate('/home');
    }
  }

  return (
    <div className='game-categories-page'>
      <div className='game-categories__controls'>
        <div className='sprint-btn back-icon' onClick={() => backPage()}></div>
      </div> 
      <section>
          { pagePathSecond === 'isSprintFromDictionary' ?
              questions.length !== 0 ? 
              <div className='game-categories__box'>
                <h2 className='sprint-categories__title'>Sprint</h2>
                <p>Test yourself, indicate if the translation of the word we showed you is correct.</p>
                <p>You will have only one minute!</p>
                <div className='sprint-categories'> 
                  <button className='sprint-play__btn' onClick={clickSingleBtn}>Play</button>
                </div>
              </div>
              :
              <div className='game-categories__box'>
                  <div className='victorious-icon'></div>
                  <h2 className='sprint-categories__title green'>Good job!</h2>
                  <p>You have learned all words from this and the previous pages of this section</p>
              </div>
            :
            <div className='game-categories__box'>
              <h2 className='sprint-categories__title'>Sprint</h2>
              <p>Test yourself, indicate if the translation of the word we showed you is correct.</p>
              <p>You will have only one minute!</p>
              <div className='sprint-categories'>
                {levels.map((level: number, index) => 
                  <button key={level} className='sprint-categories__btn' data-group={index} onClick={handleClick}>{level}</button>
                )}
              </div>
            </div>
          }
      </section>
    </div>
  );
}

export default GameCategories;
