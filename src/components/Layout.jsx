import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <div className="header">Quiz Game</div>
            <Outlet />
            <div className="footer">Made by Patrick Lacsamana</div>
        </div>
    )
}