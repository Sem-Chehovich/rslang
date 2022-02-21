import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../sprint-game/service';




// export default function DisableElevation({ sections, page }: { sections: string; page: string }) {
  export default function DisableElevation({ isPageLearned, sections, page}: {isPageLearned: boolean, sections: string, page: string}) {
    const { setPagePathSecond, setPagePath, setGroup, setPage, setUserInGame, fetchWords, clearWords } = useActions();
    const navigate = useNavigate();
    // let pageLearn = isPageLearned

  const handleClickAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem('isAudioGameTurnOnByDictionary', 'true')
    setPagePath('game-page');
}

const handleClickSprint = (event: React.MouseEvent<HTMLButtonElement>) => {
  clearWords([]); 
  const group = Number(localStorage.getItem('section')) | 0;
  const startPage = Number(localStorage.getItem('page')) | 1;
  
  setGroup(group);
  setPage(startPage - 1);
  let prevPage = startPage;
  
  const userIn = checkUser();
  
  if (userIn === 'authorized') { 
    setUserInGame(true);

    while (prevPage--) {
      fetchWords(group, prevPage, userIn);
    }
  } else {
    setUserInGame(false);

    while (prevPage--) {
      fetchWords(group, prevPage);
    }
  }
   
  setPagePath('game-page');
  setPagePathSecond('isSprintFromDictionary');
  navigate('/game');
}



  return (
    <div className='games__buttons'>
    { isPageLearned ? (
            <Button onClick={handleClickAudio} disabled={isPageLearned}  variant="contained" disableElevation>
            AUDIO CHALLENGE
        </Button>
    ) : ( <Link
      to='/audio'
      >
      <Button onClick={handleClickAudio} disabled={isPageLearned}  variant="contained" disableElevation>
            AUDIO CHALLENGE
        </Button>
      </Link>)}

        <Button onClick={handleClickSprint} disabled={isPageLearned} variant="contained" disableElevation>
            SPRINT
        </Button>
    </div>
  );
}