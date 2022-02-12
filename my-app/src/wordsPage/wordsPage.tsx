import React from "react";
import { wordPageApiService } from "./service/wordPageApiService";
import WordCardContainer from '../wordCard/wordCardContainer'
import { card } from '../interface/interface'
import './wordPage.scss';

// const isWeak = async (id: string) => {
//     let data = await wordPageApiService.getFullUserObject((localStorage.getItem('userId') as string))
//     return data.weak.includes(id)
// }

// const isStrong = async (id: string) => {
//     let data = await wordPageApiService.getFullUserObject((localStorage.getItem('userId') as string))
//     return data.strong.includes(id)
// }


type MyProps = {cards: card[], weakArr: string[], strongArr:string[], handlePageLearned: any};
type MyState = { };

export default class WordsPage extends React.Component<MyProps, MyState> {
    render() {
        return (
            <div className="word-page">
                {this.props.cards?.map((card: any) => 
                    <React.Fragment key={card.id}>
                       <WordCardContainer handlePageLearned={this.props.handlePageLearned}  card={card} strongArr={this.props.strongArr} weakArr={this.props.weakArr}/>
                    </React.Fragment>)}
            </div>
        )
    }
}
