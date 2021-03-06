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
import GameCategories from './sprint-game/sprintCategories/categoryPage';
import Sprint from './sprint-game/sprintQuiz/Sprint';
import { useTypedSelector } from './hooks/useTypeSelector';

function App() {
  const { pagePath } = useTypedSelector((state) => state.sprint);

  return (
      <BrowserRouter>
      <div className="app">
        { pagePath === 'game-page' ? '' : <Header /> } 
        <main>
          <Routes>
            <Route index element={<Main />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path="/home" element={<Main />} />
            <Route path="/audio" element={<AudioChallenge />}/>
            <Route path="/textbook" element={<WordsPageContainer />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path="/authorization" element={<AuthForm />} />
            <Route path="/game" element={<GameCategories /> } />
            <Route path="/sprint" element={<Sprint /> } />
          </Routes>
        </main>
        { pagePath === 'game-page' ? '' : <Footer /> }   
      </div>
    </BrowserRouter>
  );
}
  
export default App;
