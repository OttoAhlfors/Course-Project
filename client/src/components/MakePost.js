import {useState} from "react"

const Post = () => {
    const [post, setPost] = useState({})

    const submit = (e) => {
        e.preventDefault()
        console.log("Working...")
        fetch("/api/post/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post),
            mode: "cors"
        })
    }

    const handlePost = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={submit} onChange={handlePost}>
                <input id="text" name="text" type="textfield" rows="4" cols="50"></input>
                <input id="submit" type="submit"></input>
            </form>
        </div>
    )
}

export default Post