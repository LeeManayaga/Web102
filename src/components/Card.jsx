import React from 'react';
import './Card.css';
const Card = ({ title, image, description, link, }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={image} alt={title} className="card-image"></img>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="card-button">
        Learn More
      </a>
    </div>
  );
};

export default Card;
