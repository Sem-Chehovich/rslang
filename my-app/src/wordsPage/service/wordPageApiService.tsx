class WordPageApiService {

    getWords = (page: string, groupe: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/words?page=${page}&group=${groupe}`, {
        method: 'GET',
        headers: {
          'X-Total-Count': '4',
        },
      })
        .then((resp) => resp.json());
}

export const wordPageApiService = new WordPageApiService();