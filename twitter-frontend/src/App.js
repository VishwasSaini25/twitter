import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tweet, setTweet] = useState('');
  const [ file, setFile ] = useState(null)

  const postTweet = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tweet',tweet);
    if(file){
      formData.append('media', file);
    }
    try {
      const result = await axios.post('http://localhost:5000/tweet', formData ,{ headers: {'Content-Type': 'multipart/form-data'}});
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
        <form onSubmit={postTweet}>
        <input 
          type="text" 
          value={tweet} 
          onChange={(e) => setTweet(e.target.value)} 
          placeholder="What's happening?"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Tweet</button>
      </form>  
    </div>
  );
}

export default App;
