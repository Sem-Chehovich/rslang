import './statistics.css';
import { WordStatistics } from './components/wordStatistic'
import React, { useEffect } from 'react';
import { setUserInitialStatistics } from '../utilities/utilities';
import { AudioChallengeStatistics, AudioStatisticsItem } from './components/audioChallengeStatistics';

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

  const [audioData, setAudioData] = React.useState<AudioStatisticsItem>({newWords: 0, correctAnswers: 0, longestSeries: 0});

  useEffect(() => {
    async function getData() {
      let wordStatistickObj = await WordStatistics();
      setData(wordStatistickObj as {newWord: number, lernWords: number, percentageOfCorrectAnswers: number});

      let audioChallengeStatisticsObj = await AudioChallengeStatistics();
      setAudioData(audioChallengeStatisticsObj as AudioStatisticsItem);

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
    getData()
  }, []);

  return (
    <div className='statistics-page'>
      <h2>Statistics for today</h2>
      <div className='statistics-page__cards'>
      <div className='statistics-page__cards-item'>
            <h3>Words</h3>
            <p>New words: {data.newWord}</p>
            <p>Correct answers: {data.percentageOfCorrectAnswers}%</p>
            <p>Learned words: {data.lernWords}</p>
          </div>
          <div className='statistics-page__cards-item'>
            <h3>Audio Challenge</h3>
            <p>New words: {audioData?.newWords}</p>
            <p>Correct answers: {audioData?.correctAnswers}%</p>
            <p>The longest series of correct answers: {audioData?.longestSeries}</p>
          </div>
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
