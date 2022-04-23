import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button.js';
import './ToggleButton.css';
import styled from "styled-components";





export const ToggleButton = () => {
    const genres = ["Action", "Adventure", "Animation", "Children's", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western", "Other"];
    const [clicked, setClicked] = useState(genres[0]);

    const [data, setData] = useState([{}])
    const getList = (genre) => {
        try{
        fetch(`/${genre}`).then(
                res => res.json()
            ).then(
                data => {
                    setData(data)
                    console.log(data)
                });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect((genre) => {
        getList(genre)
    }, [clicked])
    

    const ButtonToggle = styled(Button)`
        background-color: "#473299";
        ${({clicked}) => clicked && `
            background-color: "#24069c";
        `
    }`
    

    return (
        <div>
        <div className="grid">
            {genres.map(genre => (
                <ButtonToggle 
                clicked={clicked===genre} 
                onClick={() => {
                    setClicked(genre);
                    getList(genre);
                }}>{genre}
                </ButtonToggle>
            ))}
        </div>

        <div>
            <h2 class="genre">{clicked}</h2>
            <h3>We recommend...</h3>
        </div>

        <div class="line">
            <p>Movie Title</p>
            <p>Average Rating</p>
        </div>
        <div>
            {data.map((movie) => (
                <div class="line">
                <p key={movie.order}>{movie.title}</p>
                <p key={movie.order}>{movie.rating}</p>
                </div>
            ))}
        </div>
        

        </div>
    );
};