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
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.text.primary,
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
          <Typography variant="h4" gutterBottom align="center">
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
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $1/ Month
                </Typography>
                <Typography>Access to basic flashcard features and limited storage</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/basic-payment">
                  Go Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $5/ Month
                </Typography>
                <Typography>Unlimited storage and priority support</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/pro-payment">
                  Go Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
