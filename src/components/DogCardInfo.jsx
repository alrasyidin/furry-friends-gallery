import React, { useState } from 'react'

const DogCardInfo = ({ imgUrl, pictureId }) => {
  return (
    <div className="card card-dog">
      <div className="card-image">
        <figure className="image" style={{ backgroundImage: `url(${imgUrl})` }}>
          <img
            src={imgUrl}
            alt={`${imgUrl} a nice dog`}
            className="is-sr-only"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <strong>Picture Id:</strong> {pictureId}
        </div>
      </div>
    </div>
  )
}

export default DogCardInfo
