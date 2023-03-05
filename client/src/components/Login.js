import { Buffer } from "buffer"
import {Button, TextField, Typography} from "@mui/material"

// This renders the login page
function Login({jwt, setJwt, user, setUser}) {

    // This function sends the login to the back-end and return the jwt token if login was succesfull
    const submit = (event) => {
        event.preventDefault()
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user),
            mode: "cors"
        })
        // The response is the jwt token
        .then(response => response.json())
        .then((data) => {
            if (data.token) {
                // Jwt token is set to true if the login was succesfull
                setJwt(true)
                setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()))
            }
        })
    }

    // The data sent with the login (username and password) is set here
    const handleLogin = (event) => {
        setUser({...user, [event.target.id]: event.target.value, [event.target.id]: event.target.value})
    }

    return (
        <div>
            <Typography id="login-typo" variant="h2">Login</Typography>
            <div id="loginDiv">
                <form onSubmit={submit} onChange={handleLogin}>
                    <TextField required id="username" label="Username" type="string"></TextField>
                    <TextField required id="password" label="Password" type="string"></TextField>
                    <Button id="submit" type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login