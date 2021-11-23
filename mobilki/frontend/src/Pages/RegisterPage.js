import React from "react";
import { useHistory } from "react-router";
import NavbarNotLogged from "./NavbarNotLogged";

const RegisterPage = () =>  {
    const history = useHistory();
    
    const register = () => {
        sessionStorage.setItem("isAuthenticated", true);
        history.push("/");
    }
    return (
        <div>
        <NavbarNotLogged></NavbarNotLogged>
    <div class="center">
        <h2>Zarejestruj się</h2>
        <form onSubmit={register}>

        <div class="form-group">
            <label for="nameInput">Imię i nazwisko</label>
            <input type="text" class="form-control" id="nameInput" placeholder="Imię i nazwisko"/>
        </div>

        <div class="form-group">
            <label for="emailInput">Adres email</label>
            <input type="email" class="form-control" id="emailInput" placeholder="Adres email"/>
        </div>

        <div class="form-group">
            <label for="passwordInput">Hasło</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="Hasło"/>
        </div>

        <button type="submit" class="btn btn-primary">Zarejestruj się</button>
        </form>
        <hr class="wd-350"></hr>
        <p class="font-13">Masz już konto?</p>
        <a class="btn btn-primary" href="/login">Zaloguj się</a>
    </div>
    </div>
    );
}
 
export default RegisterPage;