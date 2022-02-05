import React from "react";
import { card } from '../interface/interface'
import { getCorrectUrl } from '../utilities/utilities'

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
        <button onClick={ handleClick } className="sound__button"></button>
    )
}

export default SoundButton
