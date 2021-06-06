import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Settings } from "../Settings";
import "./Login.css"

export const Login = () => {
    const [ governor, set ] = useState({ email: "" })
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`${Settings.apiURL}/governors?email=${governor.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("exo_id", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Exogenesis System Management</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...governor}
                                    copy.email = evt.target.value
                                    set(copy)
                                }
                            }
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Galactic email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit"> Sign in </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
