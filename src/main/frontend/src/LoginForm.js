import { useState } from "react";

export default function LoginForm({ onSignIn, onSignUp }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {isSignIn ? (
        <>
          <label>Zaloguj się</label>
          <input
            placeholder="email@example.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => onSignIn(email, password)}>zaloguj</button>
        </>
      ) : (
        <>
          <label>Stwórz nowe konto</label>
          <input
            placeholder="email@example.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => onSignUp(email, password)}>
            stwórz nowe konto
          </button>
        </>
      )}
      <div>
        {isSignIn && (
          <button onClick={(prev) => setIsSignIn(!prev)}>
            stwórz nowe konto
          </button>
        )}
      </div>
    </div>
  );
}
