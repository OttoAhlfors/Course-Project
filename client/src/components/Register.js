import {useState} from "react"

const Register = (() => {
    const [user, setUser] = useState({})

    const submit = (e) => {
        e.preventDefault()
        console.log("Working...")
        console.log(user)
        fetch("/api/register/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user),
            mode: "cors"
        })
    }

    const handleRegister = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <div id="registerDiv">
            <form onSubmit={submit} onChange={handleRegister}>
                <input id="username" type="string" name="username"></input>
                <input id="password" type="string" name="password"></input>
                <input id="submit" type="submit"></input>
            </form>
        </div>
    )
})

export default Register