import React from "react";
import { wordPageApiService } from "./service/wordPageApiService";
import WordCardContainer from '../wordCard/wordCardContainer'
import { card } from '../interface/interface'

type MyProps = {};
type MyState = { cards: card[]};

export default class WordsPage extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props)
        this.state = {
            cards: [],
        }
    }

    componentDidMount() {
        wordPageApiService.getWords(1,1).then(data => {
            this.setState({
                cards: data,
            })
        })
    }

    render() {
        return (
            <div className="word-page">
                {this.state.cards?.map((card: any) => 
                    <React.Fragment key={card.id}>
                       <WordCardContainer  card={card}/>
                    </React.Fragment>)}
            </div>
        )
    }
}