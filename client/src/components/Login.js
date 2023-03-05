import { Buffer } from "buffer"

function Login({jwt,  setJwt, user, setUser}) {

    const submit = (event) => {
        event.preventDefault()
        console.log("Working...")
        fetch("/api/login/", {
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
                console.log(data)
                setJwt(true)
                setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()))
                console.log(jwt)
            } else {
                console.log(data)
            }
        })
    }

    const handleLogin = (event) => {
        setUser({...user, [event.target.id]:event.target.value})
    }

    console.log(user)

    return (
        <div id="loginDiv">
            <form onSubmit={submit} onChange={handleLogin}>
                <input id="username" label="Username" type="string"></input>
                <input id="password" label="Password" type="string"></input>
                <input id="submit" type="submit"></input>
            </form>
            {jwt.jwt === true &&
            (<p>Login successfull</p>)}
        </div>
    )
}

export default Login