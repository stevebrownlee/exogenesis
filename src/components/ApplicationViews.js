import React from "react"
import { Route } from "react-router-dom"
import { NewsList } from "./news/NewsList";
import { NewsProvider } from "./news/NewsProvider";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <NewsProvider>
                    <NewsList />
                </NewsProvider>
            </Route>
        </>
    )
}
