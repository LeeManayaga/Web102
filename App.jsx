import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';
const events = [
  { title: 'Dota 2',
    image: 'public/images/dota2.jpg',
    description: 'Dota 2 is a 2013 multiplayer online battle arena (MOBA) video game by Valve.',
    link: 'https://store.steampowered.com/app/570/Dota_2/',
    category: 'steam',
  },
  { title: 'Valorant',
    image: 'https://i.pinimg.com/736x/92/02/46/9202461fb26e12bfc91175439b9dc7e6.jpg',
    description: 'Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games, for Microsoft Windows.',
    link: 'https://riotgames.com/valorant',
    category: 'riot',},
  { title: 'League of Legends',
    image: 'https://logos-world.net/wp-content/uploads/2023/02/LoL-Symbol-500x281.png',
    description: 'Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games, for Microsoft Windows.',
    link: 'https://riotgames.com/league-of-legends',
    category: 'riot',},
  { title: 'Rainbow Six Siege',
    image: 'https://i.pinimg.com/736x/4c/95/99/4c9599d6ade28c1258060a6fca2b6788.jpg',
    description: 'Rainbox Six Siege is a tactical shooter game developed by Ubisoft, known for its strategic gameplay and destructible environments.',
    link: 'https://steam.com/rainbox-six-siege',
  category: 'steam',},
{ title: 'Counter-Strike: Global Offensive',
  image: 'https://images.seeklogo.com/logo-png/62/1/counter-strike-logo-png_seeklogo-622731.png',
    description: 'Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games, for Microsoft Windows.',
    link: 'https://store.steampowered.com/app/couonterstrike/730/',
    category: 'steam',},
{ title: 'Left 4 Dead 2',
  image: 'https://e1.pngegg.com/pngimages/718/629/png-clipart-left-4-dead-left-4-dead-logo-thumbnail.png',
    description: 'left 4 dead 2 is a cooperative first-person shooter game developed. the game is set during the aftermath of a worldwide pandemic that has turned most of humanity into aggressive zombie-like creatures, and follows four survivors who must fight their way through hordes of the infected to reach extraction points.',
    link: 'https:riotgames.com/valorant',
    category: 'steam',},
{ title: 'Minecraft',
  image: 'https://preview.redd.it/variations-to-the-minecraft-logo-v0-0dzqovtefeqd1.png?width=640&crop=smart&auto=webp&s=99663c774da1d7cd172ccc120fe76d35cbdb8d17 ' ,
    description: 'minecraft is a game about placing blocks and going on adventures.',
    link: 'minecraft.net/en-us',
    category: 'other',},
{ title: 'Repo',
  image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/03/repo-cover-emoji.jpg?q=70&fit=crop&w=1100&h=618&dpr=1',
    description: 'Repo is game developed by Valve Corporation.',
    link: 'https://store.steampowered.com/repo',
    category: 'steam',},
{ title: 'MIR4',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThR5tF4xkxRUvfTnfJdWKfp5CBuLJjVuT8T3YONa0lGqHjcyv7gQB1ncl1dStAwUemzdg&usqp=CAU',
    description: 'MIR4 is a 2021 fantasy MMORPG developed by Wemade.',
    link: 'mir4.com',
    category: 'other',},
{ title: 'Flyff',
  image: 'https://scontent.fceb6-4.fna.fbcdn.net/v/t1.6435-9/93670735_10158415137944123_8968368236374523904_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vhsPikgVPt8Q7kNvwHzE4sW&_nc_oc=Adnhl_8Pg9SmFLu0MQaB4P79sR6AWfl8f3dEzW6PLb29P56WoLFoD9-47fnrjN6gs3M&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_gid=qtfovuf6toa0ZnGJK8KaOg&oh=00_AfbONcMDMuQXpX9fX5GK3mcyD2QuBY7Mchiqqm6WBWNIEw&oe=68E50731',
    description: 'flyff universe is a free to play mmorpg with a unique flying system, extensive character customization, and a vibrant community.',
    link: 'https://www.flyff.com/',
    category: 'other',},
];

function App() {

  const [darkMode, setDarkMode] = useState(false);
   const [shuffledEvents, setShuffledEvents] = useState([...events]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
const [longestStreak, setLongestStreak] = useState(0);
const [masteredCards, setMasteredCards] = useState([]);

const isLastCard = currentCardIndex === shuffledEvents.length - 1;
const isFirstCard = currentCardIndex === 0;
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (darkMode) {document.body.classList.remove('dark-mode');} else {document.body.classList.add('dark-mode');}
  
  const activeEvents = shuffledEvents.filter(
  (event) => !masteredCards.includes(event.title) // or use ID if available
);
 const shuffleDeck = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setShuffledEvents(shuffled);
 };
 const markAsMastered = () => {
  const currentCard = activeEvents[currentCardIndex];
  if (currentCard) {
    setMasteredCards([...masteredCards, currentCard.title]);

    // Move to the next available card
    if (currentCardIndex >= activeEvents.length - 1) {
 // loop back if at end
    } else {
      setCurrentCardIndex((prev) => prev); // stay at same index as list shrinks
    }
  }
};

const handleCorrectGuess = () => {
  const newStreak = currentStreak + 1;
  setCurrentStreak(newStreak);

  if (newStreak > longestStreak) {
    setLongestStreak(newStreak);
  }

  // Go to next card
  setTimeout(() => {
    setCurrentCardIndex((prev) => (prev + 1) % shuffledEvents.length);
  }, 1000); // Optional delay before moving to next card
};


const showNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % activeEvents.length);
};

 const showPreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? activeEvents.length - 1 : prevIndex - 1
    );
  };
const resetStreak = () => {
  setCurrentStreak(0);
};
  return (
      <div className={darkMode ? 'App dark' : 'App'}>
      <header>
        <button onClick={toggleDarkMode} className="dark-mode-button">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <h1>🌟 Top 10 Games</h1>
        <p>These are top 10 games I recoomend.</p>
        <div className="streaks">
  <p>🔥 Current Streak: {currentStreak}</p>
  <p>🏆 Longest Streak: {longestStreak}</p>
</div>
         <div className="card-number">{currentCardIndex + 1}/{shuffledEvents.length}</div>
      </header>

       <div className="card-grid">
        {activeEvents[currentCardIndex] && (
  <Card {...activeEvents[currentCardIndex]}
  onCorrect={handleCorrectGuess}
  resetStreak={resetStreak}
/>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button onClick={showPreviousCard}  className={`previous ${isFirstCard ? 'disabled-button' : ''}`}
  disabled={isFirstCard}>Previous</button>
        <button onClick={showNextCard}
  className={`next ${isLastCard ? 'disabled-button' : ''}`}
  disabled={isLastCard}> Next</button>
        <button onClick={shuffleDeck} className="shuffle">🔀 Shuffle Deck</button>
        <button
  onClick={markAsMastered}  
  className="mastered"
>
  ✅ Mark as Mastered
</button>
        </div>
    </div>
  );
}

export default App;
