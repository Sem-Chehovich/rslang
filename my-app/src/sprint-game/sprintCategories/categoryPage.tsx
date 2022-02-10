import { useNavigate } from 'react-router-dom';
import './categoryPage.css';

const levels = [1, 2, 3, 4, 5, 6];

const GameCategories = () => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const group = target.dataset.group!;
    navigate('/sprint');
    localStorage.setItem('groupSprint', group);
  }

  return (
    <div className='game-categories-page'>
      <section>
        <div className='game-categories__box'>
          <h2 className='sprint-categories__title'>Sprint</h2>
          <p>Test yourself, indicate if the translation of the word we showed you is correct.</p>
          <p>You will have only one minute!</p>
          <p>Select word difficulty level:</p>
          <div className='sprint-categories'>
            {levels.map((level: number, index) => 
              <button key={level} className='sprint-categories__btn' data-group={index} onClick={handleClick}>{level}</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameCategories;
