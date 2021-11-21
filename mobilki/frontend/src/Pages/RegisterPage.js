import React from "react";
import { useHistory } from "react-router";

const RegisterPage = () =>  {
    const history = useHistory();
    
    const register = () => {
        sessionStorage.setItem("isAuthenticated", true);
        history.push("/");
    }
    return (
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
    </div>
    );
}
 
export default RegisterPage;