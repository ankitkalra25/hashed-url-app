import React from 'react'

const HashedUrlComponent = ({hashedUrl}) => {
  return (
    <div className='hashed-container'>
        <div className='hashed-box'>
        <span className='hashed-label'>Hashed Url:</span>
        <span className='hashed-url'>{hashedUrl.url}</span>
        </div>
        <div className='hashed-box'>
        <span className='hashed-label'>No. of clicks:</span>
        <span className='hashed-url'>1</span>
        </div>

    </div>
  )
}

export default HashedUrlComponent