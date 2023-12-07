import React, { useState, useEffect } from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx"
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx"
import About from "./pages/About.jsx"
import Game, { loader as gameLoader} from "./pages/Game.jsx"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { nanoid } from "nanoid";
import "./style.css"

export default function App() {

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="game" element={<Game/>} loader={gameLoader}/>
        <Route path="about" element={<About/>}/>
    </Route>
))
    return (
        <RouterProvider router={router}/>
    )
}