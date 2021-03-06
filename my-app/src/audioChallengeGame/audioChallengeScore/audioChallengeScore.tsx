import { AnswerObject } from '../audioChallenge/audioСhallenge';
import './audioChallengeScore.css';

type Props = {
  answers: Array<AnswerObject>,
  score: number,
  handleExitClick: React.MouseEventHandler,
  scoreLimit: number
}

export const AudioChallengeScore: React.FC<Props> = ({answers, score, handleExitClick, scoreLimit}) => {
  return (
  <>
    <table className='audio-challenge__score-table'>
      <thead>
        <tr>
          <th><h2>Your score - {score}/{scoreLimit}</h2></th>
        </tr>
      </thead>
      <tbody>
        {answers.map((answer, index: number) =>
          <tr key={index}>
            <td><button className='audio-challenge__score-audio-btn' onClick={answer.correctAnswerAudioHandler}><i className='fa fa-volume-up fa-2x'></i></button></td>
            <td>{answer.correctAnswer.word}</td>
            <td>{answer.correctAnswer.transcription}</td>
            <td>{answer.correctAnswer.wordTranslate}</td>
            <td>{answer.correct === true ? '+' : '-'}</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td><button onClick={handleExitClick} className='audio-challenge__score-exit-btn'>Exit</button></td>
        </tr>
      </tfoot>
    </table>
  </>
  )
}