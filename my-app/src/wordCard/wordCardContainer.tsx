import React from "react";
import './wordCard.scss';
import SoundButton from './soundButton';
import { getCorrectUrl, getCorrectMeaning } from '../utilities/utilities';
import { card, stateObj } from '../interface/interface';
import FormControlLabelPosition from './component/togleButtons'
import { isAuthorized } from '../utilities/utilities'
import { wordPageApiService } from '../wordsPage/service/wordPageApiService'

type MyProps = { card: card };
type MyState = {isLearned: boolean, isDifficult: boolean};

class WordCardContainer extends React.Component<MyProps, MyState> {
    cardRef: React.RefObject<HTMLDivElement>;
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props)
        this.state = {
            isLearned: false,
            isDifficult: false,
        }
        this.cardRef = React.createRef()
    }
    
    changeCardClass = async (stateObj: stateObj ) => {
        this.setState({ isLearned: stateObj.isLearned,
            isDifficult: stateObj.isDifficult })
        if (stateObj.isDifficult) {
           await wordPageApiService.deleteUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string))
            let  word = { "difficulty": "strong"}
            await wordPageApiService.createUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string), word)
        }
        if (stateObj.isLearned) {
            await wordPageApiService.deleteUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string))
            let  word = { "difficulty": "weak"}
            await  wordPageApiService.createUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string), word)
        }  
    }

    render() {
        const { image, word, transcription, textMeaning, textExample, wordTranslate, textMeaningTranslate, textExampleTranslate, audio, audioMeaning, audioExample, id } = this.props.card

        const learnedClass = this.state.isLearned ? 'learned' : '';
        const difficultClass = this.state.isDifficult ? 'difficult' : '';

        return (
            <div ref={this.cardRef} id={id} className={`card ${learnedClass} ${difficultClass}`}>
            <div className="card__img-wrapper">
                <img className="card__img" src={getCorrectUrl(image)} alt="word img" />
            </div>
            <div className="card__content">
                <div className="card__titel-wrapper">
                <div className="card__titel">{word}</div>
                <SoundButton audio={audio} audioExample={audioExample} audioMeaning={audioMeaning}/>
                {isAuthorized() && <FormControlLabelPosition changeCardClass={this.changeCardClass}/>}
                </div>
                <div className="card__transcription">Transcription: {transcription}</div>
                <div className="card__meaning">Meaning: {getCorrectMeaning(textMeaning)}</div>
                <div className="card__example">Example: {getCorrectMeaning(textExample)}</div>
                <div className="card__translate">Перевод: {wordTranslate}</div>
                <div className="card__meaning-translate">Значение: {textMeaningTranslate}</div>
                <div className="card__example-translate">Пример: {textExampleTranslate}</div>
            </div>
        </div>
        )
    }
}

export default WordCardContainer
