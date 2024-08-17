'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY); // Replace with your actual Stripe public key

export default function ProPayment() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout-session-pro', { method: 'POST' });
    const { sessionId } = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pro Plan Payment
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please provide your email and payment details to complete the subscription.
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePayment}>
          Pay $5 Now
        </Button>
      </Box>
    </Container>
  );
}
