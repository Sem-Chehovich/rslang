import { useState } from "react";
import { IUserWord } from "../../interface/interface";
import { wordPageApiService } from "../../wordsPage/service/wordPageApiService";

export interface AudioStatisticsItem {
  newWords: string,
  correctAnswers: number,
  longestSeries: number
}

export const AudioChallengeStatistics = () => {
  let [todayNewWords] = useState(0);
  const currDate = new Date() as Date;
  const currDateStr = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}` as string;
  // getAudioStatistics();
  console.log("hello")
  async function getAudioStatistics() {
    const userId = localStorage.getItem('userId') as string;
    const userWords = await wordPageApiService.getAllUserWords(userId) as Array<IUserWord>;
    
    todayNewWords = userWords.filter((word: IUserWord) => word?.optional?.audioGame?.date === currDateStr).length;
    console.log(todayNewWords)
    // const rightAnswers = userWords.filter((word: IUserWord) => word.optional.audioGame.rightAns >= 1).length as number;
    // const wrongAnswers = userWords.filter((word: IUserWord) => word.optional.audioGame.wrongAns >= 1).length as number;
    // const correctAnswersPercentage = Math.round(((rightAnswers) / (rightAnswers + wrongAnswers)) * 100) as number;
    // const longestSeries = userWords.filter((word: IUserWord) => word.optional.audioGame.rightAns).length as number;
    // console.log(rightAnswers)
    // console.log(wrongAnswers)
    // console.log(correctAnswersPercentage)
  }

  return (
    <div className='statistics-page__cards-item'>
      <h3>Audio Challenge</h3>
      <p>New words: {todayNewWords}</p>
      <p>Correct answers: 0%</p>
      <p>The longest series of correct answers: 0</p>
    </div>
  )
}
