'use client'
import {useUser} from "@clerk/nextjs"
import {useEffect, useState} from "react"
import { Container, Typography, Box, Grid, Card, CardContent, 
    CardActionArea } from "@mui/material"
import { collection, doc, getDocs } from "firebase/firestore"
import {db} from "/firebase"
import {useSearchParams} from "next/navigation"

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState(false)

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const docRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(docRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <div></div>
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx= {{mt: 4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
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
        </Container>
    )
}
