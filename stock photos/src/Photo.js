import React from 'react'

// { image: { urls: { regular: 'something' }} }

//  const { urls: { regular }}  = image
//
// this is equal to
//
// const urls = image.urls
// const regular = image.urls.regular

const Photo = ({
  urls: { regular },
  alt_description: desc,
  likes,
  user: {
    name,
    portfolio_url: url,
    profile_image: { medium: profilePic }
  }
}) => {
  return <article className='photo'>
    <img src={regular} alt={desc} />
    <div className="photo-info">
      <div>
        <h4>{name}</h4>
        <p>{likes}</p>
      </div>
      <a href={url}>
        <img src={profilePic} alt={name} className="user-icon" />
      </a>
    </div>
  </article>
}

export default Photo
