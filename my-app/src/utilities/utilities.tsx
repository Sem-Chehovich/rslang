import { Word } from "../interface/interface";

export function getCorrectUrl(path: string) {
  return `https://rs-lang-rs-school.herokuapp.com/${path}`
}

export function getCorrectMeaning(text: string) {
  return text.replace('</i>', '').replace('<i>', '').replace('</b>', '').replace('<b>', '')
}

export function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleWords(array: Array<Word>) {
  let currentIndex = array.length, randomIndex;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
