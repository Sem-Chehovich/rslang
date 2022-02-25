import { IUserStatistic } from "../../interface/interface";

class WordPageApiService {

  getWords = (page: string, groupe: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/words?page=${page}&group=${groupe}`, {
      method: 'GET',
  })
  .then((resp) => resp.json());

  createUserWord = (id: string, wordId: string, word: any) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });

  updateUserWord = (id: string, wordId: string, word: any) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });

  deleteUserWord = (id: string, wordId: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  getAllUserWords = (id: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
    }
  })
  .then((resp) => resp.json());

  getFullUserObject = async (id: string) =>  {
    let array = await this.getAllUserWords(id)
    let strong: any = []
    let weak: any = []
    array.forEach((word: { difficulty: string; wordId: string }) => {
      if (word.difficulty === 'strong') {
        strong.push(word.wordId);
      }

      if (word.difficulty === 'weak') {
        weak.push(word.wordId);
      }
    })
  }

  getUserWords = (id: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/words/${id}`, {
  method: 'GET',
  headers: {
    // 'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
    'Accept': 'application/json',
    }
  })
  .then((resp) => resp.json());  

  getUserWordById = (id: string, wordId: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words/${wordId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
    },
  })
  .then((resp) => resp.json())
  .catch(() => {
    console.log('not found');
    return null;
  })  

  getUserStatistics = (): Promise<IUserStatistic> => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${localStorage.getItem('userId')}/statistics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
    }
  })
  .then((resp) => resp.json());

  upsertUserStatistics = (userStatistic: IUserStatistic) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${localStorage.getItem('userId')}/statistics`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userStatistic)
  });
}

export const wordPageApiService = new WordPageApiService();
