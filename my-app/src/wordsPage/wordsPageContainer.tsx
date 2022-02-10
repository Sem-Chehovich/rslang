import React, { useEffect } from "react";
import { useState } from 'react';
import WordsPage from './wordsPage';
import { wordPageApiService } from './service/wordPageApiService';
import { Spinner } from '../spiner/spinner';
import Selector from './components/select';
import BasicPagination from './components/pagination'
import './wordPage.scss';
import { card, stateObj } from '../interface/interface';


const WordsPageContainer = () => {

      const [sections, setSections] = React.useState(localStorage.getItem('section') || '');
      const [page, setPage] = React.useState(localStorage.getItem('page') || 1);


    // const [group, setGroup] = useState('1')
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        wordPageApiService.getWords((+page - 1) + '' , sections || '0').then(data => {
            setCards(data)
            setIsLoading(false)
        })
    }, [page, sections])

    const handleChange = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSections(event.target.value);
        setPage(1);
        let id = `${event.target.value}`
        localStorage.setItem('section', id)
        // setGroup(id)
        setIsLoading(true)
        wordPageApiService.getWords('0', id).then(data => {
            setCards(data)
            setIsLoading(false)
        })
        if (id === '6') {
            let userWordIdArr = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
            console.log(userWordIdArr)
            let promise:  Promise<any> = new Promise((resolve) => { 
                let arr: any[] = []
                let newArray = userWordIdArr.filter((el: { difficulty: string; }) =>  el.difficulty === 'strong' )

                newArray.forEach(async (card: card, index: number) => {
                    let data = await wordPageApiService.getUserWords(card.wordId)
                    arr.push(data)
                    if (index === newArray.length - 1) {
                            resolve(arr)
                        }
                })

                // userWordIdArr.forEach(async (card: card, index: number) => {
                //     if(card.difficulty === 'strong') {
                //         let data = await wordPageApiService.getUserWords(card.wordId)
                //         arr.push(data)
                        // if (index === userWordIdArr.length - 1) {
                        //     resolve(arr)
                        // }
                //     }
                // })
                // resolve(arr)
            })
            
            setTimeout(() => {promise.then((data) => {
                // return data
                console.log(data)
                setCards(data)
                setIsLoading(false)
            })}, 1000)

        }
      };

      
      const handleChangePag = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        let id = `${+((event.target as HTMLButtonElement).textContent as string) - 1}`
        // setGroup(id)
        // localStorage.setItem('page', id)
        localStorage.setItem('page', `${value}`)
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
                    {+sections < 6 && <BasicPagination handleChangePag={handleChangePag}
                    page={+page} />}
                </div> 
                </>
            )}
        </>

    )


}

export default WordsPageContainer
