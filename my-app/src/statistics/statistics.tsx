import { statisticsItems } from './statisticsConstants';
import './statistics.css';
import { WordStatistics } from './components/wordStatistic'
import { useEffect, useState } from 'react';
import React from 'react';
import { setUserInitialStatistics } from '../utilities/utilities';
import { AudioChallengeStatistics, AudioStatisticsItem } from './components/audioChallengeStatistics';
import { isAuthorizedUser } from '../authorization/validateToken';
import { useNavigate } from 'react-router';

export interface statisticsItem {
  [key: string]: string
}

export const Statistics = () => {

  const [data, setData] = React.useState<{newWord: number, lernWords: number, percentageOfCorrectAnswers: number}>(
    {newWord: 0, lernWords: 0, percentageOfCorrectAnswers: 0}
  )
  
  const [dataSprint, setDataSprint] = React.useState<{newWord: number, longestBatch: number, percentage: number}>(
    {newWord: 0, longestBatch: 0, percentage: 0}
  )
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // async function checkAuth() {
    //   const checkAuth = await isAuthorizedUser();
    //   if (checkAuth === 'redirect') {
    //     setShowAlert(true);
    //     //navigate('/authorization');
    //   }
    // }

    // checkAuth();

    async function getData() {
      const checkAuth = await isAuthorizedUser();

      if (checkAuth === 'redirect') {
        setShowAlert(true);
      } else {
        setShowAlert(false);
        let wordStatistickObj = await WordStatistics();
        let sprintStatistic = await setUserInitialStatistics();

        if (typeof sprintStatistic !== 'number') {
          let obj = {
            newWord: sprintStatistic.optional.sprintGame.newWord,
            longestBatch: sprintStatistic.optional.sprintGame.longestBatch,
            percentage: sprintStatistic.optional.sprintGame.percentage
          }
          setDataSprint(obj  as {newWord: number, longestBatch: number, percentage: number} );
        }
          
        setData(wordStatistickObj as {newWord: number, lernWords: number, percentageOfCorrectAnswers: number})
        }
    }  
    getData()
  }, []);

  const handleClick = () => {
    navigate('/authorization');
  }

  return (
    showAlert === true ?
    <div className='statistics-page'>
      <div className='statistics-page__cards-item big'>
        <h3>We apologize!</h3>
        <p>The statistics page is available only to authorized users. Please go to login page!</p>
        <button className='go-btn' onClick={handleClick}>Go</button>
      </div>
    </div>
    :
    <div className='statistics-page'>
      <h2>Statistics for today</h2>
      <div className='statistics-page__cards'>
      <div className='statistics-page__cards-item'>
            <h3>Words</h3>
            <p>New words: {data.newWord}</p>
            <p>Correct answers: {data.percentageOfCorrectAnswers}%</p>
            <p>Learned words: {data.lernWords}</p>
          </div>
          <AudioChallengeStatistics />
          <div className='statistics-page__cards-item'>
            <h3>Sprint</h3>
            <p>New words: {dataSprint.newWord}</p>
            <p>Correct answers: {dataSprint.percentage}%</p>
            <p>The longest series of correct answers: {dataSprint.longestBatch}</p>
          </div>
      </div>
    </div>
  )
}
