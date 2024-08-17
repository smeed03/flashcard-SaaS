import { Container, Typography, Box } from '@mui/material';

export default function Success() {
  return (
    <Container>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for your purchase. You can now enjoy the Basic plan features.
        </Typography>
      </Box>
    </Container>
  );
}
