import { resolve } from 'path'
import { wordPageApiService } from '../../wordsPage/service/wordPageApiService'

export async function WordStatistics() {
    let rightAnswer = 0
    let wrongAnswer = 0
    let statisticObject = {
        newWord: 0,
        lernWords: 0,
        percentageOfCorrectAnswers: 0,
    }
    let promise = new Promise((resolve) => {
        wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string)).then(data => {
            data.forEach((word: { difficulty: string; wordId: string; optional: {sprintGame: {wrongAns: number, rightAns: number, newWord: boolean}, audioGame: { audioRightAnswer: number, audioWrongAnswer: number,}} }) => {
                if(word?.optional?.sprintGame?.newWord) {
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
                if(word?.optional?.audioGame?.audioRightAnswer) {
                    rightAnswer = rightAnswer + word?.optional?.audioGame?.audioRightAnswer
                }
                if (word?.optional?.sprintGame?.wrongAns) {
                    wrongAnswer = wrongAnswer + word?.optional?.sprintGame?.wrongAns
                }
                if (word?.optional?.audioGame?.audioWrongAnswer) {
                    wrongAnswer = wrongAnswer + word?.optional?.audioGame?.audioWrongAnswer
                }
            })
            statisticObject.percentageOfCorrectAnswers = Math.round(((rightAnswer) / (wrongAnswer + rightAnswer)) * 100)
            resolve(statisticObject)
        })
    })
    return promise
}



