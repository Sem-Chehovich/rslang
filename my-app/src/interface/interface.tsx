export interface card {
  [key: string]: string
}

export interface Word {
  [key: string]: string | number | boolean
}

export interface stateObj {
    [key: string]: boolean
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
    }
  },
}
