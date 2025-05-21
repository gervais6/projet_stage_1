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
import SVG from '../SVG.png';
import { TextField, InputAdornment, IconButton, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from 'next/link';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Importer l'icône de fermeture

const drawerWidth = 280;

const Hotel = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const [hovered, setHovered] = useState(null);
  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/hotels/');
       
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
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
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: 'white', color: 'black' }}>
        <Toolbar sx={{ display: { xs: 'flex', sm: 'flex' }, justifyContent: 'space-between' }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 1000, fontSize: { xs: '0', sm: '1.5rem' } }}>
            Liste des hôtels
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Recherche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              bgcolor: 'white',
              borderRadius: '10000px',
              width: { xs: '250px', sm: '250px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10000px ',
                '& field set': { borderColor : 'grey.400' },
                '&: hover fieldset': { borderColor: 'grey.600' },
                '&.Mui-focused fieldset': { borderColor: 'blue' },
              },
 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ ml: 1, color: 'black' }}>
              <IoMdNotificationsOutline sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
            </IconButton>
            <IconButton sx={{ ml: 1, color: 'black' }}>
              <Image src ={avatar} style={{ width: 25, height: 25 }} />
            </IconButton>
            <IconButton sx={{ ml: 1, color: 'black' }}>
              <LogoutIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <AppBar position="fixed" sx={{ top: { xs: '59px', sm: '66px' }, width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: 'white', color: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" style={{ marginTop: 10, fontSize: { xs: '1rem', sm: '1.5rem' } }}>
            <p style={{fontSize:17}}>Hôtels : {filteredHotels.length}</p>
          </Typography>

          <Link href="/nouveau_hotel" style={{ textDecoration: 'none' }}>
            <Button variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />} sx={{
              textDecoration: 'none',
              textTransform: 'none',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '14px',
              width: { xs: '100%', sm: '200px' },
              padding: { xs: '10px', sm: '15px' },
              fontSize: { xs: '14px', sm: '14px' },
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}>
              Ajouter un hôtel
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Drawer
          open={open}
          onClose={handleDrawerToggle}
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
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(2, 2, 2, 0.7)',
              },
            },
          }}
          variant="temporary"
          anchor="left"
        >
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
              <Link href="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      width: '100%',
                      color: 'white',
                      '&:hover': { backgroundColor: 'white', color: 'black' },
                    }}
                    onMouse Enter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <DashboardIcon sx={{ fontSize: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '18px', color: 'inherit' }} />
                  </ListItemButton >
                </ListItem>
              </Link>

              <Link href="/hotels" style={{ textDecoration: 'none', color: 'white' }}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      width: '100%',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'black ',
                        '& .logo_hotel': {
                          filter: 'invert(1)',
                        },
                      },
                    }}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <Image src={VECTOR} alt="logo-hotel" className="logo_hotel" style={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Liste des hôtels" primaryTypographyProps={{ fontSize: '18px', color: 'inherit' }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Box>
            <hr style={{ marginTop: '400px', border: '1px solid #ccc' }} />
            <Box sx={{ mt: 'auto', p: 2, display: 'flex', alignItems: 'center', zIndex: 2 }}>
              <Image src={avatar} style={{ marginRight: 10, borderRadius: '50%', width: 50 , height: 50 }} />
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
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(2, 2, 2, 0.7)',
              },
            },
          }}
          variant="permanent"
          anchor="left"
        >
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
              <Link href="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
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
                    <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '18px', color: 'inherit' }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/hotels" style={{ textDecoration: 'none', color: 'white' }}>
 <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      width: '100%',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                        '& .logo_hotel': {
                          filter: 'invert(1)',
                        },
                      },
                    }}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <Image src={VECTOR} alt="logo-hotel" className="logo_hotel" style={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary=" Liste des hôtels" primaryTypographyProps={{ fontSize: '18px', color: 'inherit' }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Box>
            <hr style ={{ marginTop: '400px', border: '1px solid #ccc' }} />
 <Box sx={{ mt: 'auto ', p: 2, display: 'flex', alignItems: 'center', zIndex: 2 }}>
              <Image src={avatar} style={{ marginRight: 10, borderRadius: '50%', width: 50 , height: 50 }} />
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
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#eee' }}>
        <Toolbar />
        <Box sx={{ marginTop: 15, padding: 2 }}>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {loading ? (
                <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                  Chargement des hôtels...
                </Typography>
              ) : (
                filteredHotels.map((hotel) => (
                  <div className="col" key={hotel.id}>
                    <div
                      className="card shadow-lg"
                      style={{
                        maxWidth: '100%',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                      }}
                    >
                      <img

                        src={hotel.photo ? hotel.photo : './1.png'}

                        

                        className="card-img-top"
                        alt={hotel.name}
                        style={{ borderRadius: '10px 10px 0 0', height: '200px', objectFit: 'cover' }}
                      />

  

                      <div className="card-body">
                        <p className="card-text" style={{ color: '#8D4B38', fontSize: '11px' }}>
                          {hotel.address}
                        </p>
                        <h5 className="card-title" style={{ fontWeight: '600', color: '#333', fontSize: '20px' }}>
                          {hotel.name}
                        </h5>
                        <p className="card-text" style={{ color: '#555', fontSize: '14px' }}>
                          {hotel.pricePerNight} {hotel.currency} par nuit
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Box>
      </Box>

      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: 'grey.900', color: 'white' }} />
    </Box>
  );
};

export default Hotel;