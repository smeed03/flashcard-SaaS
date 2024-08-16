'use client'
import Image from "next/image"
import getStripe from "../utils/get-stripe"
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs"
import {AppBar, Container, Button, Toolbar, Typography, Box, Grid} from "@mui/material"
import Head from "next/head"

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        orgin: 'http://localhost:3000',
      }
    })

    const checkoutSessionJson = await checkoutSession.json()

    if(checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()

    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if(error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>MemorEase</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            MemorEase
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: "center",
        my: 4,
      }}
      >
        <Typography variant="h2" gutterBottom>Welcome to MemorEase</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <Box sx = {{mt: 2}}>
          <Button 
          variant="contained" 
          color="primary" 
          sx={{mt: 2}}
          href="/generate"
          >
            Generate a set
          </Button>
        </Box>
        <Box sx = {{mt: 2}}>
          <Button 
          variant="contained" 
          color="primary" 
          sx={{mt: 2}}
          href="/flashcards"
          >
            View your sets
          </Button>
        </Box>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              Just paste your text and we'll do the rest. Creating 
              flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI will parse your text and create a set of concise flashcards, 
              perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, any time. 
              Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: "center"}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
            sx= {{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>Free 99!</Typography>
              <Typography>
                Access to basic flashcard features and limited storage
              </Typography>
              <Button 
              variant="contained" 
              color="primary" 
              sx= {{mt: 2}}
              href="/sign-up">
                Go Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx= {{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}>
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10 / Month</Typography>
                <Typography>
                  Unlimited storage and priority support
                </Typography>
                <Button 
                variant="contained" 
                color="primary" 
                sx= {{mt: 2}}
                onClick={handleSubmit}>
                  Go Pro
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
