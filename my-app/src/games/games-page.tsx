import './games-page.css';
import { Link } from 'react-router-dom';
import { items } from '../main-page/main-page-constants';
import { NavigationLink } from '../main-page/header/header';

export const GamesPage: React.FC = () => {
  const games = [items.find((x) => x.value === '"Audio challenge"'), items.find((x) => x.value === '"Sprint"')] as Array<NavigationLink>;
  return (
    <div className='games-page'>
    {games.map((game, index: number) => 
      <div key={index} className='games-page-item'>
      <i className={'fa fa-'+ game.icon + ' fa-4x'}></i>
      <h3>{game.value}</h3>
      <p>{game.info}</p>
      <Link to={game.href}>
        <button className='games-page-item__play-btn'>Play</button>
      </Link>
      </div>
      )}
    </div>
  )
}