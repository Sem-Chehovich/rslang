export function getCorrectUrl(path: string) {
    return `https://rs-lang-rs-school.herokuapp.com/${path}`
}
export function getCorrectMeaning(text: string) {
    return text.replace('</i>', '').replace('<i>', '').replace('</b>', '').replace('<b>', '')
}

export function isAuthorized() {
   return !!localStorage.getItem('userName');
}
