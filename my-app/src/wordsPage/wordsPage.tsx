import React from "react";
// import { wordPageApiService } from "./service/wordPageApiService";
import WordCardContainer from '../wordCard/wordCardContainer'
import { card } from '../interface/interface'
import './wordPage.scss';


type MyProps = {cards: card[]};
type MyState = { cards: card[]};

export default class WordsPage extends React.Component<MyProps, MyState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props)
        // this.state = {
        //     cards: [],
        // }
    }


    render() {
        return (
            <div className="word-page">
                {this.props.cards?.map((card: any) => 
                    <React.Fragment key={card.id}>
                       <WordCardContainer  card={card}/>
                    </React.Fragment>)}
            </div>
        )
    }
}
