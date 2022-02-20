import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ScrollToBtn({ direction }: {direction: string}) {

    const coord = direction === 'top' ? 0 : document.body.scrollHeight

    const onHandleClick = () => {
        window.scrollTo({
            top: coord,
            behavior: "smooth"
        })

    }


  return (
      <div className={`scroll-btn ${direction}`}>
            <IconButton onClick={onHandleClick} aria-label="fingerprint" color="secondary">
                {direction === 'top' ? <ExpandLessIcon fontSize='large' /> :  <ExpandMoreIcon fontSize='large' />}
            </IconButton>
      </div>
  );
}