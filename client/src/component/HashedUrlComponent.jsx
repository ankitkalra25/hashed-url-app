import React,{useState} from 'react'
import axios from 'axios';

const HashedUrlComponent = ({hashedUrl, clickCount,setClickCount }) => {
  const [alert, setAlert] = useState(false);
  const refreshCounthandler = async() =>{
    try{
      const hashId = hashedUrl.shortened_url.split('/')
      console.log(hashId[hashId.length-1])
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/analytics/${hashId[hashId.length-1]}`)
      setClickCount(response.data)
      }catch(err){
      console.log(err)
    }
  }

  const showCopied = () => {
    setTimeout(()=>setShow(false),2000);
  }

  return (
    <div className='hashed-container'>
        <div className='hashed-box'>
        <span className='hashed-label'>Hashed Url:</span>
        <div className='hashed-url'>{hashedUrl.shortened_url} {hashedUrl.shortened_url &&
         <i  className="fa fa-clone" aria-hidden="true" 
          onClick={()=>{
            navigator.clipboard.writeText(hashedUrl.shortened_url);
            setAlert(true); setTimeout(()=>setAlert(false),2000)}} 
         style={{color:'white',cursor:'pointer'}}></i>}
         {
          alert &&   <div className='hashed-url-child' >
          copied!
        </div>
         }
        
         </div>
        </div>
        <div className='hashed-box'>
        <span className='hashed-label'>No. of clicks:</span>
        <span className='hashed-url'>{clickCount.click_count}</span>
        { clickCount.click_count >= 0 && <span><i onClick={refreshCounthandler} style={{color:'white',cursor:'pointer'}} className="fa fa-refresh" aria-hidden="true"></i></span>}
        </div>

    </div>
  )
}

export default HashedUrlComponent