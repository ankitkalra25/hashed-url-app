import React, { useState } from 'react';
import axios from 'axios';
import HashedUrlComponent from './HashedUrlComponent';

const MyFormComponent = () => {
  const [url, setUrl] = useState('');
  const [expirationUrl, setExpirationUrl] = useState('');
  const [hashedUrl, setHashedUrl] = useState({})
  const [clickCount, setClickCount] = useState({})
  const [error, setError] = useState('')
  const [selectedOption, setSelectedOption] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Text:', url);
    console.log('Input:', expirationUrl);
    console.log('Selected Option:', selectedOption);
    try{
  const {data} = await axios.post(`${import.meta.env.VITE_APP_API_URL}/shorten`,{
    url: url,
    expiration_days: expirationUrl,
    single_use:selectedOption
  })
  const hashId = data.shortened_url.split('/')
  console.log(hashId[hashId.length-1])
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/analytics/${hashId[hashId.length-1]}`)
  setHashedUrl(data)
  setClickCount(response.data)
  }catch(err){
  console.log(err.response.data.error)
  if(err.response.data.error==='URL is required'){
    setError(err.response.data.error)
  }else if(err.response.data.error==='Failed to shorten URL'){
    setError('You cannot generate URL again')
  }
  setTimeout(()=>{
    setError('')
  },2000)
  
}
  }
  return (
    <>
    <form className='container' onSubmit={handleSubmit}>
      <span style={{color:'red'}}>{error}</span>
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
             checked={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </label>
        <label className="label option">
          No
          <input
          className="input url"
            type="radio"
            value={false}
            checked={!selectedOption}
            onChange={(e) => setSelectedOption(!e.target.value)}
          />
        </label>
        </div>
      </div>
      </div>
      <div>
        <button className="button" type="submit">Submit</button>
      </div>
    </form>
    <HashedUrlComponent hashedUrl={hashedUrl} clickCount={clickCount} setClickCount={setClickCount} />
    </>
  );
};

export default MyFormComponent;