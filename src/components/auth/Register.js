import React, { useEffect, useRef, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { Settings } from "../Settings"
import "./Login.css"

export const Register = () => {
    const [governor, setGovernor] = useState({ name: "", email: "", colonyId: 0 })
    const [colonies, setColonies] = useState([])
    const conflictDialog = useRef()
    const history = useHistory()

    useEffect(() => {
        const getColonies = () => {
            return fetch(`${Settings.apiURL}/colonies`)
                .then(response => response.json())
                .then(setColonies)
        }
        getColonies()
    }, [])

    const existingUserCheck = () => {
        return fetch(`${Settings.apiURL}/governors?email=${governor.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch(`${Settings.apiURL}/governors`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: governor.email,
                            name: governor.name,
                            colonyId: parseInt(governor.colonyId)
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("exo_user", btoa(JSON.stringify(createdUser)))
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const userProvidedInput = (event) => {
        const copyOfState = { ...governor }
        copyOfState[event.target.id] = event.target.value
        setGovernor(copyOfState)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for NSS Kennels</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input
                        onChange={userProvidedInput}
                        type="text" id="name"
                        className="form-control"
                        placeholder="Your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={userProvidedInput} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Colony </label>
                    <select id="colonyId" onChange={userProvidedInput}>
                        <option value="0">Select your colony</option>
                        {
                            colonies.map(c => <option value={c.id}>{c.designation}</option>)
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>

            <section className="link--register">
                <Link to="/login">Already have an account?</Link>
            </section>
        </main>
    )
}
