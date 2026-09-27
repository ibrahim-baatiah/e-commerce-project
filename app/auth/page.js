"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { authProviders } from "../../config/authProviders"
import { useAuth } from "../../context/AuthContext"

export default function AuthPage() {
  const router = useRouter()
  const { user, signUp, logIn } = useAuth()
  const [mode, setMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState("")

  if (user) router.replace("/")

  function submit(event) {
    event.preventDefault()
    setError("")
    const form = new FormData(event.currentTarget)
    const username = String(form.get("username") || "").trim()
    const password = String(form.get("password") || "")
    if (!username || !password) return setError("Please fill in all required fields.")
    if (mode === "login") {
      const result = logIn(username, password, form.get("remember") === "on")
      if (result.error) return setError(result.error)
      router.push("/")
      return
    }
    const email = String(form.get("email") || "").trim()
    const confirm = String(form.get("confirmPassword") || "")
    if (!email) return setError("Email is required.")
    if (password.length < 8) return setError("Password must be at least 8 characters.")
    if (password !== confirm) return setError("Passwords must match.")
    const result = signUp({ username, email, password })
    if (result.error) return setError(result.error)
    router.push("/")
  }

  function switchMode(nextMode) { setMode(nextMode); setError(""); setShowPassword(false) }
  function comingSoon(provider) { setToast(`${provider} login coming soon`); setTimeout(() => setToast(""), 2200) }

  return <main className="auth-page"><div className="auth-panel"><Link href="/" className="logo auth-logo">Al-atas<span>.</span></Link><div className="auth-heading"><p className="eyebrow">Welcome back</p><h1>{mode === "login" ? "Log in to Al-atas" : "Create your account"}</h1><p>{mode === "login" ? "Good things are waiting for you." : "Join us for considered things, every day."}</p></div><div className="auth-tabs" role="tablist"><button className={mode === "login" ? "active" : ""} onClick={() => switchMode("login")} role="tab" aria-selected={mode === "login"}>Log In</button><button className={mode === "signup" ? "active" : ""} onClick={() => switchMode("signup")} role="tab" aria-selected={mode === "signup"}>Sign Up</button></div><form className="auth-form" onSubmit={submit} noValidate><label>Username<input name="username" autoComplete="username" placeholder="Your username" required/></label>{mode === "signup" && <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label>}<label>Password<div className="password-input"><input name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" required/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>{mode === "signup" && <label>Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" placeholder="Re-enter your password" required/></label>}{mode === "login" && <div className="auth-options"><label className="checkbox-label"><input name="remember" type="checkbox"/> Remember me</label><button type="button" className="text-link" onClick={() => setToast("Password recovery coming soon")}>Forgot password?</button></div>}{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button full-width auth-submit" type="submit">{mode === "login" ? "Log In" : "Create Account"}</button></form><div className="auth-divider"><span>or continue with</span></div><div className="provider-list">{authProviders.map(({ id, name, icon: Icon }) => <button key={id} type="button" className="provider-button" onClick={() => comingSoon(name)}><Icon size={17}/><span>Continue with {name}</span></button>)}</div><p className="auth-footer">By continuing, you agree to our <span>terms and privacy policy.</span></p></div>{toast && <div className="auth-toast" role="status">{toast}</div>}</main>
}
