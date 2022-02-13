class AudioChallengeApiService {

  getWords = async (page: string, groupe: string) => fetch(`https://rs-lang-rs-school.herokuapp.com/words?page=${page}&group=${groupe}`, {
    method: 'GET',
  })
    .then((resp) => resp.json());
}

export const audioChallengeApiService = new AudioChallengeApiService();
