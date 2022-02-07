import React from "react";
import './wordCard.scss';
import SoundButton from './soundButton';
import { getCorrectUrl, getCorrectMeaning } from '../utilities/utilities';
import { card } from '../interface/interface';

type MyProps = { card: card };
type MyState = {};

class WordCardContainer extends React.Component<MyProps, MyState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props)
    }

    render() {
        const { image, word, transcription, textMeaning, textExample, wordTranslate, textMeaningTranslate, textExampleTranslate, audio, audioMeaning, audioExample } = this.props.card
        return (
            <div className="card">
            <div className="card__img-wrapper">
                <img className="card__img" src={getCorrectUrl(image)} alt="word img" />
            </div>
            <div className="card__content">
                <div className="card__titel-wrapper">
                <div className="card__titel">{word}</div>
                <SoundButton audio={audio} audioExample={audioExample} audioMeaning={audioMeaning}/>
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
