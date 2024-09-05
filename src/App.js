import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get('https://api.punkapi.com/v2/beers')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    
    const filteredData = data.filter((beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-container">
            <h1 className="app-heading">Punk API Beers</h1>
            <input
                type="text"
                placeholder="Search by beer name"
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="beer-cards">
                {filteredData.map((beer) => (
                    <div key={beer.id} className="beer-card">
                        <img src={beer.image_url} alt={beer.name} className="beer-image" />
                        <h2 className="beer-name">{beer.name}</h2>
                        <p className="beer-description">{beer.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
