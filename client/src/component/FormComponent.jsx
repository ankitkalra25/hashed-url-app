import React, { useState } from 'react';
import HashedUrlComponent from './HashedUrlComponent';

const MyFormComponent = () => {
  const [url, setUrl] = useState('');
  const [expirationUrl, setExpirationUrl] = useState('');
  const [hashedUrl, setHashedUrl] = useState({url:'https://example.com'})
  const [selectedOption, setSelectedOption] = useState('option2');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Text:', url);
    console.log('Input:', expirationUrl);
    console.log('Selected Option:', selectedOption);
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
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </label>
        <label className="label option">
          No
          <input
          className="input url"
            type="radio"
            value="option2"
            checked={selectedOption === 'option2'}
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