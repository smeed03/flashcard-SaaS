'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { CircularProgress, Container, Typography, Box } from '@mui/material'

const resultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if(!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                }
                else {
                    setError(sessionData.error)
                }
            }
            catch (err) {
                setError('An unexpected error occurred')
            }
            finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if(loading) {
        return (
            <Container maxWidth="100vw" sx= {{mt: 4, textAlign: "center"}}>
                <CircularProgress/>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }

    if(error) {
        return (
            <Container maxWidth="100vw" sx= {{mt: 4, textAlign: "center"}}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="100vw" sx= {{mt: 4, textAlign: "center"}}>
                {
                    session.payment_status === 'paid' ? (
                        <>
                            <Typography variant="h4">Payment Successful</Typography>
                            <Box sx={{mt: 22}}>
                                <Typography variant="h6">Session ID: {session_id}</Typography>
                                <Typography variant="body1">
                                    We have received your payment. You will receive an email
                                    with order details shortly.
                                </Typography>
                            </Box>
                        </>
                    ) : 
                    (
                        <>
                            <Typography variant="h4">Payment Failed</Typography>
                            <Box sx={{mt: 22}}>
                                <Typography variant="body1">
                                    Your payment was unsuccessful. Please try again.
                                </Typography>
                            </Box>
                        </>
                    )
                }
        </Container>
    )
}

export default resultPage