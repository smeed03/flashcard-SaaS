import {AppBar, Container, Button, Toolbar, Typography, Box, Grid} from "@mui/material"
import Link from "next/link"
import {SignIn, SignUp} from "@clerk/nextjs"

export default function SignUpPage() {
    return (
        <container maxWidth="100vw">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Flashcard SaaS
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>Sign In</Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>Sign Up</Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            >
                <Typography variant="h4">Sign Up</Typography>
                <SignUp />
            </Box>
        </container>
    )
}