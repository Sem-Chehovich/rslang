// import { isAuthorizedUser } from '../authorization/validateToken';
import { statisticsItems } from './statisticsConstants';
import './statistics.css';

export interface statisticsItem {
  [key: string]: string
}

export const Statistics: React.FC = () => {
  return (
    <div className='statistics-page'>
      <h2>Statistics for today</h2>
      <div className='statistics-page__cards'>
        {statisticsItems.map((item: statisticsItem, index: number) =>
          <div key={index} className='statistics-page__cards-item'>
            <h3>{item.name}</h3>
            <p>New words: 0</p>
            <p>Correct answers: 0%</p>
            <p>{item.adds}</p>
          </div>
        )}
      </div>
    </div>
  )
}
