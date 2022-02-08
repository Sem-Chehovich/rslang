import React from "react";
import { card } from '../interface/interface'
import { getCorrectUrl } from '../utilities/utilities'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained">Custom CSS</ColorButton>
    </Stack>
  );
}

const SoundButton = ({audio, audioExample, audioMeaning}: card) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const sound = new Audio()
        sound.src = getCorrectUrl(audio)
        const soundExample = new Audio()
        soundExample.src = getCorrectUrl(audioExample)
        const soundMeaning = new Audio()
        soundMeaning.src = getCorrectUrl(audioMeaning)
        sound.play()
        sound.onended = () => {
            soundExample.play()
            soundExample.onended = () => {
                soundMeaning.play()
            }
        }
    }

    return (
        <CustomizedButtons />
        // <button onClick={ handleClick } className="sound__button"></button>
    )
}

export default SoundButton
