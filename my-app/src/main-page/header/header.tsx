import './header.css';
import { items } from '../main-page-constants';
import { Outlet, Link } from "react-router-dom";

export interface NavigationLinks {
  [key: string]: string
}

function Header() {
  return (
    <header>
      <nav className='header'>
        <div className='header__content'>
          <ul className='header__content-list'>
            {items.map((item: NavigationLinks) => 
              <li key={item.value} className='header__content-list-item'>
                  <Link to={item.href}>
                      <i className={'fa fa-'+ item.icon}></i>
                  </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </header>
  );
}

export default Header;
