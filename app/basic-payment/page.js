'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY); // Replace with your actual Stripe public key

export default function BasicPayment() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handlePayment = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('/api/checkout-session-basic', { method: 'POST' });
      const { sessionId } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Basic Plan Payment
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please provide your email and payment details to complete the purchase.
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePayment}>
          Pay $1 Now
        </Button>
      </Box>
    </Container>
  );
}

