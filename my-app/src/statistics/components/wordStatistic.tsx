import { resolve } from 'path'
import { wordPageApiService } from '../../wordsPage/service/wordPageApiService'
import { getUserStatistics } from '../../sprint-game/service'

export async function WordStatistics() {
    let rightAnswer = 0
    let wrongAnswer = 0
    let statisticObject = {
        newWord: 0,
        lernWords: 0,
        percentageOfCorrectAnswers: 0,
    }
    const currDate = new Date() as Date;
    const currDateStr = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}` as string;
    const userStatistic = await getUserStatistics();
    console.log(userStatistic)
    let promise = new Promise((resolve) => {
        wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string)).then(data => {
            console.log(data)
            data.forEach((word: { difficulty: string; wordId: string; optional: {sprintGame: {date: string, wrongAns: number, rightAns: number, newWord: boolean}, audioGame: { date: string, rightAns: number, wrongAns: number, newWord: boolean}} }) => {
                if(word?.optional?.sprintGame?.newWord && word?.optional?.sprintGame.date === currDateStr) {
                    statisticObject.newWord = statisticObject.newWord + 1
                    // newWord = newWord + 1
                }
                if(word?.optional?.audioGame?.newWord && word?.optional?.audioGame.date === currDateStr) {
                    statisticObject.newWord = statisticObject.newWord + 1
                    // newWord = newWord + 1
                }
                if(word?.difficulty === 'weak') {
                    // lernWords = lernWords + 1
                    statisticObject.lernWords = statisticObject.lernWords + 1
                }
                if(word?.optional?.sprintGame?.rightAns ) {
                    rightAnswer = rightAnswer + word?.optional?.sprintGame?.rightAns
                }
                if(word?.optional?.audioGame?.rightAns) {
                    rightAnswer = rightAnswer + word?.optional?.audioGame?.rightAns
                }
                if (word?.optional?.sprintGame?.wrongAns) {
                    wrongAnswer = wrongAnswer + word?.optional?.sprintGame?.wrongAns
                }
                if (word?.optional?.audioGame?.wrongAns) {
                    wrongAnswer = wrongAnswer + word?.optional?.audioGame?.wrongAns
                }
            })
            statisticObject.percentageOfCorrectAnswers = Math.round(((rightAnswer) / (wrongAnswer + rightAnswer)) * 100) || 0
            resolve(statisticObject)
        })
    })
    return promise
}



