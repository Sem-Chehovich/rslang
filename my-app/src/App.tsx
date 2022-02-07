import React from 'react';
import './App.css';
<<<<<<< HEAD
import AuthForm from './authorization/AuthForm';
=======
import Footer from './main-page/footer/footer';
import Header from './main-page/header/header';
import Main from './main-page/main/main';
import WordsPageContainer from './wordsPage/wordsPageContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

>>>>>>> develop


function App() {
  return (
<<<<<<< HEAD
    <div className="app">
      <AuthForm />
    </div>
=======
    <BrowserRouter>
      <div className="app">
          <Header />  
        <main>
          {/* <Main /> */}
          
            <Routes>
              <Route  index element={<Main />} />
              <Route path="/home"  element={<Main />} />
              <Route path="/dictionary" element={<WordsPageContainer />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
>>>>>>> develop
  );
}

export default App;
