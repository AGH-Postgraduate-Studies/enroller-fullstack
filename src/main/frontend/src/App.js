import "milligram";
import "./App.css";
import { useState } from "react";
import LoginForm from "./LoginForm";
import UserPanel from "./UserPanel";

function App() {
  const [loggedIn, setLoggedIn] = useState("");

  async function signIn(email, password) {
    const response = await fetch("/api/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, password: password }),
    });
    if (response.ok) {
      setLoggedIn(email);
    }
  }

  async function signUp(email, password) {
    const response = await fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, password: password }),
    });
    if (response.ok) {
      setLoggedIn(email);
    }
  }

  function signOut() {
    setLoggedIn("");
  }

  return (
    <div>
      <h1>System do zapisów na zajęcia</h1>
      {loggedIn ? (
        <UserPanel username={loggedIn} onLogout={signOut} />
      ) : (
        <LoginForm
          onSignIn={signIn}
          onSignUp={signUp}
          setLoggedIn={setLoggedIn}
        />
      )}
    </div>
  );
}

export default App;
