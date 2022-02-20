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
    wordPageApiService.getUserStatistics()
    .then((data) => {
      audioStatisticsObject.newWords = data.optional.audioGame.newWord;
      audioStatisticsObject.correctAnswers = data.optional.audioGame.rightAnsCount;
      audioStatisticsObject.longestSeries = data.optional.audioGame.longestBatch;
      resolve(audioStatisticsObject);
    });
  })

  return promise;
}
