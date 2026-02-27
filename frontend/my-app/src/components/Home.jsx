import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import EventIcon from '@mui/icons-material/Event';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useSkateEvent from '../hooks/useSkateEvent';
import useSkateShop from '../hooks/useSkateShop';
import useSkateSpot from '../hooks/useSkateSpot';
import 'leaflet/dist/leaflet.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Home = () => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + itemsPerPage, shops.length - itemsPerPage)
    );
  };

  const handlePrevEvent = () => {
    setCurrentEventIndex((prev) => Math.max(prev - eventsPerPage, 0));
  };

  const handleNextEvent = () => {
    setCurrentEventIndex((prev) =>
      Math.min(prev + itemsPerPage, events.length - itemsPerPage)
    );

  };


  const [events, setEvents] = useState([]);
  const [shops, setShops] = useState([]);
  const [spots, setSpots] = useState([]);


  const { getSkateEvents } = useSkateEvent();
  const { getSkateShops } = useSkateShop();
  const { getSkateSpots } = useSkateSpot();

  useEffect(() => {
    getSkateEvents()
      .then(setEvents)
      .catch(console.error);
  }, []);

  useEffect(() => {
    getSkateShops()
      .then(setShops)
      .catch(console.error);
  }, []);

  useEffect(() => {
    getSkateSpots()
      .then(setSpots)
      .catch(console.error);
  }, []);

  const eventsRef = useRef(null);
  const shopsRef = useRef(null);
  const spotsRef = useRef(null);

  const visibleShops = shops.slice(currentIndex, currentIndex + itemsPerPage);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const eventsPerPage = 3;

  const visibleEvents = events.slice(currentEventIndex, currentEventIndex + eventsPerPage);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parseCoordinate = (coord) => {
    if (!coord) return null;
    const parts = coord.split(',');
    return parts.length === 2
      ? [parseFloat(parts[0]), parseFloat(parts[1])]
      : null;
  };
  console.log(spots);
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          background:
            'linear-gradient(135deg, #0d47a1 0%, #1976d2 70%, #42a5f5 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#e3f2fd',
          textAlign: 'center',
          px: 2,
          mb: 6,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Welcome to SkateCulture
        </Typography>
        <Typography variant="h6" maxWidth="600px" sx={{ mt: 2, mb: 4 }}>
          Dive into the vibrant world of skate parks and skateboarding culture.
          Discover spots, connect with skaters, and embrace the freedom of the
          skate lifestyle.
        </Typography>

        {/* Feature Buttons */}
        <Stack
          direction="row"
          spacing={6}
          justifyContent="center"
          sx={{ flexWrap: 'wrap', gap: 3 }}
        >
          <Tooltip title="Stay updated on competitions and meetups worldwide">
            <Button
              onClick={() => scrollToSection(eventsRef)}
              startIcon={<EventIcon />}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontWeight: 'bold',
                boxShadow: 4,
                borderRadius: 3,
                textTransform: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 8,
                },
              }}
              aria-label="Go to Skate Events section"
            >
              Skate Events
            </Button>
          </Tooltip>

          <Tooltip title="Find gear and accessories from local skate shops">
            <Button
              onClick={() => scrollToSection(shopsRef)}
              startIcon={<StorefrontIcon />}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontWeight: 'bold',
                boxShadow: 4,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 8,
                },
              }}
              aria-label="Go to Skate Shops section"
            >
              Skate Shops
            </Button>
          </Tooltip>

          <Tooltip title="Discover the best skate spots on the map">
            <Button
              onClick={() => scrollToSection(spotsRef)}
              startIcon={<LocationOnIcon />}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontWeight: 'bold',
                boxShadow: 4,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 8,
                },
              }}
              aria-label="Go to Skate Spots section"
            >
              Skate Spots
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* Vertical Timeline Sections */}
      <Container sx={{ py: 6 }}>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 40,
              width: 4,
              height: '100%',
              bgcolor: '#1976d2',
              borderRadius: 2,
              zIndex: 0,
            },
          }}
        >
          {/* Left labels (icons) */}
          <Box
            sx={{
              minWidth: 80,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                bgcolor: '#1976d2',
                color: 'white',
                p: 1,
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 3,
              }}
              aria-hidden="true"
            >
              <EventIcon fontSize="medium" />
            </Box>

            <Box
              sx={{
                mt: '30px', // 30px from the first icon
                bgcolor: '#1976d2',
                color: 'white',
                p: 1,
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 3,
                mt: 28
              }}
              aria-hidden="true"
            >
              <StorefrontIcon fontSize="medium" />
            </Box>

            <Box
              sx={{
                mt: '20px', // 20px from the second icon
                bgcolor: '#1976d2',
                color: 'white',
                p: 1,
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 3,
                mt: 43
              }}
              aria-hidden="true"
            >
              <LocationOnIcon fontSize="medium" />
            </Box>
          </Box>


          {/* Content Sections */}
          <Stack spacing={8} sx={{ flexGrow: 1, pl: 4 }}>
            {/* Skate Events */}
            <Box ref={eventsRef} sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#0d47a1', mb: 3, textAlign: 'center' }}
              >
                Upcoming Skate Events
              </Typography>

              {events.length === 0 ? (
                <Typography textAlign="center">No skate events available at the moment.</Typography>
              ) : (
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                  <Grid item>
                    <IconButton onClick={handlePrevEvent} disabled={currentEventIndex === 0}>
                      <ArrowBackIos />
                    </IconButton>
                  </Grid>

                  {visibleEvents.map(({ name, description, location, date }, idx) => (
                    <Grid key={idx} item xs={12} sm={6} md={4}>
                      <Paper
                        elevation={4}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          height: '100%',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 'bold', mb: 1, color: '#1976d2' }}
                        >
                          {name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Location: {location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Date: {new Date(date).toLocaleDateString()}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}

                  <Grid item>
                    <IconButton
                      onClick={handleNextEvent}
                      disabled={currentEventIndex + eventsPerPage >= events.length}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </Box>


            {/* Skate Shops */}
            <Box
              ref={shopsRef}
              sx={{ bgcolor: '#f5f9ff', borderRadius: 3, p: 2 }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#0d47a1',
                  mb: 3,
                  textAlign: 'center', // Center the header
                }}
              >
                Local Skate Shops
              </Typography>

              {shops.length === 0 ? (
                <Typography textAlign="center">No skate shops available at the moment.</Typography>
              ) : (
                <Box>
                  <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item>
                      <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                        <ArrowBackIos />
                      </IconButton>
                    </Grid>

                    {visibleShops.map(({ name, description, location, url }, idx) => (
                      <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                        <Paper
                          elevation={4}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 'bold', mb: 1, color: '#1976d2' }}
                            >
                              {name}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {description}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              Location: {location}
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 2, alignSelf: 'flex-start' }}
                          >
                            Visit Website
                          </Button>
                        </Paper>
                      </Grid>
                    ))}

                    <Grid item>
                      <IconButton
                        onClick={handleNext}
                        disabled={currentIndex + itemsPerPage >= shops.length}
                      >
                        <ArrowForwardIos />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>


            {/* Skate Spots */}
            <Box ref={spotsRef}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#0d47a1', mb: 3 }}
              >
                Skate Spots Map
              </Typography>
              {spots.length === 0 ? (
                <Typography>No skate spots available at the moment.</Typography>
              ) : (
                <Paper elevation={4} sx={{ height: 400, borderRadius: 2 }}>
                  <MapContainer
                    center={[42.0058, 21.4095]}
                    zoom={11}
                    scrollWheelZoom={false}
                    style={{ height: '100%', borderRadius: '8px' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {spots.map(({ name, description, coordinate }, idx) => {
                      const position = parseCoordinate(coordinate);
                      if (!position) return null;
                      return (
                        <Marker
                          key={idx}
                          position={position}
                          icon={defaultIcon}
                        >
                          <Popup>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {name}
                            </Typography>
                            <Typography variant="body2">
                              {description}
                            </Typography>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </Paper>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;