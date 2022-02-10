import './App.css';
import { AudioChallenge } from './audio-challenge-game/audio-challenge/audio-challenge'
import Footer from './main-page/footer/footer';
import Header from './main-page/header/header';
import Main from './main-page/main/main';
import WordsPageContainer from './wordsPage/wordsPageContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './authorization/AuthForm';


function App() {

  return (
      <BrowserRouter>
      <div className="app">
          <Header />  
        <main>
          <Routes>
            <Route index element={<Main />} />
            <Route path="/home" element={<Main />} />
            <Route path="/audio" element={<AudioChallenge />}/>
            <Route path="/textbook" element={<WordsPageContainer />} />
            <Route path="/authorization" element={<AuthForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
  
export default App;
