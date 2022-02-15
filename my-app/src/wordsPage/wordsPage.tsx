import React from "react";
import { wordPageApiService } from "./service/wordPageApiService";
import WordCardContainer from '../wordCard/wordCardContainer'
import { card } from '../interface/interface'
import './wordPage.scss';

type MyProps = {cards: card[], weakArr: string[], strongArr:string[], handlePageLearned: any, isPageLearned: boolean};
type MyState = { };

export default class WordsPage extends React.Component<MyProps, MyState> {
    render() {
        const pageClasses = this.props.isPageLearned ? 'page__learned' : ''
        return (
            <div className={`word-page ${pageClasses}`}>
                {this.props.cards?.map((card: any) => 
                    <React.Fragment key={card.id}>
                       <WordCardContainer handlePageLearned={this.props.handlePageLearned}  card={card} strongArr={this.props.strongArr} weakArr={this.props.weakArr}/>
                    </React.Fragment>)}
            </div>
        )
    }
}
