import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';




// export default function DisableElevation({ sections, page }: { sections: string; page: string }) {
  export default function DisableElevation(props: any) {
    const { setPagePathSecond, setPagePath } = useActions();
    const navigate = useNavigate();


  const handleClickAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem('isAudioGameTurnOnByDictionary', 'true')
}

const handleClickSprint = (event: React.MouseEvent<HTMLButtonElement>) => {
  setPagePath('game-page');
  setPagePathSecond('isSprintFromDictionary');
  navigate('/game');
}



  return (
    <div className='games__buttons'>
      <Link 
      to='/audio'
      >
      <Button onClick={handleClickAudio} variant="contained" disableElevation>
            AUDIO CHALLENGE
        </Button>
      </Link>

        <Button onClick={handleClickSprint} variant="contained" disableElevation>
            SPRINT
        </Button>
    </div>
  );
}