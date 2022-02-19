import { useState } from "react";
import { IUserWord } from "../../interface/interface";
import { wordPageApiService } from "../../wordsPage/service/wordPageApiService";

export interface AudioStatisticsItem {
  newWords: number,
  correctAnswers: number,
  longestSeries: number
}

export async function AudioChallengeStatistics(): Promise<AudioStatisticsItem> {
  let audioStatisticsObject = {
    newWords: 0,
    correctAnswers: 0,
    longestSeries: 0,
  }

  let promise = new Promise<AudioStatisticsItem>((resolve) => {
    const currDate = new Date() as Date;
    const currDateStr = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}` as string;
    const userId = localStorage.getItem('userId') as string;

    wordPageApiService.getAllUserWords(userId).then((userWords) => {
      const todayWords = userWords.filter((word: IUserWord) => word?.optional?.audioGame?.date === currDateStr) as Array<IUserWord>;
      audioStatisticsObject.newWords = todayWords.length;

      const todayRightAns = todayWords.filter((word: IUserWord) => word.optional.audioGame.rightAns >= 1).length as number;
      const todayWrongAns = todayWords.filter((word: IUserWord) => word.optional.audioGame.wrongAns >= 1).length as number;
      const todayCorrectAnsPercentage = Math.round(((todayRightAns) / (todayRightAns + todayWrongAns)) * 100) as number;
      if (isNaN(todayCorrectAnsPercentage)) {
        audioStatisticsObject.correctAnswers = 0;
      } else {
        audioStatisticsObject.correctAnswers = todayCorrectAnsPercentage;
      }
      // const longestSeries = userWords.filter((word: IUserWord) => word.optional.audioGame.rightAns).length as number;

      resolve(audioStatisticsObject);
    })
  })

  return promise;
}
