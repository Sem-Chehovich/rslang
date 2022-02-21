import React from "react";
import './wordCard.scss';
import SoundButton from './soundButton';
import { getCorrectUrl, getCorrectMeaning } from '../utilities/utilities';
import { card, stateObj, initWordOptional, IUserWord } from '../interface/interface';
import FormControlLabelPosition from './component/togleButtons'
import { isAuthorized } from '../utilities/utilities'
import { wordPageApiService } from '../wordsPage/service/wordPageApiService'
import StudyProgress from './component/studyProgress'

type MyProps = { card: card,  weakArr: string[], strongArr:string[], handlePageLearned: any };
type MyState = { isLearned: boolean, isDifficult: boolean, sprintRightCount: number, sprintWrongCount: number, audioRightCount: number, audioWrongCount: number, userArr: string[] };


class WordCardContainer extends React.Component<MyProps, MyState> {
    cardRef: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props)
        this.state = {
            isLearned: false,
            isDifficult: false,
            sprintRightCount: 0,
            sprintWrongCount: 0,
            audioRightCount: 0,
            audioWrongCount: 0,
            userArr: [],
        }
        this.cardRef = React.createRef()
    }

    componentDidMount() {
        localStorage.getItem('userId') && wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string)).then(data => {
            let strong: any = []
            let weak: any = []
            //console.log(data)
            data.forEach((word: { difficulty: string; wordId: string; optional: {sprintGame: {wrongAns: number, rightAns: number}, audioGame: { rightAns: number, wrongAns: number,}} }) => {
                if (word.difficulty === 'strong') {
                    strong.push(word.wordId)
                }
                if (word.difficulty === 'weak') {
                    weak.push(word.wordId)
                }
                if (word.optional?.sprintGame?.wrongAns && this.props.card.id === word.wordId) {
                    this.setState({sprintWrongCount: word.optional.sprintGame.wrongAns})
                }
                if (word.optional?.sprintGame?.rightAns && this.props.card.id === word.wordId) {
                    this.setState({sprintRightCount: word.optional.sprintGame.rightAns})
                }
                if (word.optional?.audioGame?.rightAns && this.props.card.id === word.wordId) {
                    this.setState({audioRightCount: word.optional.audioGame.rightAns})
                }
                if (word.optional?.audioGame?.wrongAns && this.props.card.id === word.wordId) {
                    this.setState({audioWrongCount: word.optional.audioGame.wrongAns})
                }
            })

            wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
            .then(data => {
                this.setState({ userArr: data })
            })

            return ({ strong, weak })
            }).then((data) => {
                if (data.weak.includes(this.props.card.id)) {
                    this.setState({ isLearned: true })
                }
                if (data.strong.includes(this.props.card.id)) {
                    this.setState({ isDifficult: true })
                }
            })

    }

    componentWillUnmount() {

    }

    // shouldComponentUpdate(nextProps: any) {
    //     if (nextProps.weakArr !== this.props.weakArr || nextProps.strongArr !== this.props.strongArr) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    // }
    
    changeCardClass = async (stateObj: stateObj ) => {
        this.setState({ isLearned: stateObj.isLearned,
            isDifficult: stateObj.isDifficult })
            let word
        const isWordAvailable = await wordPageApiService.getUserWordById((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string)) 
        console.log(isWordAvailable)
        if (stateObj.isDifficult) {
            let sprintGame = await { ...(await isWordAvailable?.optional.sprintGame), totalRightAns: 0 }
            let audioGame = await { ...(await isWordAvailable?.optional.audioGame), totalRightAns: 0 }
            let optional =  { audioGame: { ...audioGame }, sprintGame: { ...sprintGame } }
            word = {difficulty: 'strong', optional: { ...optional }}
            console.log(word)
            // word = { "difficulty": "strong"}
        } else if (stateObj.isLearned) {
            word = { "difficulty": "weak"}
        }  
        else if (!stateObj.isDifficult) {
            word = { "difficulty": "noStatus"}
        }  else if (!stateObj.isLearned) {
            word = { "difficulty": "noStatus"}
        }  
        if(isWordAvailable) {
            await  wordPageApiService.updateUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string), word)
        } else {
            let defaultWord = { ...initWordOptional, ...word }
            await wordPageApiService.createUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string), defaultWord)
        }
        console.log(isWordAvailable)
        // let arr = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
        // wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
        //     .then(data => {
        //         this.setState({ userArr: data })
        //     })
        // this.setState({ userArr: await arr })
        // isWordAvailable ? await  wordPageApiService.updateUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string), word)
            // : await wordPageApiService.createUserWord((localStorage.getItem('userId') as string), (this.cardRef.current?.id as string), word)
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
                {isAuthorized() && <FormControlLabelPosition userArr={this.state.userArr} handlePageLearned={this.props.handlePageLearned} changeCardClass={this.changeCardClass} 
                                        isLearned={this.state.isLearned} isDifficult={this.state.isDifficult}/>}
                </div>
                <div className="card__transcription">Transcription: {transcription}</div>
                <div className="card__meaning">Meaning: {getCorrectMeaning(textMeaning)}</div>
                <div className="card__example">Example: {getCorrectMeaning(textExample)}</div>
                <div className="card__translate">Перевод: {wordTranslate}</div>
                <div className="card__meaning-translate">Значение: {textMeaningTranslate}</div>
                <div className="card__example-translate">Пример: {textExampleTranslate}</div>
               {isAuthorized() && <StudyProgress 
                sprintRightCount={this.state.sprintRightCount}  
                sprintWrongCount={this.state.sprintWrongCount}
                audioRightCount={this.state.audioRightCount}
                audioWrongCount={this.state.audioWrongCount}
                />}
            </div>
        </div>
        )
    }
}

export default WordCardContainer
