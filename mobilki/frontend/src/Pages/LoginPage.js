import React from "react";
import { useHistory } from "react-router";
import NavbarNotLogged from "./NavbarNotLogged";
const LoginPage = () =>  {

    const history = useHistory();
    
    const login = () => {
        sessionStorage.setItem("isAuthenticated", true);
        history.push("/");
    }
    return (
        <div>
        <NavbarNotLogged></NavbarNotLogged>
    <div class="center">
        <h2>Zaloguj się</h2>
        <form onSubmit={login}>
        <div class="form-group">
            <label for="emailInput">Adres email</label>
            <input type="email" class="form-control" id="emailInput" placeholder="Adres email"/>
        </div>

        <div class="form-group">
            <label for="passwordInput">Hasło</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="Hasło"/>
        </div>

        <button type="submit" class="btn btn-primary">Zaloguj się</button>
        </form>
        <hr class="wd-350"></hr>
        <p class="font-13">Nie masz konta?</p>
        <a class="btn btn-primary" href="/register">Zarejestruj się</a>
    </div>
    </div>
    );
}
 
export default LoginPage;