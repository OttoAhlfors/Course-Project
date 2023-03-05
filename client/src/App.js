import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Login from "./components/Login"
import Home from "./components/Home"
import Register from './components/Register';
import MakePost from "./components/Post"
import {useState} from "react"

function App() {
  const [user, setUser] = useState({})
  const [jwt, setJwt] = useState(false)

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
