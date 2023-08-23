import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../ContextStore';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const {primaryColor , themeColors, setContextState} = useAppContext()

const navigation = useNavigate()


  const handleSelectedSubMenu = async (color) => {
    // event.stopPropagation()
    
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.patch('http://localhost:5000/api/update',{primaryColor: color},  {
        headers: {
          Authorization: `${token}`, 
        },
      });

      alert(`Primary Color Updated ${color}`)

      setContextState((prev) => {
        return  {...prev, primaryColor: color}
      }
        )
        handleCloseChooseColorSubMenu()

    } catch (err) {
      console.log(`Something went wrong ${err.message}`)
    }
    

   


   
  }

  const [chooseColorAnchorEl, setChooseColorAnchorEl] = React.useState(null);

  const handleOpenChooseColorSubMenu = (event) => {
    setChooseColorAnchorEl(event.currentTarget);
  };

  const handleCloseChooseColorSubMenu = () => {
    setChooseColorAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        
        <Button
         aria-owns={Boolean(chooseColorAnchorEl) ? "simple-menu" : null}
        sx={{
          color: 'white',
          zIndex: 1301 
        }}
        onMouseOver={handleOpenChooseColorSubMenu}
          // onMouseLeave={handleCloseChooseColorSubMenu}
        >
          Choose Color
        </Button>
        
        <Menu
          anchorEl={chooseColorAnchorEl}
          open={Boolean(chooseColorAnchorEl)}
          onClose={handleCloseChooseColorSubMenu}
        >
          {
            themeColors.map((color) => {
             return  (
             <MenuItem
              key={color}
              value={color}
              selected={color === primaryColor}
              onClick={(evt) => handleSelectedSubMenu(color)}
              >
                {color}
                </MenuItem>
                )
            })
          }
        </Menu>
        <Button
        onClick={()=> {
          sessionStorage.clear('token')
          sessionStorage.clear('primaryColor')
          setContextState((prev) => {
            return {...prev, isLoggedIn: false, token: null}
          })
          navigation('/login')
        }}
        color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
