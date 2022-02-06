import React from "react";
// import { wordPageApiService } from "./service/wordPageApiService";
import WordCardContainer from '../wordCard/wordCardContainer'
import { card } from '../interface/interface'


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

    // componentDidMount() {
    //     wordPageApiService.getWords(1,1).then(data => {
    //         this.setState({
    //             cards: data,
    //         })
    //     })
    // }

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
