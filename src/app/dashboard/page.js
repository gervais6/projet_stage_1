import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Image from 'next/image';
import VECTOR from '../Vector.png';
import SVG from '../SVG.png';
import avatar from '../avatar.png';
import before from '../before.png';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import './dashboard.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from 'next/link';

const drawerWidth = 270;

const dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Premier AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 1000 }}>
            Dashboard
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Recherche..."
            sx={{
              bgcolor: 'white',
              borderRadius: '10000px',
              width: '250px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '10000px',
                '& fieldset': {
                  borderColor: 'grey.400',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.600',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ ml: 2, color: 'black' }}>
            <IoMdNotificationsOutline />
          </IconButton>
          <IconButton sx={{ ml: 1, color: 'black' }}>
            <Image src={avatar} style={{ width: 30, height: 30 }} />
          </IconButton>
          <IconButton sx={{ ml: 1, color: 'black' }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Deuxième AppBar */}
      <AppBar
        position="fixed"
        sx={{
          top: '66px',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ marginTop: 10 }}>
            Bienvenue sur RED Product
            <p style={{ fontSize: 13 }}>Lorem ipsum dolor sit amet consectetur</p>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundImage: `url(${before.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: 'white',
    },
  }}
  variant="permanent"
  anchor="left"
>
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2, 2, 2, 0.7)',
      zIndex: 1,
    }}
  />

  <Box sx={{ display: 'flex', alignItems: 'center', m: 2, zIndex: 2 }}>
    <Image
      src={SVG}
      alt="Product Icon"
      width={30}
      height={30}
      style={{ marginRight: 8 }}
    />
    <Typography variant="h6" sx={{ color: 'white', fontWeight: 1000, ml: 2 }}>
      RED PRODUCT
    </Typography>
  </Box>

  <Divider sx={{ zIndex: 2 }} />
  <List sx={{ zIndex: 2, mt: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
    <Box>
      <Typography variant="subtitle1" sx={{ ml: 2, mb: 2, color: 'white', fontSize: 18 }}>
        Principal
      </Typography>

      <Link href="/dashboard" style={{textDecoration:'none',color:"white"}}>   <ListItem disablePadding >
        <ListItemButton
          sx={{
            width: '100%',
            '&:hover': {
              backgroundColor: 'white',
              '& .MuiListItemIcon-root': {
                color: 'black',
              },
              '& .MuiListItemText-root': {
                color: 'black',
              },
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ fontSize: 24, color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontSize: '18px' }}
          />
        </ListItemButton>
      </ListItem>
      </Link>  


      <Link href="/hotels" style={{textDecoration:'none'}}>
       <ListItem disablePadding>
        <ListItemButton
          sx={{
            width: '100%',
            '&:hover': {
              backgroundColor: 'white',
              '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                color: 'black',
              },
            },
          }}
        >
          <ListItemIcon>
            <Box
              sx={{
                filter: 'brightness(0) invert(1)',
                transition: 'filter 0.3s',
              }}
            >
              <Image src={VECTOR} alt="Liste des hôtels" width={24} height={24} />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary="Liste des hôtels"
            primaryTypographyProps={{ fontSize: '18px' }}
            sx={{ color: 'white' }}
          />
        </ListItemButton>
      </ListItem>
      </Link>

    </Box>
    <hr style={{ marginTop: '400px', border: '1px solid #ccc'  }} />
{/* Section de l'utilisateur en bas */}
<Box
  sx={{
    mt: 'auto',
    p: 2,
    display: 'flex', // Utiliser flexbox
    alignItems: 'center', // Centrer verticalement
    zIndex: 2,
  }}
>
  <Image
    src={avatar}
    style={{
      marginRight: 10, // Espace à droite de l'avatar
      borderRadius: '50%', // Arrondi de l'avatar
      width: 50, // Taille de l'avatar
      height: 50,
    }}
  />
  <Box>
    <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
      Mouhamet Badiane
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: 10, // Largeur du badge
          height: 10, // Hauteur du badge
          borderRadius: '50%', // Arrondi du badge
          bgcolor: 'green', // Couleur verte
          marginRight: 1, // Espace à droite du badge
        }}
      />
      <Typography sx={{ fontSize: 14, color: 'lightgrey' }}>
        En ligne
      </Typography>
    </Box>
  </Box>
</Box>



  </List>
</Drawer>


      {/* Contenu principal */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box sx={{ marginTop: 15, padding: 2 }}>
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              <div className="col">
                <div className="card radius-10" style={{ width: '100%', minHeight: '100px' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="widgets-icons-2 rounded-circle bg-custom-1 text-white me-3">
                        <i className="fa fa-envelope-open"></i>
                      </div>
                      <div>
                        <h4 className="my-1">125  <span style={{fontSize:17}}>Formulaires</span></h4>
                        <p className="mb-0 font-13">Je ne sais pas quoi mettre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card radius-10" style={{ width: '100%', minHeight: '100px' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="widgets-icons-2 rounded-circle bg-custom-2 text-white me-3">
                        p
                      </div>
                      <div>
                        <h4 className="my-1">40 <span style={{fontSize:17}}>Messages</span></h4>
                        <p className="mb-0 font-13">Je ne sais pas quoi mettre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card radius-10" style={{ width: '100%', minHeight: '100px' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="widgets-icons-2 rounded-circle bg-custom-3 text-white me-3">
                        <i className="fa fa-users"></i>
                      </div>
                      <div>
                        <h4 className="my-1">600<span style={{fontSize:17}}> Utilisateurs</span></h4>
                        <p className="mb-0 font-13">Je ne sais pas quoi mettre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card radius-10" style={{ width: '100%', minHeight: '100px' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="widgets-icons-2 rounded-circle bg-custom-4 text-white me-3">
                        <i className="fa fa-envelope-open"></i>
                      </div>
                      <div>
                        <h4 className="my-1">25 <span style={{fontSize:17}}> E-mails</span></h4>
                        <p className="mb-0 font-13">Je ne sais pas quoi mettre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card radius-10" style={{ width: '100%', minHeight: '100px' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="widgets-icons-2 rounded-circle bg-custom-5 text-white me-3">
                        p
                      </div>
                      <div>
                        <h4 className="my-1">40 <span style={{fontSize:17}}>hôtels</span></h4>
                        <p className="mb-0 font-13">Je ne sais pas quoi mettre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card radius-10" style={{ width: '100%', minHeight: '100px' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="widgets-icons-2 rounded-circle bg-custom-6 text-white me-3">
                        <i className="fa fa-users"></i>
                      </div>
                      <div>
                        <h4 className="my-1">02<span style={{fontSize:17}}> Entités</span></h4>
                        <p className="mb-0 font-13">Je ne sais pas quoi mettre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default dashboard;
