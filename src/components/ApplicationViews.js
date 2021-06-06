import React from "react"
import { Route } from "react-router-dom"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <h1>Hello</h1>
            </Route>
        </>
    )
}
