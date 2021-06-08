import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const user = JSON.parse(atob(localStorage.getItem("exo_user")))

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Exogenesis</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/resources">Resources</Link>
            </li>
            <li className="navbar__item" style={{ minWidth: "fit-content", marginLeft: "auto" }}>
                <span style={{ margin: "0 1rem 0 0" }}>Welcome {user.name}</span>
                <Link className="navbar__link" to="/login"
                    onClick={() => localStorage.removeItem("exo_id")}
                >Logout</Link>
            </li>
        </ul>
    )
}