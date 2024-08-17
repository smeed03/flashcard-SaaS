import { Container, Typography, Box } from '@mui/material';

export default function Cancel() {
  return (
    <Container>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Payment Cancelled
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your payment was cancelled. Please try again if you'd like to proceed with the subscription.
        </Typography>
      </Box>
    </Container>
  );
}
