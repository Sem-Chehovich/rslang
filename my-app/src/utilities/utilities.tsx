import { Word } from "../interface/interface";

export function getCorrectUrl(path: string) {
  return `https://rs-lang-rs-school.herokuapp.com/${path}`
}

export function getCorrectMeaning(text: string) {
  return text.replace('</i>', '').replace('<i>', '').replace('</b>', '').replace('<b>', '')
}

export function getRandomNum(min: number, max = min + 2) {
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

export const sliceArrIntoChunks = (arr: Array<Word>) => {
  const CHUNK_SIZE = 4 as number;
  const result = [] as Array<Array<Word>>;

  for (let i = 0; i < arr.length; i += CHUNK_SIZE) {
    const chunk = arr.slice(i, i + CHUNK_SIZE);

    for (let j = 0; j < chunk.length; j++) {
      chunk[j] = {
        ...chunk[j],
        isRight: false
      }
    }

    chunk[getRandomNum(0, CHUNK_SIZE - 1)].isRight = true;
    result.push(chunk);
  }

  return result;
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
