import React from "react";
import { useHistory } from "react-router";
const LoginPage = () =>  {

    const history = useHistory();
    
    const login = () => {
        sessionStorage.setItem("isAuthenticated", true);
        history.push("/");
    }
    return (
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
    </div>
    );
}
 
export default LoginPage;