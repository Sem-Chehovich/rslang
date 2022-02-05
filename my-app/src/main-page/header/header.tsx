import './header.css';
import { items } from '../main-page-constants';

export interface NavigationLinks {
  [key: string]: string
}

function Header() {
  return (
    <nav className='header'>
      <div className='header__content'>
        <ul className='header__content-list'>
          {items.map((item: NavigationLinks) => 
            <li key={item.value} className='header__content-list-item'>
                <a href={item.href}><i className={'fa fa-'+ item.icon}></i>{item.value}</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
