import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Grid, Paper } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import useVideo from '../hooks/useVideo';
import useImage from '../hooks/useImage';  // Import your useImage hook

const imagesPerPage = 3;

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoUrls, setVideoUrls] = useState([]);
  const [images, setImages] = useState([]);  // will hold array of { filename, image (base64) }

  const { getVideos } = useVideo();
  const { getImagesWithData } = useImage();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getVideos();
        if (videos.length && typeof videos[0] === 'object' && 'url' in videos[0]) {
          setVideoUrls(videos.map(video => video.url));
        } else {
          setVideoUrls(videos);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const imgs = await getImagesWithData(); // [{filename, image}]
        setImages(imgs);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchVideos();
    fetchImages();
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => Math.max(prev - imagesPerPage, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      Math.min(prev + imagesPerPage, images.length - imagesPerPage)
    );
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) =>
      Math.min(prev + 1, videoUrls.length - 1)
    );
  };

  const visibleImages = images.slice(currentImageIndex, currentImageIndex + imagesPerPage);
  const currentVideoUrl = videoUrls.length > 0 ? getYouTubeEmbedUrl(videoUrls[currentVideoIndex]) : null;

  return (
    <Box sx={{ mt: 8, textAlign: 'center', px: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 5,
          textTransform: 'uppercase',
          color: 'primary.main',
          letterSpacing: 1.2,
        }}
      >
        Gallery
      </Typography>

      {/* Image Carousel */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item>
          <IconButton
            onClick={handlePrevImage}
            disabled={currentImageIndex === 0}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <ArrowBackIosNew />
          </IconButton>
        </Grid>

        {visibleImages.map(({ filename, image }, idx) => (
          <Grid item key={filename}>
            <Paper
              elevation={4}
              sx={{
                width: 280,
                height: 200,
                overflow: 'hidden',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                component="img"
                src={`data:image/jpeg;base64,${image}`}
                alt={`Gallery image ${filename}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Paper>
          </Grid>
        ))}

        <Grid item>
          <IconButton
            onClick={handleNextImage}
            disabled={currentImageIndex + imagesPerPage >= images.length}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>

      {/* YouTube Video Carousel */}
      {currentVideoUrl && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Featured Video
          </Typography>

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <IconButton
                onClick={handlePrevVideo}
                disabled={currentVideoIndex === 0}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <ArrowBackIosNew />
              </IconButton>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  width: '90vw',
                  maxWidth: 800,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <iframe
                  src={currentVideoUrl}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </Grid>

            <Grid item>
              <IconButton
                onClick={handleNextVideo}
                disabled={currentVideoIndex === videoUrls.length - 1}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Gallery;
