export default function StudyProgress({sprintWrongCount, sprintRightCount, audioRightCount, audioWrongCount}: 
    {sprintWrongCount: number, sprintRightCount: number, audioRightCount: number, audioWrongCount: number}) {
    return (
        <div className="study-progress__container">
            <div className="audio-game__container game__container" >
                <div className="audio-title">AUDIO CHALLENGE</div>
                <div className="audio-answer">Correct answers: {audioRightCount}</div>
                <div className="audio-answer">Wrong answers: {audioWrongCount}</div>
            </div>
            <div className="sprint-game__container game__container">
                <div className="audio-title">SPRINT</div>
                <div className="audio-answer">Correct answers: {sprintRightCount}</div>
                <div className="audio-answer">Wrong answers: {sprintWrongCount}</div>
            </div>
        </div>
    )
}
