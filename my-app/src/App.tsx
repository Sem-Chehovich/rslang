import './App.css';
import { AudioChallenge } from './audioChallengeGame/audioChallenge/audioСhallenge'
import Footer from './mainPage/footer/footer';
import Header from './mainPage/header/header';
import Main from './mainPage/main/main';
import WordsPageContainer from './wordsPage/wordsPageContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './authorization/AuthForm';
import { GamesPage } from './games/games-page';
import { Statistics } from './statistics/statistics';

function App() {

  return (
      <BrowserRouter>
      <div className="app">
          <Header />  
        <main>
          <Routes>
            <Route index element={<Main />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path="/home" element={<Main />} />
            <Route path="/audio" element={<AudioChallenge />}/>
            <Route path="/textbook" element={<WordsPageContainer />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path="/authorization" element={<AuthForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
  
export default App;
