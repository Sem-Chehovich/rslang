import './header.css';
import { items } from '../mainPageConstants';
import { Outlet, Link } from "react-router-dom";
import BasicMenu from './dashboard'

export interface NavigationLink {
  [key: string]: string
}

function Header() {
  return (
    <header>
      <nav className='header'>
        <BasicMenu />
        <div className='header__content'>
          <ul className='header__content-list'>
            {items.map((item: NavigationLink) => 
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
