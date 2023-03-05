import { Buffer } from "buffer"
import {Button, TextField, Typography} from "@mui/material"

function Login({jwt, setJwt, user, setUser}) {

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
        .then(response => response.json())
        .then((data) => {
            if (data.token) {
                setJwt(true)
                setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()))
            }
        })
    }

    const handleLogin = (event) => {
        setUser({...user, [event.target.id]: event.target.value, [event.target.id]: event.target.value})
        console.log(user)
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