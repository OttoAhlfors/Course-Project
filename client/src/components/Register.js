import { Button, TextField, Typography } from "@mui/material"

const Register = (({jwt,  setJwt, user, setUser}) => {

    // This sends the register info to the back-end
    const submit = (e) => {
        e.preventDefault()
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user),
            mode: "cors"
        })
    }

    // Register info (username and password) is set here
    const handleRegister = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    return (
        <div>
        <Typography variant="h2">Register</Typography>
        <div id="registerDiv">
            <form onSubmit={submit} onChange={handleRegister}>
                <TextField required id="username" type="string" label="Username"></TextField>
                <TextField required id="password" type="string" label="Password"></TextField>
                <Button id="submit" type="submit">Register</Button>
            </form>
        </div>
        </div>
    )
})

export default Register