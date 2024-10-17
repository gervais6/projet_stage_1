"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Image from 'next/image';
import VECTOR from '../Vector.png';
import avatar from '../avatar.png';
import before from '../before.png';
import SVG     from '../SVG.png';

import { TextField, InputAdornment, IconButton, Button ,useMediaQuery} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import './hotel.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from 'next/link';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';


const drawerWidth = 280;

const Hotel = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Écran mobile
  const drawerWidth = isMobile ? 100 :150; // Largeur du drawer en fonction de la taille de l'écran

  const [hovered, setHovered] = useState(null);
  const handleMouseEnter = (index) => {
    setHovered(index);
  };
  
  const handleMouseLeave = () => {
    setHovered(null);
  };
  

  const [hotels, setHotels] = useState([]); // État pour stocker les hôtels
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche


  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('https://projet-stage-1-3.onrender.com/hotels/hotels'); // Remplacez par votre URL API
        const data = await response.json();
        setHotels(data); // Mettre à jour l'état avec les données récupérées
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchHotels();
  }, []);


  const filteredHotels = hotels.filter((hotel) => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <Box sx={{ display: 'flex' }}>
      
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
            Liste des hôtels 
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Recherche..."
            value={searchQuery} // Valeur liée à l'état de la recherche
            onChange={(e) => setSearchQuery(e.target.value)} // Mettre à jour la recherche
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


<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Typography variant="h6" style={{ marginTop: 10 }}>
  Hôtels : {filteredHotels.length}
  </Typography>

  <Link href="/nouveau_hotel" style={{textDecoration:'none'}}>
    <Button 
      variant="contained" 
      startIcon={<AddIcon />} // Ajout de l'icône à gauche du texte
      sx={{ 
        textDecoration:'none',
        textTransform: 'none', 
        backgroundColor: 'white', 
        color: 'black', 
        borderRadius: '14px', 
        width: '200px',
        '&:hover': {
          backgroundColor: '#f0f0f0', // pour un léger effet de survol
        }
      }}
    >
      Ajouter un hôtel
    </Button>
  </Link>
</Toolbar>


</AppBar>


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
      variant={isMobile ? 'temporary' : 'permanent'} // Drawer temporaire sur mobile, permanent sinon
      anchor="left"
      ModalProps={{
        keepMounted: true, // Garde le Drawer monté sur mobile
      }}
    >
      {/* Overlay transparent pour l'arrière-plan */}
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
      {/* Contenu du Drawer */}
      <Box sx={{ display: 'flex', alignItems: 'center', m: 2, zIndex: 2 }}>
        <Image src={SVG} alt="Product Icon" width={30} height={30} style={{ marginRight: 8 }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 1000, ml: 2 }}>
          RED PRODUCT
        </Typography>
      </Box>
      <Divider sx={{ zIndex: 2 }} />
      <List sx={{ zIndex: 2, mt: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ ml: 2, mb: 2, color: 'white', fontSize: 18 }}>
            Principal
          </Typography>
          {/* Liens de navigation */}
          <Link href="/dashboard" style={{ textDecoration: 'none', color: "white" }}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  width: '100%',
                  color: 'white',
                  '&:hover': { backgroundColor: 'white', color: 'black' },
                }}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <DashboardIcon sx={{ fontSize: 24 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Dashboard" 
                  primaryTypographyProps={{ fontSize: '18px', color: 'inherit' }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link href="/hotels" style={{ textDecoration: 'none', color: "white" }}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  width: '100%',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                    '& .logo_hotel': {
                      filter: 'invert(1)', // applique un effet de couleur inverse à l'image
                    },
                  },
                }}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Image
                    src={VECTOR}
                    alt="logo-hotel"
                    className="logo_hotel "
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary="Liste des hôtels" 
                  primaryTypographyProps={{ fontSize: '18px', color: 'inherit' }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </Box>
        <hr style={{ marginTop: '400px', border: '1px solid #ccc' }} />
        <Box sx={{ mt: 'auto', p: 2, display: 'flex', alignItems: 'center', zIndex: 2 }}>
          <Image src={avatar} style={{ marginRight: 10, borderRadius: '50%', width: 50, height: 50 }} />
          <Box>
            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
              Mouhamet Badiane
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'green', marginRight: 1 }} />
              <Typography sx={{ fontSize: 14, color: 'lightgrey' }}>En ligne</Typography>
            </Box>
          </Box>
        </Box>
      </List>     
    </Drawer>


      {/* Contenu principal */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box sx={{ marginTop: 15, padding: 2 }}>
          <div className="container">
          <div className="row row-cols-md-4 g-4 p-4 row-cols-xl-3 g-4 ">

              {loading ? (
                <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                  Chargement des hôtels...
                </Typography>
              ) : (
                filteredHotels.map((hotel) => 
 (
<div className="col mb-4" key={hotel.id}>
  <div
    className="card shadow-lg"
    style={{
      maxWidth: '345px',
      borderRadius: '14px',
      overflow: 'hidden', // Assure que les éléments internes respectent la bordure
      cursor: 'pointer',
      backgroundColor:'white'
    }}
  >
<img src={hotel.photo ? `https://projet-stage-1-3.onrender.com/uploads/${hotel.photo}` : './1.png'} 


className="card-img-top" 
  alt={hotel.name} 
  style={{ borderRadius: '10px 10px 0 0', height: '200px', objectFit: 'cover' }} 
/>

    

    <div className="card-body " >
    <p className="card-text" style={{ color: '#8D4B38', fontSize: '11px' }}> {hotel.address}</p>
      <h5 className="card-title" style={{ fontWeight: '600', color: '#333',fontSize: '20px' }}>{hotel.name}</h5>
      <p className="card-text" style={{ color: '#555', fontSize: '14px' }}>{hotel.pricePerNight} {hotel.currency} par nuit</p>

    </div>
  </div>
</div>

                ))
              )}
            </div>
          </div>
        </Box>
      </Box>

      {/* Deuxième AppBar en bas */}
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'grey.900',
          color: 'white',
        }}
      >
      </AppBar>
    </Box>
  );
};

export default Hotel;
