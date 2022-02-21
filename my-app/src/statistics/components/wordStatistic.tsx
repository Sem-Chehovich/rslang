import { wordPageApiService } from '../../wordsPage/service/wordPageApiService'
import { getUserStatistics } from '../../sprint-game/service'

export async function WordStatistics() {
    let rightAnswer = 0
    let totalAnswer = 0
    let statisticObject = {
        newWord: 0,
        lernWords: 0,
        percentageOfCorrectAnswers: 0,
    }
    const currDate = new Date() as Date;
    const currDateStr = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}` as string;
    const userStatistic = await getUserStatistics() as {optional:{audioGame: {questionsCount: number, rightAnsCount: number}, sprintGame: {questionsCount: number, rightAnsCount: number}}};
    rightAnswer = userStatistic.optional.audioGame.rightAnsCount + userStatistic.optional.sprintGame.rightAnsCount
    totalAnswer = userStatistic.optional.audioGame.questionsCount + userStatistic.optional.sprintGame.questionsCount
    console.log(userStatistic)
    let promise = new Promise((resolve) => {
        wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string)).then(data => {
            console.log(data)
            data.forEach((word: { difficulty: string; wordId: string; optional: {sprintGame: {date: string, wrongAns: number, rightAns: number, newWord: boolean}, audioGame: { date: string, rightAns: number, wrongAns: number, newWord: boolean}} }) => {
                if(word?.optional?.sprintGame?.newWord && word?.optional?.sprintGame.date === currDateStr) {
                    statisticObject.newWord = statisticObject.newWord + 1
                }
                if(word?.optional?.audioGame?.newWord && word?.optional?.audioGame.date === currDateStr) {
                    statisticObject.newWord = statisticObject.newWord + 1
                }
                if(word?.difficulty === 'weak') {
                    statisticObject.lernWords = statisticObject.lernWords + 1
                }
            })
            statisticObject.percentageOfCorrectAnswers = Math.round(((rightAnswer) / totalAnswer) * 100) || 0
            resolve(statisticObject)
        })
    })
    return promise
}



