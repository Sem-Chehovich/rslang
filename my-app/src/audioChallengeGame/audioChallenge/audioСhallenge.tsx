import { levels } from '../audioChallengeConstants';
import './audioСhallenge.css';
import React, { useState } from 'react';
import { AudioChallengeCard } from '../audioChallengeCard/audioChallengeCard';
import { Spinner } from '../../spinner/spinner';
import { shuffleWords, getRandomNum, getCorrectUrl, sliceArrIntoChunks, setUserInitialStatistics } from '../../utilities/utilities';
import { Word, IUserWord, IUserStatistic } from '../../interface/interface';
import { AudioChallengeScore } from '../audioChallengeScore/audioChallengeScore';
import { wordPageApiService } from '../../wordsPage/service/wordPageApiService';
import { isAuthorizedUser } from '../../authorization/validateToken';
import wrongAnswer from '../../assets/sounds/wrongAnswer.mp3';
import rightAnswer from '../../assets/sounds/rightAnswer.mp3';
import { useNavigate } from 'react-router';
import { useActions } from '../../hooks/useActions';

export type AnswerObject = {
  answer: string,
  correctAnswer: Word,
  correct: boolean,
  correctAnswerAudioHandler: React.MouseEventHandler
}

export let wordsArr = [] as Array<Word>;
let longestBatch = 0 as number;
let currentBatch = 0 as number;

