export function getCorrectUrl(path: string) {
    return `https://rs-lang-rs-school.herokuapp.com/${path}`
}
export function getCorrectMeaning(text: string) {
    return text.replace('</i>', '').replace('<i>', '').replace('</b>', '').replace('<b>', '')
}

export function isAuthorized() {
   return !!localStorage.getItem('userName');
}

export function checkIfPageLearned(pageArr: [], userArr: []) {
    let isFalse = true
    if (userArr.length < 20) {
        isFalse = false 
    } else {
        pageArr.forEach(({ id }) => {
            let finded = userArr.find(({ wordId }) => wordId === id)
            if (!finded) {
             isFalse = false 
            }
         })
    }
 
    return isFalse
}
