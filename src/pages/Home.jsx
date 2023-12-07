import React from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="game">GAME</Link>
            <Link to="about">ABOUT</Link>
        </div>
        
    )
}