import * as React from 'react';
import {useState, useEffect} from "react"
import {Modal, Button, Box, Grid, CardActions, CardContent, List, ListItem, TextField, Typography, Card} from "@mui/material";

// This style is used for the popup Modals for the comments
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
    
// This is used to render the homepage and it also handels posting comments
const Home = ({jwt,  setJwt, user, setUser}) => {
    let [post, setPost] = useState([])
    let [commentToSend, setCommentToSend] = useState({})
    let [comment, setComment] = useState([])
    let [open, setOpen] = useState(false);
    let [postId, setPostId] = useState({})

    // This function opens the comments Modal
    const handleOpen = (event) => {
        setPostId({postId: event.target.id})
        setOpen(true)}
    
    // This function closes the comments Modal
    const handleClose = () => setOpen(false)

    // This function gets the posts from the back-end
    useEffect(() => {
        fetch("/api/post")
        .then(response => response.json())
        .then(data => setPost(data))
        .catch(err => console.log(err))
    },[])

    // This function determines the text and postId variables for a the comment being sent
    const handleChange = (event) => {
        setCommentToSend({text: event.target.value, postId: event.target.id})
    }

    // This function sends the comment to the back-end
    const handleComment = (event) => {
        if(event.key === "Enter") {
            event.preventDefault()
            fetch("/api/comment", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                // The body here is the text and postId defined earlier
                body: JSON.stringify(commentToSend),
                mode: "cors"
            })
        }
    }

    // This gets the comments from the back-end
    useEffect(() => {
        fetch("/api/comment")
        .then(response => response.json())
        .then(data => setComment(data))
        .catch(err => console.log(err))
    },[])


    return (
        <div>
            <Typography variant="h1">InstaCode</Typography>

                {/* Here we map the posts that we have gotten from the back-end each item is a post each post is then made into a card */}
                {post.map((item) => (
                <Card key={item._id} sx={{
                    border: 1}}>
                    <CardContent>
                        <h2>Post</h2>
                        <Typography variant="body2">{item.text}</Typography>
                    </CardContent>

                    {/* If jwt token is true (user is logged in) text field in which you can write a comment to a post is visible if false then Error login to comment is shown */}
                    <CardActions>
                        <Grid container justifyContent="center" >
                            <Box sx={{
                                width: 1000,
                            }}>
                            {jwt
                                ? <TextField fullWidth id={item._id} label="Comment (Enter to send)" variant="outlined" multiline maxRows={10} onChange={handleChange} onKeyDown={handleComment}></TextField>
                                : <TextField fullWidth error id='comment-login-error' label="Error" helperText="Login to comment"></TextField>
                            }
                            <Button variant='outlined' id={item._id} onClick={handleOpen}>Show comments</Button>
                            </Box>
                        </Grid>
                    </CardActions>
                </Card>
            ))}

            {/* This Modal pops up when "Show comments" button is clicked it contains all the comments for that post*/}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Card sx={style}>
                <CardContent>
                    <List>
                        <h3>Comments</h3>
                        
                        {/* The conditional rendering here is used to only show the coments where the postId matches currently examined post */}
                        {comment.map((content) => (
                            content.postId === postId.postId &&
                                (<ListItem key={content._id} variant="body3">{content.text}</ListItem>)
                        ))}
                    </List>
                </CardContent>
                </Card>
            </Modal>
        </div>
    )
} 

export default Home