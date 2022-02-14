import { useTypedSelector } from "../../hooks/useTypeSelector";
import { getCorrectUrl } from "../../utilities/utilities";
import './sprintResults.css';


const ScrollCrid: React.FC = () => {
  const { results, score } = useTypedSelector(state => state.sprint);

  const wordSound = (sound: string) => {
    const audioBtn = new Audio(getCorrectUrl(sound));
    audioBtn.play();
  }

  return (
    <div className='sprint-results'>
      <div className='result-title'>Your score - {score}</div>
      
      <table>
        <tbody>
          {
            results.map(res => 
              res.questions.map(r => 
                <tr key={r.id}>
                  <td className='sprint-results__btn sond-field-icon' onClick={() => wordSound(r.audio)}></td>
                  <td>{r.word}</td> 
                  <td>{r.transcription}</td> 
                  <td>{r.wordTranslate}</td>
                  <td className={ res.isRight ? 'sprint-results__btn correct-ans-icon' : 'sprint-results__btn wrong-ans-icon' }></td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default ScrollCrid;