import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import PostList from "./PostList"

const Home = (jwt) => {

    return (
        <div>
            <p>Login to post code snipets</p>
            <Button type="button" text="Login" href='/login'>Login</Button>
            <p>If you are a new user you can register here</p>
            <Button type="button" label="Register" href='/register'>Register</Button>
            <p>Make a post</p>
            <Button type="button" label="Register" href='/post'>Post</Button>
            <p>Post by other people</p>
            <PostList jwt={jwt}/>
        </div>
    )
}

export default Home