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