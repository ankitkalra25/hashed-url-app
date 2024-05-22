import React, { useState } from 'react';
import axios from 'axios';
import HashedUrlComponent from './HashedUrlComponent';

const MyFormComponent = () => {
  const [url, setUrl] = useState('');
  const [expirationUrl, setExpirationUrl] = useState('');
  const [hashedUrl, setHashedUrl] = useState({url:'https://example.com'})
  const [selectedOption, setSelectedOption] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Text:', url);
    console.log('Input:', expirationUrl);
    console.log('Selected Option:', selectedOption);
    const config={
      data: {
        url: url,
        expiration_days: expirationUrl,
        single_use:selectedOption
    }
  }
   const {data} = await axios.post(`${import.meta.env.VITE_APP_API_URL}/shorten`, config)
   console.log(data)

  };

  return (
    <>
    <form className='container' onSubmit={handleSubmit}>
      <div className='input-box'>
        <label  className="label">
          Url:
          <textarea
          className="input url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>
      <div className='input-box expiration'>
        <label className="label">
          Expiration(days):
          <input
          className="input url"
            type="number"
            min='0'
            value={expirationUrl}
            onChange={(e) => setExpirationUrl(e.target.value)}
          />
        </label>
        <div className='single-use'>
        <label className="label" style={{marginTop:'-9px'}}>
        Single use:
        </label>
        <div className='options'>
        <label className="label option ">
          Yes
          <input
          className="input url"
            type="radio"
            value={true}
            checked={selectedOption === true}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </label>
        <label className="label option">
          No
          <input
          className="input url"
            type="radio"
            value={false}
            checked={selectedOption === false}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </label>
        </div>
      </div>
      </div>
      <div>
        <button className="button" type="submit">Submit</button>
      </div>
    </form>
    <HashedUrlComponent hashedUrl={hashedUrl} />
    </>
  );
};

export default MyFormComponent;