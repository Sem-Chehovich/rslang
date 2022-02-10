import React from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import '../wordCard.scss';


export default function FormControlLabelPosition({ changeCardClass }: any) {

    const [checkedDif, setCheckedDif] = React.useState(false);
    const [checkedLean, setCheckedLean] = React.useState(false);

    const handleChangeDif = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = {
            isLearned: false,
            isDifficult: event.target.checked,
        }
        changeCardClass(obj)

        setCheckedDif(event.target.checked);
        setCheckedLean(false);
      };

      const handleChangeLean = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = {
            isLearned: event.target.checked,
            isDifficult: false,
        }
        changeCardClass(obj)
        setCheckedDif(false);
        setCheckedLean(event.target.checked);
      };  

    return (
        <div className="toggle-buttons">
            <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel 
                value="difficult word"
                control={<Switch color="error" 
                checked={checkedDif}
                onChange={handleChangeDif}
                 />}
                label="DIFFICULT WORD"
                labelPlacement="start"
                />
                <FormControlLabel
                value="LEARNED WORD"
                control={<Switch color="success"
                checked={checkedLean}
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