"use client"

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)
const USERS_KEY = "al-atas-users"
const SESSION_KEY = "al-atas-user"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SESSION_KEY)
      if (saved) setUser(JSON.parse(saved))
    } catch {}
    setReady(true)
  }, [])

  function signUp(details) {
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY) || "[]")
    if (users.some((candidate) => candidate.username.toLowerCase() === details.username.toLowerCase())) return { error: "That username is already taken." }
    if (users.some((candidate) => candidate.email.toLowerCase() === details.email.toLowerCase())) return { error: "That email is already registered." }
    const nextUser = { username: details.username, email: details.email, password: details.password }
    window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]))
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return { user: nextUser }
  }

  function logIn(username, password, remember = true) {
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY) || "[]")
    const match = users.find((candidate) => candidate.username.toLowerCase() === username.toLowerCase() && candidate.password === password)
    if (!match) return { error: "Incorrect username or password." }
    if (remember) window.localStorage.setItem(SESSION_KEY, JSON.stringify(match))
    setUser(match)
    return { user: match }
  }

  function logOut() {
    window.localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, ready, signUp, logIn, logOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
 
