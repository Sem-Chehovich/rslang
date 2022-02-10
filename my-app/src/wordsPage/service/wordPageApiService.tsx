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
    })  

    deleteUserWord = (id: string, wordId: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })  

    getAllUserWords = (id: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/users/${id}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'Accept': 'application/json',
      }
    })
      .then((resp) => resp.json());

      getUserWords = (id: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/words/${id}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'Accept': 'application/json',
      }
    })
      .then((resp) => resp.json());  
    
    
}

export const wordPageApiService = new WordPageApiService();