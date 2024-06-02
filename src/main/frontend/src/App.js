import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoginForm from "./components/LoginForm";
import UserPanel from "./components/UserPanel";

function App() {
  const token = localStorage.getItem("token");

  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState("");

  async function signIn(email, password) {
    const response = await fetch("/api/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, password }),
    });
    if (response.ok) {
      setLogin(email);
      const token = await response.json();
      localStorage.setItem("login", email);
      localStorage.setItem("token", token?.token);
      setAuth(true);
      toast.success("Pomyślnie zalogowano!");
    } else if (response.status === 401) {
      toast.error("Nieprawidłowy login lub hasło!");
    } else {
      toast.error("Wystąpił błąd!");
    }
  }

  async function signUp(email, password) {
    const response = await fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, password }),
    });
    if (response.ok) {
      toast.success("Pomyślnie utworzono konto!");
    } else {
      toast.error("Wystąpił błąd podczas tworzenia konta!");
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    setAuth(false);
    toast.success("Pomyślnie wylogowano!");
  }

  useEffect(() => {
    if (token) {
      setAuth(true);
      setLogin(localStorage.getItem("login"));
    }
  }, [token]);

  return (
    <div>
      <h1>System do zapisów na zajęcia</h1>
      {auth ? (
        <UserPanel username={login} onLogout={signOut} />
      ) : (
        <LoginForm onSignIn={signIn} onSignUp={signUp} setLoggedIn={setLogin} />
      )}
    </div>
  );
}

export default App;
