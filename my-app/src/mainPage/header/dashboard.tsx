import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='dashboard'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        MENU
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link className='dashbord-link' to={'/textbook'}>
            <MenuItem onClick={handleClose}>Dictionary</MenuItem>
        </Link>  
        <Link className='dashbord-link' to={'/game'}>
            <MenuItem onClick={handleClose}>Sprint</MenuItem>
        </Link>
        <Link className='dashbord-link' to={'/audio'}>
            <MenuItem onClick={handleClose}>Audio challenge</MenuItem>
        </Link>
        <Link className='dashbord-link' to={'/statistics'}>
            <MenuItem onClick={handleClose}>Statistics</MenuItem>
        </Link>
        <Link className='dashbord-link' to={'/home'}>
            <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>
        <Link className='dashbord-link' to={'/authorization'}>
            <MenuItem onClick={handleClose}>Authorization</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}