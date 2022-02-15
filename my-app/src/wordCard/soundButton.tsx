import React from "react";
import { card } from '../interface/interface'
import { getCorrectUrl } from '../utilities/utilities'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import FormControlLabelPosition from './component/togleButtons'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#d26c6a',
  '&:hover': {
    backgroundColor: purple[900],
  },
}));

const SoundButton = ({audio, audioExample, audioMeaning}: card) => {
    const sound = new Audio()
    const soundExample = new Audio()
    const soundMeaning = new Audio()
    sound.src = getCorrectUrl(audio)
    soundExample.src = getCorrectUrl(audioExample)
    soundMeaning.src = getCorrectUrl(audioMeaning)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        sound.pause()
        soundExample.pause()
        soundMeaning.pause()
        sound.currentTime = 0
        soundExample.currentTime = 0
        soundMeaning.currentTime = 0
        sound.play()
        sound.onended = () => {
            soundExample.play()
            soundExample.onended = () => {
                soundMeaning.play()
            }
        }
    }

    return (
        <>
        <div className="sound__button">
            <Stack spacing={2} direction="row">
                <ColorButton  onClick={ handleClick } variant="contained">listen</ColorButton>
            </Stack>
        </div>
        </>
    )
}

export default SoundButton
