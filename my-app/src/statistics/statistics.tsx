import { statisticsItems } from './statisticsConstants';
import './statistics.css';
import { WordStatistics } from './components/wordStatistic'
import { useEffect, useState } from 'react';
import React from 'react';
import { AudioChallengeStatistics, AudioStatisticsItem } from './components/audioChallengeStatistics';

export interface statisticsItem {
  [key: string]: string
}

export const Statistics = () => {

  const [data, setData] = React.useState<{newWord: number, lernWords: number, percentageOfCorrectAnswers: number}>(
    {newWord: 0, lernWords: 0, percentageOfCorrectAnswers: 0}
  )

  useEffect(() => {
    async function getData() {
      let wordStatistickObj = await WordStatistics()
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
          <AudioChallengeStatistics />
          <div className='statistics-page__cards-item'>
            <h3>Sprint</h3>
            <p>New words: 0</p>
            <p>Correct answers: 0%</p>
            <p>The longest series of correct answers: 0</p>
          </div>
      </div>
    </div>
  )
}
