import React, { useState } from "react"

export const NewsContext = React.createContext()

export const NewsProvider = (props) => {
    const [news, set] = useState([])

    const getNews = () => {
        return fetch("http://localhost:8088/newsBroadcasts?_expand=colony")
        .then(res => res.json())
        .then(set)
    }

    const addNews = (news) => {
        return fetch("http://localhost:8088/newsBroadcasts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(news)
        })
        .then(getNews)
    }


    return (
        <NewsContext.Provider value={{
            news, getNews, addNews
        }}>
            {props.children}
        </NewsContext.Provider>
    )
}