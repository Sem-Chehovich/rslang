import './App.css';
import RenderAudioChallengeMemo from './audio-challenge-game/audio-challenge-memo-page/audio-challenge-memo-page'
import RenderAudioChallengePage from './audio-challenge-game/audio-challenge-page/audio-challenge-page';
import Footer from './main-page/footer/footer';
import Header from './main-page/header/header';
import Main from './main-page/main/main';
import WordsPageContainer from './wordsPage/wordsPageContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <div className="app">
          <Header />  
        <main>
          <Main />
            <Routes>
              <Route  index element={<Main />} />
              <Route path="/home"  element={<Main />} />
              <Route path="/dictionary" element={<WordsPageContainer />} />
            </Routes>
        </main>
        <RenderAudioChallengeMemo />
        <RenderAudioChallengePage />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
  
export default App;
