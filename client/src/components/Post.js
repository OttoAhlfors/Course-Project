import { TextField, Typography, Button, Box, Grid } from "@mui/material"
import {useState} from "react"

const Post = ({jwt,  setJwt, user, setUser}) => {
    const [post, setPost] = useState({})

    // The post is sent to the bakc-end here
    const submit = (e) => {
        e.preventDefault()
        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post),
            mode: "cors"
        })
    }

    // Post info (text, username is not used) is set here 
    const handlePost = (e) => {
        setPost({...post, [e.target.name]: e.target.value, username: user})
    }

    return (
        <div>
        <Typography variant="h2">Create post</Typography>
        <div id="postDiv">
            <Grid container justifyContent="center" >
                <Box sx={{width: 1000}}>
                <form onSubmit={submit} onChange={handlePost}>
                    {/* Conditional rendering is used to either show the error for login first or to give the text field and submit buttons.
                     Depending if the jwt is true of false (user logged in or not) */}
                    {jwt
                    ?<div><TextField multiline fullWidth label="Post" id="text" name="text" sx={{Width: "40ch"}}></TextField>
                    <Button id="submit" type="submit">Submit</Button>
                    </div>
                    :<TextField fullWidth error id='comment-login-error' label="Error" helperText="Login to post"></TextField>
                    }
                </form>
                </Box>
            </Grid>
            </div>
        </div>
    )
}

export default Post