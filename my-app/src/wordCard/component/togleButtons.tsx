import React, { useEffect } from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import '../wordCard.scss';
import { wordPageApiService } from '../../wordsPage/service/wordPageApiService';
import { checkIfPageLearned } from '../../utilities/utilities'


export default function FormControlLabelPosition({ changeCardClass, isLearned, isDifficult, handlePageLearned }: any) {

    const [checkedDif, setCheckedDif] = React.useState(false);
    const [checkedLean, setCheckedLean] = React.useState(false);

    const compareCards = async() => {
        const page = localStorage.getItem('page')
        const section = localStorage.getItem('section')
        let cards = await wordPageApiService.getWords((+(page as string) - 1) + '' , section || '0')
        let userCards = await wordPageApiService.getAllUserWords((localStorage.getItem('userId') as string))
        
        handlePageLearned(checkIfPageLearned(cards, userCards))
     }

    const handleChangeDif = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = {
            isLearned: false,
            isDifficult: event.target.checked,
        }
        changeCardClass(obj)

        setCheckedDif(event.target.checked);
        setCheckedLean(false);
        compareCards()
      };

      const handleChangeLean = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = {
            isLearned: event.target.checked,
            isDifficult: false,
        }
        changeCardClass(obj)
        setCheckedDif(false);
        setCheckedLean(event.target.checked);
        compareCards()
      };  

    return (
        <div className="toggle-buttons">
            <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel 
                value="difficult word"
                control={<Switch color="error" 
                checked={checkedDif || isDifficult}
                onChange={handleChangeDif}
                 />}
                label="DIFFICULT WORD"
                labelPlacement="start"
                />
                <FormControlLabel
                value="LEARNED WORD"
                control={<Switch color="success"
                checked={checkedLean || isLearned}
                onChange={handleChangeLean}
                />}
                label="LEARNED WORD"
                labelPlacement="start"
                />
            </FormGroup>
            </FormControl>
        </div>
      );
  }