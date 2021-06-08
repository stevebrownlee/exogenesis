import React, { useContext, useEffect } from "react"
import { NewsContext } from "./NewsProvider"
import "./News.css"

export const NewsList = () => {
    const { news, getNews } = useContext(NewsContext)

    useEffect(()=>getNews(), [])

    return (
        <>
            <h1>Recent News</h1>

            <article className="newsList">
            {
                news.map(n => <section key={`news--${n.id}`} className="news">
                    <div className="news__date">Date: {new Date(n.date).toLocaleDateString()}</div>
                    <div className="news__event">{n.event}</div>
                </section>)
            }
            </article>
        </>
    )
}