import React, {useState} from "react";
import axios from "axios";

export default function contactForm(){
    const [contactData, setContactData] = useState(
    {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
    );
   
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/contact, formdata')
        .then(data => {
            console.log(data)
          })
    };

    const handleChange = (event) => {
        setContactData({ ...contactData, [event.target.name]: event.target.value });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={contactData.subject}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Message:
            <input
              type="text"
              name="message"
              value={contactData.message}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      );
    }

