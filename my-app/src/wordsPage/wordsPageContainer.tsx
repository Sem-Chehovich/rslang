import React, { useEffect } from "react";
import { useState } from 'react';
import WordsPage from './wordsPage'
import { wordPageApiService } from './service/wordPageApiService'
import { Spinner } from '../spiner/spinner'
const BTN_ARR = ['1', '2', '3', '4', '5', '6'];

const WordsPageContainer = () => {

    // const [group, setGroup] = useState('1')
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        wordPageApiService.getWords('0', '0').then(data => {
            setCards(data)
            setIsLoading(false)
        })
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = (event.target as HTMLButtonElement).id
        // setGroup(id)
        setIsLoading(true)
        wordPageApiService.getWords('1', id).then(data => {
            setCards(data)
            setIsLoading(false)
        })
    }
    return (
        <>        
            { isLoading ? <Spinner /> : (
                <div>
                    <div className="category__buttons">
                        {BTN_ARR.map((el, index) => (
                            <button key={index} id={`${index}`} onClick={handleClick}  className="category__button">{`Category  ${el}`}</button>
                        ))}
                    </div>
                    <WordsPage cards={cards} />
                </div>
            )}
        </>

    )


}

export default WordsPageContainer
