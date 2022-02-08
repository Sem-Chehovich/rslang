import React, { useEffect } from "react";
import { useState } from 'react';
import WordsPage from './wordsPage';
import { wordPageApiService } from './service/wordPageApiService';
import { Spinner } from '../spiner/spinner';
import Selector from './components/select';
import BasicPagination from './components/pagination'
import './wordPage.scss';
const BTN_ARR = ['1', '2', '3', '4', '5', '6'];

const WordsPageContainer = () => {

      const [sections, setSections] = React.useState('');
      const [page, setPage] = React.useState(1);


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

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSections(event.target.value);
        setPage(1);
        let id = `${event.target.value}`
        // setGroup(id)
        setIsLoading(true)
        wordPageApiService.getWords('0', id).then(data => {
            setCards(data)
            setIsLoading(false)
        })
      };

      
      const handleChangePag = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        let id = `${+((event.target as HTMLButtonElement).textContent as string) - 1}`
        // setGroup(id)
        setIsLoading(true)
        wordPageApiService.getWords(id, sections).then(data => {
            setCards(data)
            setIsLoading(false)
        })
      };

    return (
        <>                                   
            { isLoading ? <Spinner /> : (
                <>
                <div>
                    <div className="category__buttons">
                        <Selector
                        handleChange={handleChange}
                        sections={sections}
                        />
                    </div>
                    <WordsPage cards={cards} />
                </div>
                <div className="pagination__container">
                    <BasicPagination handleChangePag={handleChangePag}
                    page={page} />
                </div> 
                </>
            )}
        </>

    )


}

export default WordsPageContainer