export const AudioChallenge: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [words, setWords] = useState<Array<Array<Word>>>([]); 
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreLimit, setScoreLimit] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<AnswerObject[]>([]);
  const [isAnswered] = useState<Array<boolean>>([]);
  const [gameOver, setGameOver] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [isRightAnswerShown, setIsRightAnswerShown] = useState(false);
  const [isOpenFromDictionary] = useState(localStorage.getItem('isAudioGameTurnOnByDictionary'));
  const [isSoundOn, setSoundOn] = useState(false);
  const { setPagePath } = useActions();
  const navigate = useNavigate();
  const currDate = new Date() as Date;
  const currDateStr = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}` as string;
  const userId = localStorage.getItem('userId') as string;

  const initStatOptional: IUserStatistic = {
    learnedWords: 0,
    optional: {
      date: currDateStr,
      sprintGame: {
        newWord: 0,
        questionsCount: 0,
        rightAnsCount: 0,
        percentage: 0,
        longestBatch: 0,
      },
      audioGame: {
        newWord: 0,
        questionsCount: 0,
        rightAnsCount: 0,
        percentage: 0,
        longestBatch: 0,
      }
    }
  }

  const initUserWordOptional: IUserWord = {
    difficulty: '', 
    optional: {
      sprintGame: {
        date: '',
        newWord: false,
        wrongAns: 0,
        rightAns: 0,
        totalRightAns: 0,
      },
      audioGame: {
        date: '',
        newWord: false,
        wrongAns: 0,
        rightAns: 0,
        totalRightAns: 0,
      }
    }
  }


  React.useEffect(() => {
    const section = localStorage.getItem('section') as string;
    console.log(isOpenFromDictionary);
    
    async function renderPage() {
      setLoading(true);
      let pageNumber1 = (+(localStorage.getItem('page') as string) - 1) + '';
      let pageNumber2: string;

      if (pageNumber1 === '0') {
         pageNumber2 = '29';
      } else {
        pageNumber2 = (+pageNumber1 - 1) + '';
      }

      await wordPageApiService.getWords(pageNumber1, section)
      .then((data) => {
        wordsArr.push(...data as any);
      })
  
      await wordPageApiService.getWords(pageNumber2, section)
      .then((data) => {
        wordsArr.push(...data as any);
      })

      // checkIsWordLearned(wordsArr);
  
      generateMixedArray(wordsArr);
      setGameOver(false);
      setLoading(false);
    }

    // async function checkIsWordLearned(wordsArr: Array<Word>) {
    //   await wordPageApiService.getAllUserWords(userId)
    //   .then((data) => {
    //     const learnedWords = data.filter((word: IUserWord) => word.difficulty === 'weak');

    //     wordsArr.filter((word: Word) => word.id !== learnedWords.id);

    //     if (wordsArr.length < 40) {
    //       let page = getRandomNum(0, 29) as number;    
    //       wordPageApiService.getWords(page.toString(), section)
    //       .then((data) => {
    //         wordsArr.push(...data as any);
    //       });
    //     }
    //   });
    // }

    isOpenFromDictionary && renderPage()
    return function cleanUp() {
      localStorage.removeItem('isAudioGameTurnOnByDictionary');
    }
  }, [isOpenFromDictionary]);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setPagePath('game-page');
    setLoading(true);
    const id = (event.target as HTMLButtonElement).id as string;

    setDifficulty(Number(id));

    let pageNumber1 = getRandomNum(0, 29) as number;
    let pageNumber2 = getRandomNum(0, 29) as number;
    await wordPageApiService.getWords(pageNumber1.toString(), difficulty.toString())
    .then((data) => {
      
      wordsArr.push(...data as any);
    })

    while (pageNumber1 === pageNumber2) {
      pageNumber2 = getRandomNum(0, 29) as number;
    }

    await wordPageApiService.getWords(pageNumber2.toString(), difficulty.toString())
    .then((data) => {
      wordsArr.push(...data as any);
    })

    generateMixedArray(wordsArr);
    setGameOver(false);
    setLoading(false);
    isAuthorizedUser();
  }

  async function pushNewWord(wordId: string, isRight: boolean) {

    if (userId != null) {
      const dbWord = await wordPageApiService.getUserWordById(userId, wordId) as IUserWord;
      if (dbWord === null) {
        console.log('новое');
        const progressObj = {
          difficulty: 'strong',
          optional: {
            audioGame: {
              date: currDateStr,
              newWord: true,
              wrongAns: isRight ? 0 : 1,
              rightAns: isRight ? 1 : 0,
              totalRightAns: isRight ? 1 : 0,
            },
            sprintGame: {
              date: '',
              newWord: false,
              wrongAns: 0,
              rightAns: 0,
              totalRightAns: 0,
            }
          }
        };
        await wordPageApiService.createUserWord(userId, wordId as string, progressObj);
      } else {
        console.log('было уже!');
        let audioGameObj = Object.assign(dbWord?.optional?.audioGame);
        let wordDifficulty = dbWord.difficulty;

        if (audioGameObj['date'] === currDateStr && audioGameObj['newWord'] !== false) {
          audioGameObj['newWord'] = true;
        } else {
          audioGameObj['newWord'] = false;
        }

        audioGameObj['date'] = currDateStr;

        if (isRight) {
          audioGameObj['rightAns'] = audioGameObj['rightAns'] + 1;
          audioGameObj['totalRightAns'] = audioGameObj['totalRightAns'] + 1;
        } else {
          audioGameObj['wrongAns'] = audioGameObj['wrongAns'] + 1;
          audioGameObj['totalRightAns'] = 0;
        }

        if (audioGameObj['totalRightAns'] === 3) {
          wordDifficulty = 'weak';
        } else {
          wordDifficulty = 'strong';
          audioGameObj['totalRightAns'] = 0;
        }
        initUserWordOptional.difficulty = wordDifficulty;
        initUserWordOptional.optional.audioGame = audioGameObj;
        initUserWordOptional.optional.sprintGame.date = dbWord.optional.sprintGame.date;
        initUserWordOptional.optional.sprintGame.newWord = dbWord.optional.sprintGame.newWord;
        initUserWordOptional.optional.sprintGame.rightAns = dbWord.optional.sprintGame.rightAns;
        initUserWordOptional.optional.sprintGame.wrongAns = dbWord.optional.sprintGame.wrongAns;
        initUserWordOptional.optional.sprintGame.totalRightAns = dbWord.optional.sprintGame.totalRightAns;

        await wordPageApiService.updateUserWord(userId, wordId as string, initUserWordOptional);
      }
    }
  }

  const handleAnswerClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLButtonElement>;
    const challengeNextBtn = document.querySelector('.audio-challenge-card__next-btn') as HTMLButtonElement;
    const chosenAnswer = event.currentTarget.innerHTML as string;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;
    let isCorrect = false as boolean;
    isAnswered.push(true);

    if (challengeNextBtn.innerHTML === 'I don\'t know') {
      setIsRightAnswerShown(true);
      challengeNextBtn.innerHTML = 'Next';
      event.currentTarget.style.textDecoration = 'line-through';
      answerBtns.forEach((x) => {
       if (x.innerHTML === correctAnswer.wordTranslate) {
        x.innerHTML = `<u>${x.innerHTML}</u>`;
       }});
    }

    answerBtns.forEach((x) => {
      x.setAttribute('disabled', 'disabled');
    })

    if (chosenAnswer === correctAnswer.wordTranslate) {
      setScore(score + 1);
      isCorrect = true;
      event.currentTarget.style.textDecoration = 'underline';
      if (!isSoundOn) {
        soundOn(rightAnswer);
      }
    } else {
      if (!isSoundOn) {
        soundOn(wrongAnswer);
      }
    }

    const handleSoundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const sound = new Audio();
      sound.src = getCorrectUrl(correctAnswer.audio as string);
      sound.play();
    }

    const answerObject = {
      answer: chosenAnswer,
      correctAnswer: correctAnswer,
      correct: isCorrect,
      correctAnswerAudioHandler: handleSoundClick
    } as AnswerObject;

    setChosenAnswers((prev) => [...prev, answerObject]);
    await pushNewWord(correctAnswer.id as string, isCorrect);
    await updateAudioStats(isCorrect);
  }

  const updateAudioStats = async (isCorrectAnswer: boolean) => {
    const userSt = await setUserInitialStatistics() as IUserStatistic;

    if (isCorrectAnswer && currentBatch <= scoreLimit) {
      currentBatch += 1;
      if (longestBatch < currentBatch) {
        longestBatch = currentBatch;
      }
    } else {
      currentBatch = 0;
    }

    wordPageApiService.getAllUserWords(userId)
    .then((userWords) => {
      const allTodayWords = userWords.filter((word: IUserWord) => word?.optional?.audioGame?.date === currDateStr) as Array<IUserWord>;
      const todayNewWords = allTodayWords.filter((word: IUserWord) => word?.optional?.audioGame?.newWord === true) as Array<IUserWord>;

      const todayRightAns = allTodayWords.filter((word: IUserWord) => word.optional.audioGame.rightAns >= 1).length as number;
      const todayWrongAns = allTodayWords.filter((word: IUserWord) => word.optional.audioGame.wrongAns >= 1).length as number;
      let todayCorrectAnsPercentage = Math.round(((todayRightAns) / (todayRightAns + todayWrongAns)) * 100) as number;
      initStatOptional.optional.audioGame.newWord = todayNewWords.length;
      if (isNaN(todayCorrectAnsPercentage)) {
        initStatOptional.optional.audioGame.percentage = 0;
      } else {
        initStatOptional.optional.audioGame.percentage = todayCorrectAnsPercentage;
      }

      if (userSt.optional.audioGame.longestBatch < longestBatch) {
        initStatOptional.optional.audioGame.longestBatch = longestBatch;
      } else {
        initStatOptional.optional.audioGame.longestBatch = userSt.optional.audioGame.longestBatch;
      }

      initStatOptional.optional.audioGame.questionsCount = allTodayWords.length;
      initStatOptional.optional.audioGame.rightAnsCount = todayRightAns;
      initStatOptional.optional.date = currDateStr;
      initStatOptional.optional.sprintGame.newWord = userSt.optional.sprintGame.newWord;
      initStatOptional.optional.sprintGame.questionsCount = userSt.optional.sprintGame.questionsCount;
      initStatOptional.optional.sprintGame.rightAnsCount = userSt.optional.sprintGame.rightAnsCount;
      initStatOptional.optional.sprintGame.percentage = userSt.optional.sprintGame.percentage;
      initStatOptional.optional.sprintGame.longestBatch = userSt.optional.sprintGame.longestBatch;
        
    }).then(async() => {
      await wordPageApiService.upsertUserStatistics(initStatOptional);
    }).then(x => console.log("End!"))
  }

  const handleNextQuestionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLButtonElement>;
    const correctAnswer = words[questionNumber].find((x) => x.isRight === true) as Word;
    answerBtns.forEach((x) => {
      x.removeAttribute('disabled');
    });

    if (event.currentTarget.innerHTML === 'I don\'t know') {
      event.currentTarget.innerHTML = 'Next';
      setIsRightAnswerShown(true);
      updateAudioStats(false);
      if (!isSoundOn) {
        soundOn(wrongAnswer);
      }
      answerBtns.forEach((x) => {
        if (x.innerHTML === correctAnswer.wordTranslate) {
         x.innerHTML = `<u>${x.innerHTML}</u>`;
        }});
    } else {
      setIsRightAnswerShown(false);
      answerBtns.forEach((btn) => {
        btn.style.textDecoration = 'none';
      });
      event.currentTarget.innerHTML = 'I don\'t know';

      const handleSoundClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const sound = new Audio();
        sound.src = getCorrectUrl(correctAnswer.audio as string);
        sound.play();
      }

      if (isAnswered[questionNumber] !== true) {
        isAnswered.push(false);
      }

      if (questionNumber < 9) {
        setQuestionNumber(questionNumber + 1);
      } else {
        setGameOver(true);
        setShowScore(true);
        setQuestionNumber(0);
      }

      setScoreLimit(scoreLimit + 1);

      const answerObject = {
        answer: '',
        correctAnswer: correctAnswer,
        correct: false,
        correctAnswerAudioHandler: handleSoundClick
      } as AnswerObject;

      if (chosenAnswers[questionNumber] === undefined) {
        setChosenAnswers((prev) => [...prev, answerObject]);
      }
    }
  }

  const handleExitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPagePath('');
    setGameOver(true);
    setShowScore(false);
    setScore(0);
    setQuestionNumber(0);
    setChosenAnswers([]);
    setScoreLimit(0);

    if (isOpenFromDictionary) {
      navigate('/textbook');
    } else {
      navigate('/audio');
    }
  }

  const generateMixedArray = (arr: Array<Word>) => {
    arr = shuffleWords(arr);
    setWords(sliceArrIntoChunks(arr));
  }

  const backPage = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setPagePath('');
    setGameOver(true);
    setShowScore(false);
    setScore(0);
    setQuestionNumber(0);
    setChosenAnswers([]);
    setScoreLimit(0);

    if (isOpenFromDictionary) {
      navigate('/textbook');
    } else {
      navigate('/audio');
    }
  }

  const onSoundOn = () => {
    if (!isSoundOn) {
      setSoundOn(true);
    } else {
      setSoundOn(false);
    }
  }

  function soundOn(answerSound: string) {
    const sound = new Audio(answerSound);
    sound.play();
  }

  document.onkeydown = function(event) {
    const answerBtns = document.querySelectorAll('.audio-challenge-card__words-btn') as NodeListOf<HTMLButtonElement>;
    const challengeNextBtn = document.querySelector('.audio-challenge-card__next-btn') as HTMLButtonElement;
    const audioBtn = document.querySelector('.audio-challenge-card__audio-btn') as HTMLButtonElement;
    switch (event.code) {
      case 'Digit1':
        answerBtns[0].click();
        break;
      case 'Digit2':
        answerBtns[1].click();
        break;
      case 'Digit3':
        answerBtns[2].click();
        break;
      case 'Digit4':
        answerBtns[3].click();
        break;
      case 'Space':
        audioBtn.click();
      break;
      case 'Enter':
        challengeNextBtn.click();
      break;
    }
  }

  return (
    <div className='audio-challenge'>
      {loading === true ? <Spinner /> : 
        gameOver === true && showScore === false && !isOpenFromDictionary ?
        <section className='audio-challenge-memo-page'>
          <div className='audio-challenge-memo'>
            <h2>Audio challenge</h2>
            <p>Improve your listening comprehension and auditory memory.</p>
            <p>You must choose the right meaning of the word you will hear.</p>
            <ul className='audio-challenge-memo__list'>
              <li>Use number keys from 1 to 4 to select an answer</li>
              <li>Use Space key to repeat a word</li>
              <li>Use Enter key for a hint or to move to the next word</li>
            </ul>
            <p>Select word difficulty level:</p>
            <div className='audio-challenge-memo__game-levels'>
              {levels.map((level: number, index: number) =>
                <button key={index} id={index.toString()} onClick={handleClick} className='audio-challenge-memo__game-levels-btn'>{level}</button>
              )}
            </div>
          </div>
        </section>
        :
        (showScore === false ? 
          <AudioChallengeCard words={words[questionNumber]} 
          isRightAnswerShown={isRightAnswerShown}
          handleAnswerClick={handleAnswerClick}
          handleNextQuestionClick={handleNextQuestionClick}
          backPage={backPage}
          isSoundOn={isSoundOn}
          onSoundOn={onSoundOn}/>
          : 
          <section className='audio-challenge-memo-page'>
            <AudioChallengeScore answers={chosenAnswers} handleExitClick={handleExitClick} score={score} scoreLimit={scoreLimit} />
          </section>)     
        }
    </div>
  );
}