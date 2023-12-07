import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError()

    return (
        <div>
            <h1>{error.message}</h1>
            <h1>Please Reload the Page</h1>
        </div> 
        
    )
}