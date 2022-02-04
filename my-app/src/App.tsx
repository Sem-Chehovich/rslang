import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

interface SidebarLinks {
  value: string,
  href: string
}

function App() {
  return (
    <div className="app">
      <Header />
      <div className='app__main-page'>
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
