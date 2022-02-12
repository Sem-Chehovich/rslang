import React, { useEffect } from "react";
import { useState } from 'react';
import WordsPage from './wordsPage';
import { wordPageApiService } from './service/wordPageApiService';
import { Spinner } from '../spiner/spinner';
import Selector from './components/select';
import BasicPagination from './components/pagination'
import './wordPage.scss';
import { card, stateObj } from '../interface/interface';
import { checkIfPageLearned } from '../utilities/utilities'


const WordsPageContainer = () => {

      const [sections, setSections] = React.useState(localStorage.getItem('section') || '');
      const [page, setPage] = React.useState(localStorage.getItem('page') || 1);
      const [userId, setUserId] = React.useState(localStorage.getItem('userId') || undefined);
      const [strongArr, setStrongArr] = useState<any>([]);
      const [weakArr, setWeakArr] = useState<any>([]);
      const [isPageLearned, setIsPageLearned] = React.useState(false)
      const [cards, setCards] = useState([])
      const [isLoading, setIsLoading] = useState(true)

  

    useEffect(() => {
        setIsLoading(true)
        if (+sections < 6) {
            // wordPageApiService.getWords((+page - 1) + '' , sections || '0').then(data => {
            //     setCards(data)
            //     setIsLoading(false)
            // })

            const compareCards = async() => {
               let cards = await wordPageApiService.getWords((+page - 1) + '' , sections || '0')
                    setCards(cards)
                    setIsLoading(false)
               let userCards = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
               
               setIsPageLearned(checkIfPageLearned(cards, userCards))
            }

            compareCards()
        }else{
            // setTimeout(() => {
            //     setIsLoading(false)
            // }, 1000)
            const loadUserCards = async () => {
                let userWordIdArr = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
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
    
                })
                
                setTimeout(() => {promise.then((data) => {
                    setCards(data)
                    // localStorage.setItem('card', JSON.stringify(data))
                    setIsLoading(false)
                })}, 1000)
            }

            loadUserCards()
        }
    }, [page, sections, userId])

   const handlePageLearned = (bool: boolean) => {
    setIsPageLearned(bool)
    }

    const handleChange = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSections(event.target.value);
        setPage(1);
        let id = `${event.target.value}`
        localStorage.setItem('section', id)
        setIsLoading(true)
        if (id === '6') {
            let userWordIdArr = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
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

            })
            
            setTimeout(() => {promise.then((data) => {
                setCards(data)
                // localStorage.setItem('card', JSON.stringify(data))
                setIsLoading(false)
            })}, 1000)

        } else {
            wordPageApiService.getWords('0', id).then(data => {
                setCards(data)
                setIsLoading(false)
            })
        }
      };

      
      const handleChangePag = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        let id = `${+((event.target as HTMLButtonElement).textContent as string) - 1}`
        localStorage.setItem('page', `${value}`)
        setIsLoading(true)

        if (+sections < 6) {
            wordPageApiService.getWords(id, sections).then(data => {
                setCards(data)
                setIsLoading(false)
            })
        }
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
                    {isPageLearned && <div> Вы изучили весь раздел </div>}
                    <WordsPage handlePageLearned={handlePageLearned} cards={cards} strongArr={strongArr} weakArr={weakArr}/>
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
