import React from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx"
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx"
import Game, { loader as gameLoader} from "./pages/Game.jsx"

import { nanoid } from "nanoid";
import "./style.css"

export default function App() {

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} errorElement={<Error/>}/>
        <Route path="game" element={<Game/>} loader={gameLoader} errorElement={<Error/>}/>
        <Route path="*" element={<Home/>}/>
    </Route>
))
    return (
        <RouterProvider router={router}/>
    )
}