import React, { useState } from 'react';
import axios from 'axios';

const APIForm = () => {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]); // 🆕 NEW STATE

const fetchCat = async () => {
  const apiKey = import.meta.env.VITE_CAT_API_KEY;
  
  try {
    let validCat = null;

    while (!validCat) {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
        headers: {
          'x-api-key': apiKey
        }
      });
  
      const cat = response.data[0];
      const breed = cat.breeds[0];

      const breedName = breed?.name || 'Unknown';
      const origin = breed?.origin || 'Unknown';
      const temperament = breed?.temperament?.split(', ')[0] || 'Unknown';

      if (
        !banList.includes(breedName) &&
        !banList.includes(origin) &&
        !banList.includes(temperament)
      ) {
        validCat = {
          image: cat.url,
          breed: breedName,
          origin,
          temperament,
        };
      }
    }
if (catData) {
      setHistory((prevHistory) => [catData, ...prevHistory].slice(0, 5));
    }

    setCatData(validCat);
  } catch (error) {
    console.error('Error fetching cat:', error);
  }
};

  const toggleBan = (attribute) => {
    if (banList.includes(attribute)) {
      setBanList(banList.filter((item) => item !== attribute));
    } else {
      setBanList([...banList, attribute]);
    }
  };

return (
  <div className="page"> {/* Horizontal layout wrapper */}

    {/* 🟨 History on the left */}
    <div className="history-section">
      <h3>📜 History</h3>
      {history.length === 0 ? (
        <p>No history yet</p>
      ) : (
        <ul className="history-list">
          {history.map((cat, index) => (
            <li key={index}>
              <strong>{cat.breed}</strong>
              <img src={cat.image} alt="cat" className="history-image" />
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* 🟩 Main center content */}
    <div className="center-container">
      <div className="content-wrapper">
        <h2>CAAAAATTSS!!!!:</h2>

        <form className="form-container">
          <button type="button" onClick={fetchCat}>
            🐱 Discover Cat
          </button>
        </form>

        {catData && (
          <div className="cat-card">
            <div className="attribute-buttons">
              <button onClick={() => toggleBan(catData.breed)}>
                <strong>Breed:</strong> {catData.breed}
              </button>
              <button onClick={() => toggleBan(catData.origin)}>
                <strong>Origin:</strong> {catData.origin}
              </button>
              <button onClick={() => toggleBan(catData.temperament)}>
                <strong>Temperament:</strong> {catData.temperament}
              </button>
            </div>
            <div className="image-container">
              <img src={catData.image} alt="A cute cat" className="cat-image" />
            </div>
          </div>
        )}
      </div>
    </div>

    {/* 🟥 Ban list on the right */}
    <div className="ban-list">
      <h3>🚫 Ban List</h3>
      <p>Select an attribute in your listing to ban it</p>
      <ul>
        {banList.map((item, idx) => (
          <li key={idx} onClick={() => toggleBan(item)}>
            {item} ❌
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default APIForm;