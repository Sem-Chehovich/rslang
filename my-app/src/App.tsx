import React from 'react';
import './App.css';
import Footer from './main-page/footer/footer';
import Header from './main-page/header/header';
import Main from './main-page/main/main';
import WordsPageContainer from './wordsPage/wordsPageContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './authorization/AuthForm';
import GameCategories from './sprint-game/sprintCategories/categoryPage';



function App() {
  return (
    <BrowserRouter>
      <div className="app">
          <Header />  
        <main>
          {/* <Main /> */}
          
            <Routes>
              <Route  index element={<Main />} />
              <Route path="/home"  element={<Main />} />
              <Route path="/dictionary" element={<WordsPageContainer />} />
              <Route path="/authorization" element={<AuthForm />} />
              <Route path="/game/sprint" element={<GameCategories /> } />
            </Routes>
        </main>
        <Footer />    
      </div>
    </BrowserRouter>
  );
}

export default App;
