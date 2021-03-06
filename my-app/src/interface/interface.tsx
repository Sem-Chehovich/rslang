export interface card {
  [key: string]: string
}

export interface Word {
  [key: string]: string | number | boolean
}

export interface stateObj {
  [key: string]: boolean
}

export interface AudioUserWord {
  difficulty: string, 
  optional: {
    audioGame: {
      [key: string]: string | number | boolean
    }
  }
}

export interface IUserWord {
  difficulty: string, 
  optional: {
    sprintGame: {
      date: string,
      newWord: boolean,
      wrongAns: number,
      rightAns: number,
      totalRightAns: number,
    },
    audioGame: {
      date: string,
      newWord: boolean,
      wrongAns: number,
      rightAns: number,
      totalRightAns: number,
    }
  }
}

export interface IUserStatistic {
  learnedWords: number, 
  optional: {
    date: string,
    sprintGame: {
      newWord: number,
      questionsCount: number,
      rightAnsCount: number,
      percentage: number,
      longestBatch: number,
    },
    audioGame: {
      newWord: number,
      questionsCount: number,
      rightAnsCount: number,
      percentage: number,
      longestBatch: number,
    }
  }
}

export const initWordOptional: IUserWord = {
  difficulty: 'weak',
  optional: {
    sprintGame: {
      date: '',
      newWord: false,
      wrongAns: 0,
      rightAns: 0,
      totalRightAns: 0,
    },
    audioGame: {
      date: '',
      newWord: false,
      wrongAns: 0,
      rightAns: 0,
      totalRightAns: 0,
    }
  } 
}
