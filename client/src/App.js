import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Login from "./components/Login"
import Home from "./components/Home"
import Register from './components/Register';
import MakePost from "./components/Post"
import {useState} from "react"

// This function renders the app
function App() {
  const [user, setUser] = useState({})
  const [jwt, setJwt] = useState(false)

  // Here I have set all the views for the app and what each of them shows
  // From here I also pass on the jwt, setJwt, user and setUser variables to use in other parts of the app  
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={
            <Home jwt={jwt} setJwt={setJwt} user={user} setUser={setUser}/>
          }/>
          <Route path="/login" element={
            <Login jwt={jwt} setJwt={setJwt} user={user} setUser={setUser}/>
          }/>
          <Route path="/register" element={
            <Register jwt={jwt} setJwt={setJwt} user={user} setUser={setUser}/>
          }/>
          <Route path="/post" element={
            <MakePost jwt={jwt} setJwt={setJwt} user={user} setUser={setUser}/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
