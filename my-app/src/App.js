import './index.css';
import React, {useState} from 'react';
import {Api} from './api/index';
import CommentSection from './components/CommentSection';

function App() {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event) => {
      const {name, message} = inputs;

      Api.post('http://localhost:3001/createComment',{
          name: name,
          message: message,
      });

  };

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values => ({...values, [name]: value}))
  };

  return (
    <div className="App">
      <form className='comment-form' onSubmit={handleSubmit} >
        <input type='text' placeholder='Name' className='name' name='name' onChange={handleChange} required />
        <textarea placeholder='Comment' rows='10' name='message' className='comment' onChange={handleChange} required />
        <button>Comment</button>
      </form>
      <CommentSection />
    </div>
  );
}

export default App;
