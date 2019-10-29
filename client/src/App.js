import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

const baseUrl = "http://localhost:4000";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    axios
    .get(baseUrl + "/api/posts")
    .then(res =>{
      setPosts(res.data)
    })
    .catch(err => {

      console.log(err);
    })
  },[])


  return (
    <div className="App">
              <p>POSTS</p>
      <header className="App-header">

      {
        posts.map((post) => {
          return <div className="post">
            <div>{post.id}</div>
            <div>{post.title}</div>
            <div>{post.contents}</div>
          </div>
        })
      }
      </header>
    </div>
  );
}

export default App;
