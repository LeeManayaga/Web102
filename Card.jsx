import React, {useState, useEffect} from 'react';
import './Card.css';
const Card = ({ title, image, description, link, category, onCorrect, resetStreak }) => {
  const[flipped, setFlipped] = React.useState(false);
  const [guess, setGuess] = useState('');
const [isCorrect, setIsCorrect] = useState(false);
 const [isIncorrect, setIsIncorrect] = useState(false);


  useEffect(() => {
    setFlipped(false);
    setGuess('');
    setIsCorrect(false);
    setIsIncorrect(false);
  }, [title]);

  const handleCardClick = () => {
     if (isCorrect) {
      setFlipped(!flipped);
      
  }
  };

    const handleGuessChange = (e) => {
    setGuess(e.target.value);
    if (isIncorrect) {
      setIsIncorrect(false);
    }
  };

  const handleCheckGuess = (e) => {
  e.stopPropagation(); // Prevent flip on submit

  const normalizedGuess = guess.trim().toLowerCase();
  const normalizedTitle = title.trim().toLowerCase();

if (normalizedGuess === normalizedTitle) {
    setIsCorrect(true);
    onCorrect();           // Increment streak
    setFlipped(true);      // 👈 Flip the card if guess is correct
  } else {
    setIsIncorrect(true);
    resetStreak();         // Reset streak if guess is wrong
  }
};
  
   return (
    <div className="card" onClick={handleCardClick}>
      <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">

          {/* FRONT: Image and Guess */}
          <div className="flip-card-front">
            <div className={`category-badge ${category.toLowerCase()}`}>
              {category}
            </div>
            <img src={image} alt={title} className="card-image" />

            {!isCorrect && (
              <div className="guess-container">
                <input
                  type="text"
                  value={guess}
                  onChange={handleGuessChange}
                  placeholder="Guess the title..."
                   className={`guess-input ${isIncorrect ? 'incorrect' : ''}${isCorrect ? 'correct' : ''}`}
                   onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    handleCheckGuess(e);
                    e.target.blur(); // optional: removes focus from input
  }
}}
/>
                <button onClick={handleCheckGuess} className="guess-button">
                  Submit
                </button>
              </div>
            )}
          </div>

          {/* BACK: Title, Description, Link */}
          <div className="flip-card-back">
            <div className={`category-badge ${category.toLowerCase()}`}>
              {category}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-button"
                onClick={(e) => e.stopPropagation()} // prevent card flipping
              >
                Learn More
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
