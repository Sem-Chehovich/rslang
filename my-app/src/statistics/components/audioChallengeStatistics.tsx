import { IUserWord } from "../../interface/interface";
import { wordPageApiService } from "../../wordsPage/service/wordPageApiService";

export async function AudioChallengeStatistics() {
  const userId = localStorage.getItem('userId') as string;
  const userWords = await wordPageApiService.getAllUserWords(userId) as Array<IUserWord>;
  const totalNewWords = userWords.filter((word: IUserWord) => word?.optional?.audioGame?.newWord).length as number;
  console.log(totalNewWords)
  // const rightAnswers = userWords.filter((word: IUserWord) => word.optional.audioGame.rightAns >= 1).length as number;
  // const wrongAnswers = userWords.filter((word: IUserWord) => word.optional.audioGame.wrongAns >= 1).length as number;
  // const correctAnswersPercentage = Math.round(((rightAnswers) / (rightAnswers + wrongAnswers)) * 100) as number;
  // const longestSeries = userWords.filter((word: IUserWord) => word.optional.audioGame.rightAns).length as number;
  // console.log(rightAnswers)
  // console.log(wrongAnswers)
  // console.log(correctAnswersPercentage)
}
