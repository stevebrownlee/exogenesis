import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Exogenesis</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/resources">Resources</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/login"
                    onClick={
                        () => {
                            localStorage.removeItem("exo_id")
                            history.push("/login")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>
    )
}