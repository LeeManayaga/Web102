import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [cats, setCats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [stats, setStats] = useState({});
  const [lifespanFilter, setLifespanFilter] = useState(20); // max years

  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  useEffect(() => {
    const fetchCats = async () => {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1', {
        headers: { 'x-api-key': apiKey }
      });

      const processed = response.data
        .filter(cat => cat.breeds.length > 0)
        .map(item => {
          const breed = item.breeds[0];
          return {
            id: item.id,
            image: item.url,
            breed: breed.name,
            origin: breed.origin,
            temperament: breed.temperament?.split(',')[0] || 'Unknown',
            lifeSpan: parseFloat(breed.life_span.split(' ')[0])
          };
        });

      setCats(processed);
      calculateStats(processed);
    };

    fetchCats();
  }, []);

  const calculateStats = (data) => {
    const total = data.length;
    const avgLifespan = (data.reduce((sum, c) => sum + (c.lifeSpan || 0), 0) / total).toFixed(1);
    const originCount = {};
    data.forEach(cat => {
      originCount[cat.origin] = (originCount[cat.origin] || 0) + 1;
    });

    const mostCommonOrigin = Object.entries(originCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    setStats({ total, avgLifespan, mostCommonOrigin });
  };

  const filteredCats = cats.filter(cat =>
  cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (originFilter === '' || cat.origin === originFilter) &&
  cat.lifeSpan >= lifespanFilter
);

  const uniqueOrigins = [...new Set(cats.map(c => c.origin))];

  return (
    <div className="dashboard">
      <h2>🐱 Cat Dashboard</h2>

      {/* Stats */}
      <div className="stats-container">
  <div className="stat-box">
    <div className="stat-value">{stats.total}</div>
    <div className="stat-label">Total Breeds</div>
  </div>
  <div className="stat-box">
    <div className="stat-value">{stats.avgLifespan} yrs</div>
    <div className="stat-label">Average Lifespan</div>
  </div>
  <div className="stat-box">
    <div className="stat-value">{stats.mostCommonOrigin}</div>
    <div className="stat-label">Most Common Origin</div>
  </div>
</div>

      {/* Search & Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by breed"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}>
          <option value="">All Origins</option>
          {uniqueOrigins.map((origin, idx) => (
            <option key={idx} value={origin}>{origin}</option>
          ))}
        </select>
       <label>
    Lifespan: {lifespanFilter}+ years
    <input
      type="range"
      min="5"
      max="20"
      value={lifespanFilter}
      onChange={(e) => setLifespanFilter(parseInt(e.target.value))}
      className="slider"
    />
  </label>
      </div>

      {/* Table */}
      <table className="cat-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Breed</th>
            <th>Lifespan</th>
            <th>Temperament</th>
          </tr>
        </thead>
        <tbody>
  {filteredCats.map((cat) => (
    <tr key={cat.id}>
      <td><img src={cat.image} alt={cat.breed} height="60" /></td>
      <td>{cat.breed}</td>
      <td>{cat.lifeSpan} years</td> {/* ✅ FIXED LINE */}
      <td>{cat.temperament}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default Dashboard;