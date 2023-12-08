import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError()

    return (
        <div className="container">
            <h1 className="big--text">{error.message}</h1>
            <h1 className="big--text">Please Reload the Page</h1>
        </div> 
        
    )
}