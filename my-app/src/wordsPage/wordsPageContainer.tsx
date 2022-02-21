import React, { useEffect } from "react";
import { useState } from 'react';
import WordsPage from './wordsPage';
import { wordPageApiService } from './service/wordPageApiService';
import { Spinner } from '../spinner/spinner';
import Selector from './components/select';
import BasicPagination from './components/pagination'
import './wordPage.scss';
import { card } from '../interface/interface';
import { checkIfPageLearned } from '../utilities/utilities'
import BasicAlerts from './components/alert'
import DisableElevation from './components/gamesButtons'
import ScrollToBtn from './components/scrollToBtn'
import { isAuthorizedUser } from "../authorization/validateToken";
import { useNavigate } from "react-router";



const WordsPageContainer = () => {

      const [sections, setSections] = React.useState(localStorage.getItem('section') || localStorage.setItem('section', '0'));
      const [page, setPage] = React.useState(localStorage.getItem('page') || localStorage.setItem('page', '1'));
      const [userId] = React.useState(localStorage.getItem('userId') || undefined);
      const [strongArr] = useState<any>([]);
      const [weakArr] = useState<any>([]);
      const [isPageLearned, setIsPageLearned] = React.useState(false)
      const [cards, setCards] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      const [isTopScrollShown, setIsTopScrollShown] = useState(false)
      const [isBottomScrollShown, setIsBottomScrollShown] = useState(false)
      const navigate = useNavigate();

      const showScroll = () => {
        if (window.pageYOffset >= 1500) {
            setIsTopScrollShown(true)
        } else if (window.pageYOffset < 1500) {
            setIsTopScrollShown(false)
        }
        if (window.pageYOffset <= 6300) {
            setIsBottomScrollShown(true)
        } else if (window.pageYOffset > 6300) {
            setIsBottomScrollShown(false)
        }
    }  

    useEffect(() => {
        window.addEventListener('scroll', showScroll)
        return () => {
            window.removeEventListener('scroll', showScroll)
        }
    })  

    useEffect(() => {
        async function getData() {
            const checkAuth = await isAuthorizedUser();
            
            if (checkAuth === 'redirect' && localStorage.getItem('userId')) {
              navigate('/authorization');
            }
        }
        getData();
        setIsLoading(true)
        if (+sections < 6) {

            const compareCards = async() => {
               let cards = await wordPageApiService.getWords((+page - 1) + '' , sections || '0')
                    setCards(cards)
                    setIsLoading(false)
               let userCards = userId ? await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string)) : []
               
               setIsPageLearned(checkIfPageLearned(cards, userCards))
            }

            compareCards()
        }else{
            setIsPageLearned(false)
            const loadUserCards = async () => {
                let userWordIdArr = userId ? await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string)) : []
                let promise:  Promise<any> = new Promise((resolve) => { 
                    let arr: any[] = []
                    let newArray = userWordIdArr.filter((el: { difficulty: string; }) =>  el.difficulty === 'strong' )
                    if (newArray.length === 0) {
                        wordPageApiService.getWords('0', '6').then(data => {
                            setCards(data)
                            setIsLoading(false)
                        })
                        return
                    }
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
        setSections(event.target.value as string);
        setPage('1');
        let id = `${event.target.value}`
        localStorage.setItem('section', id)
        setIsLoading(true)
        if (id === '6' && localStorage.getItem('userName')) {
            setIsPageLearned(false)
            let userWordIdArr = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
            let promise:  Promise<any> = new Promise((resolve) => { 
                let arr: any[] = []
                let newArray = userWordIdArr.filter((el: { difficulty: string; }) =>  el.difficulty === 'strong' )
                if (newArray.length === 0) {
                    wordPageApiService.getWords('0', '6').then(data => {
                        setCards(data)
                        setIsLoading(false)
                    })
                    return
                }
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
                setIsLoading(false)
            })}, 1000)

        } else {
            wordPageApiService.getWords('0', id).then(data => {
                setCards(data)
                setIsLoading(false)
            })
        }
      };

      const handleChangePag = (event: React.ChangeEvent<unknown>, value: string) => {
        setPage(value);
        let id = `${+((event.target as HTMLButtonElement).textContent as string) - 1}`
        localStorage.setItem('page', `${value}`)
        setIsLoading(true)

        if (+sections < 6) {
            wordPageApiService.getWords(id, sections as string).then(data => {
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
                    {isTopScrollShown && <ScrollToBtn direction="top" />}
                    {isBottomScrollShown && <ScrollToBtn direction="bottom" />}
                    <div className="category__buttons">
                        <Selector
                        handleChange={handleChange}
                        sections={sections}
                        />
                        {+sections < 6 && <DisableElevation sections={sections} page={page} />}
                    </div>
                    {isPageLearned && <div className="alert__wrapper"> <BasicAlerts /> </div>}
                    <WordsPage 
                        handlePageLearned={handlePageLearned} 
                        cards={cards} 
                        strongArr={strongArr} 
                        weakArr={weakArr}
                        isPageLearned={isPageLearned}
                    />
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
