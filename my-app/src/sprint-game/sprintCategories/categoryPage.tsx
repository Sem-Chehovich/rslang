import { useNavigate } from 'react-router-dom';
import './categoryPage.css';
import { useActions } from '../../hooks/useActions';
import { getRandomNum } from '../../utilities/utilities';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { checkUser } from '../serviсe';


const levels = [1, 2, 3, 4, 5, 6];

const GameCategories = () => {
  const navigate = useNavigate();
  const { pagePathSecond, questions } = useTypedSelector(state => state.sprint);
  const { fetchWords, setGroup, setPage, setPagePath, setPagePathSecond, setUserInGame } = useActions();
  
  const handleClick = async (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const group = target.dataset.group!;
    const page = getRandomNum(0, 29);

    const userIn = checkUser();
    userIn === 'authorized' ? setUserInGame(true) : setUserInGame(false);
    
    setPagePath('game-page');
    setPage(page);
    setGroup(Number(group));
    fetchWords(Number(group), page);
    
    navigate('/sprint');
  }

  const clickSingleBtn = () => {
    const group = localStorage.getItem('section')!;
    const page = localStorage.getItem('page')!;

    setPagePath('game-page');
    setGroup(Number(group));
    setPage(Number(page) - 1);

    const userIn = checkUser();
    if (userIn === 'authorized') { 
      setUserInGame(true);
      fetchWords(Number(group), Number(page) - 1, userIn);
    } else { 
      setUserInGame(false);
      fetchWords(Number(group),Number(page) - 1);
    }

    if (questions.length === 0) {
      console.log('Все слова выучены');
      
    }
    
    navigate('/sprint');
  }

  const backPage = () => {
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
        <div className='game-categories__box'>
          <h2 className='sprint-categories__title'>Sprint</h2>
          <p>Test yourself, indicate if the translation of the word we showed you is correct.</p>
          <p>You will have only one minute!</p>
          { pagePathSecond === 'isSprintFromDictionary' ?
            <div className='sprint-categories'> 
              <button className='sprint-play__btn' onClick={clickSingleBtn}>Play</button>
            </div>
            :
            <div className='sprint-categories'>
              {levels.map((level: number, index) => 
                <button key={level} className='sprint-categories__btn' data-group={index} onClick={handleClick}>{level}</button>
              )}
            </div>
          }
        </div>
      </section>
    </div>
  );
}

export default GameCategories;
