import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button.js';
import './ToggleButton.css';
import styled from "styled-components";





export const ToggleButton = () => {
    const genres = ["Action", "Adventure", "Animation", "Children's", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western", "Other"];
    const [clicked, setClicked] = useState(genres[0]);

    const [data, setData] = useState([{}])
    const getList = (genre) => {
        const param = {"genre": genre};
        const options = {
            method: 'GET',
            body: JSON.stringify(param)
        };
    
        fetch("/", options).then(
                res => res.json()
            ).then(
                data => {
                    setData(data)
                    console.log(data)
                });
    };

    useEffect(() => {
        getList()
    }, [clicked])
    

    const ButtonToggle = styled(Button)`
        background-color: "#473299";
        ${({clicked}) => clicked && `
            background-color: "#24069c";
        `
    }`

    if (data) {
        data.map((lst, i) => {
            return <div>{i}</div>
        });
    }
    

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

        
        

        </div>
    );
};