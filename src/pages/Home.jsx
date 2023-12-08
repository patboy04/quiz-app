import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams()

    function handleClick(params) {
        setSearchParams({ difficulty: params })
    }

    return (
        <div className="container">
            <DropdownButton id="dropdown-basic-button" title="Choose difficulty" variant="dark" data-bs-theme="dark"> 
                <Dropdown.Item onClick={() => handleClick("easy")}>Easy</Dropdown.Item>
                <Dropdown.Item onClick={() => handleClick("medium")}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={() => handleClick("hard")}>Hard</Dropdown.Item>
            </DropdownButton>
            <Link to="game"><button className="button">Play Game</button></Link>
        </div>
        
    )
}