import * as React from 'react';
import {useState, useEffect} from "react"
import {Modal, Button, Box, Grid, CardActions, CardContent, List, ListItem, TextField, Typography, Card} from "@mui/material";

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
    

const Home = ({jwt,  setJwt, user, setUser}) => {
    let [post, setPost] = useState([])
    let [commentToSend, setCommentToSend] = useState({})
    let [comment, setComment] = useState([])
    let [open, setOpen] = useState(false);
    let [postId, setPostId] = useState({})

    const handleOpen = (event) => {
        setPostId({postId: event.target.id})
        setOpen(true)}

    const handleClose = () => setOpen(false)

    useEffect(() => {
        fetch("/api/post")
        .then(response => response.json())
        .then(data => setPost(data))
        .catch(err => console.log(err))
    },[])

    const handleChange = (event) => {
        setCommentToSend({text: event.target.value, postId: event.target.id})
    }

    const handleComment = (event) => {
        if(event.key === "Enter") {
            event.preventDefault()
            fetch("/api/comment", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(commentToSend),
                mode: "cors"
            })
        }
    }

    useEffect(() => {
        fetch("/api/comment")
        .then(response => response.json())
        .then(data => setComment(data))
        .catch(err => console.log(err))
    },[])

    return (
        <div>
            <Typography variant="h1">InstaCode</Typography>
                {post.map((item) => (
                <Card key={item._id} sx={{
                    border: 1}}>
                    <CardContent>
                        <h2>Post</h2>
                        <Typography variant="body2">{item.text}</Typography>
                    </CardContent>
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
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Card sx={style}>
                <CardContent>
                    <List>
                        <h3>Comments</h3>
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