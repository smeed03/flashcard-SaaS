'use client'
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "/firebase"
import { Paper, Container, Button, TextField, Typography, Box, Grid,
    Card, CardContent, CardActionArea, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions, Select, MenuItem } from "@mui/material"
import { collection, doc, getDoc, writeBatch } from "firebase/firestore"

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState(false)
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [color, setColor] = useState('#ffffff') // Default color
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: JSON.stringify({ text, color }), // Include color in the request
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then(data => setFlashcards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        let collections = [];
        if (docSnap.exists()) {
            collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard set with this name already exists');
                return;
            }
        }

        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards'); // Ensure this route exists
    }

    return <Container maxWidth="md">
        <Box sx={{
            mt: 4, mb: 6, flexDirection: 'column', alignItems: 'center', textAlign: 'center'
        }}>
            <Typography variant="h4" gutterBottom>
                Generate Flashcards
            </Typography>
            <Paper sx={{ p: 4, width: "100%" }}>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label="Enter text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        sx={{ width: 120 }}
                    >
                        <MenuItem value="#ffffff">White</MenuItem>
                        <MenuItem value="#f0f8ff">AliceBlue</MenuItem>
                        <MenuItem value="#faebd7">AntiqueWhite</MenuItem>
                        <MenuItem value="#00ffff">Aqua</MenuItem>
                        {/* Add more colors as needed */}
                    </Select>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Submit
                </Button>
            </Paper>
        </Box>

        {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Flashcards Preview</Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ backgroundColor: flashcard.color || color }}>
                                <CardActionArea
                                    onClick={() => handleCardClick(index)}
                                >
                                    <CardContent>
                                    <Box
                                        sx={{
                                            perspective: "1000px",
                                            '& .card': {
                                                transition: "transform 0.6s",
                                                transformStyle: "preserve-3d",
                                                position: "relative",
                                                height: "200px",
                                                width: "100%",
                                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                                transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                                            },
                                            '& .card > .front, & .card > .back': {
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                backfaceVisibility: "hidden",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 2,
                                                boxSizing: "border-box",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "normal",
                                            },
                                            '& .card > .back': {
                                                transform: "rotateY(180deg)",
                                            },
                                        }}
                                    >
                                        <div className="card">
                                            <div className="front">
                                                <Typography variant="h5" component="div" sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div className="back">
                                                <Typography variant="h5" component="div" sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter a name for your flashcard set
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Collection Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveFlashcards}>Save</Button>
            </DialogActions>
        </Dialog>
    </Container>
}
