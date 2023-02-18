import React, { useState } from 'react';
import axios from 'axios';

export default function FormularioLogin() {
  const [formData, setFormData] = useState(
    {first_name:'',
     last_name: '',
     nick_name:'',
     email:'',
     password:'',
     rol:'',
     imgURL:'',
     authExtern: false
  }
 );

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/auth', formData)
      .then(data => {
        console.log(data.data.token)
<<<<<<< HEAD
      }) 
=======
      })
>>>>>>> 5d24f065b39ccd4ec0b2a58713b7189fef745d37
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>        
        E-mail:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />        
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
