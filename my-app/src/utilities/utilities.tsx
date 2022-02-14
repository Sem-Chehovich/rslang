export function getCorrectUrl(path: string) {
  return `https://rs-lang-rs-school.herokuapp.com/${path}`
}
export function getCorrectMeaning(text: string) {
  return text.replace('</i>', '').replace('<i>', '').replace('</b>', '').replace('<b>', '')
}

export function getRandomNum(min: number, max = min + 2) {
  return Math.floor(Math.random() * (max - min) + min);
}
