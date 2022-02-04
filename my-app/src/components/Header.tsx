import './Header.css';
import React from 'react';

interface NavigationLinks {
  value: string,
  href: string,
  icon: string
}

function Header() {
  const items = [{value: 'Textbook', href: '#', icon: 'book'}, {value: '"Sprint"', href: '#', icon: 'gamepad'}, {value: '"Audio call"', href: '#', icon: 'headphones'}, {value: 'Statistics', href: '#', icon: 'balance-scale'}] as Array<NavigationLinks>;
  return (
    <div>
      <nav className='header'>
        <div className='header__content'>
          <ul className='header__content-list'>
            {items.map((item) => 
              <li key={item.value} className='header__content-list-item'>
                  <a href={item.href}><i className={'fa fa-'+ item.icon}></i>{item.value}</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;