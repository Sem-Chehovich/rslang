import './App.css';
import RenderAudioChallengeMemo from './audio-challenge-game/audio-challenge-memo-page/audio-challenge-memo-page'
import RenderAudioChallengePage from './audio-challenge-game/audio-challenge-page/audio-challenge-page';
import Footer from './main-page/footer/footer';
import Header from './main-page/header/header';
import Main from './main-page/main/main';

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main />
      <RenderAudioChallengeMemo /> */}
      <RenderAudioChallengePage />
      {/* <Footer /> */}
    </div>
  );
}
  
export default App;
