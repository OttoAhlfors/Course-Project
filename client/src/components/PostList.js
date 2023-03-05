import * as React from 'react';
import {useState, useEffect} from "react"
import Card from '@mui/material/Card';
import { CardActions, CardContent, TextField, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const PostList = (jwt) => {
    let [post, setPost] = useState([])
    let [commentToSend, setCommentToSend] = useState({})
    let [comment, setComment] = useState([])

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

    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <div>
            {post.map((item) => (
                <Card key={item._id} sx={{maxWidth: 600}}>
                    <CardContent>
                        <h2>Postaus</h2>
                        <Typography variant="body2">{item.text}</Typography>
                    </CardContent>
                    <CardActions>
                        {jwt.jwt.jwt === true &&
                            <TextField id={item._id} label="Comment (Enter to send)" variant="outlined" onChange={handleChange} onKeyDown={handleComment}></TextField>}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <h3>Kommentit</h3>
                            {comment.map((content) => (
                                content.postId === item._id &&
                                    (<Typography key={content._id} variant="body3">{content.text}</Typography>)
                            ))}
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </div>
    )
} 

export default PostList