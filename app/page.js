'use client';

import { useState } from "react";
import { ThemeProvider, CssBaseline, Switch } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography, Box, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${isDarkMode ? '/dark_mode.jpg' : '/light_mode.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          padding: 2,
        }}
      >
        <Head>
          <title>Flashcards with AI</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              AI-powered Flashcards
            </Typography>
            <Button color="inherit" href="/generate">Create Flashcards</Button>
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Switch checked={isDarkMode} onChange={handleThemeToggle} color="default" />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            textAlign: "center",
            my: 4,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
            Get Started
          </Button>
        </Box>
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Easy Text Input
              </Typography>
              <Typography>
                Just paste your text and we'll do the rest. Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI will parse your text and create a set of concise flashcards, perfect for studying.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access your flashcards from any device, any time. Study on the go with ease.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: (theme) => theme.palette.divider,
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  color: (theme) => theme.palette.text.primary,
                  boxShadow: 1,
                  textAlign: "center",
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: (theme) => `0 4px 20px ${theme.palette.grey[500]}`,
                  },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                  $1/Month
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                  Basic version
                </Typography>
                <Typography variant="body1" paragraph>
                  Generate up to 1000 Flashcards per month
                </Typography>
                <Typography variant="body1" paragraph>
                  Access to basic flashcard features and limited storage
                </Typography>
                <Typography variant="body1" paragraph>
                  Single sign-on
                </Typography>
                <Typography variant="body1" paragraph>
                  24/7 support
                </Typography>
                <Button variant="outlined" sx={{ mt: 2, mr: 2, backgroundColor: '#d0f0c0', color: '#333' }} href="/basic-payment">
                  Try Free
                </Button>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#ffeb3b', color: '#333' }} href="/basic-payment">
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: (theme) => theme.palette.divider,
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  color: (theme) => theme.palette.text.primary,
                  boxShadow: 1,
                  textAlign: "center",
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: (theme) => `0 4px 20px ${theme.palette.grey[500]}`,
                  },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
                  Pro
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                  $5/Month
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                  Pro version
                </Typography>
                <Typography variant="body1" paragraph>
                  Generate up to 100K Flashcards per month
                </Typography>
                <Typography variant="body1" paragraph>
                  Unlimited storage and priority support
                </Typography>
                <Typography variant="body1" paragraph>
                  Single sign-on
                </Typography>
                <Typography variant="body1" paragraph>
                  24/7 support
                </Typography>
                <Button variant="outlined" sx={{ mt: 2, mr: 2, backgroundColor: '#d0f0c0', color: '#333' }} href="/pro-payment">
                  Try Free
                </Button>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#ffeb3b', color: '#333' }} href="/pro-payment">
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

