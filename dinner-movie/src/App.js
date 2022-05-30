import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
    const[name, setName] = useState([]);
    const[img, setImg] = useState([]);
    const apiKey = "bd5ddc60f5de8d9d668eb738d1c542aa"

    function fetchMovie() {
        var movieId = Math.floor(Math.random()*763741);

        function fetchRetry(tries) {
            movieId = Math.floor(Math.random()*763741);
            return new Promise(function(resolve, reject) {
                fetch(`https://api.themoviedb.org/3/movie/${String(movieId)}?api_key=${apiKey}&language=en-US`).then(resolve)
                    .catch(function(error) {
                        if(tries == 1) return reject(error);
                        fetchRetry(tries-1)
                            .then(resolve)
                            .catch(reject);
                    })
            });
        }

        fetch(`https://api.themoviedb.org/3/movie/${String(movieId)}?api_key=${apiKey}&language=en-US`)
            .then(res => {
                if(res.ok)
                    return res.json()
            })
            .then((result) => {
                setName(result.original_title)
                setImg(result.poster_path)
                console.log(img)
            })
            .catch((error) => {
                fetchRetry(10)
            })
    }

    return (
        <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <h2 style={{
            position: 'absolute', left: '2%', top: '1%',
            }}>MovieFinder</h2>
            <div style={{alignContent: 'center'}}
            >
                <img style = {{
                width: '200px', height: '250px', resizeMode: 'fill', borderRadius: '15px'
                }}src={`https://image.tmdb.org/t/p/original${img}`}/>
                <h1>{name}</h1>
                <button onClick={fetchMovie} style={{
                background: '#f8465d', borderRadius: '100px', color: 'white', border: '0',
                width: '150px', height: '40px'
                }}>Fetch Movie</button>
            </div>
        </div>
    );
}
//
export default App;