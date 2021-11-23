import React, { useState } from "react";
import { useHistory } from "react-router";
import useFetch from "use-http";
import NavbarNotLogged from "./NavbarNotLogged";

const LoginPage = () =>  {

    const history = useHistory();
    const [peselInput, setPeselInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const { post, response } = useFetch(
        '/api/logins',
        {
          cachePolicy: 'no-cache',
        }
      );

    const login = async (event) =>  {
        event.preventDefault();

        await post("", {
            password: passwordInput,
            pesel: peselInput,
          }).then((res) => {
            if (response.ok) {
                sessionStorage.setItem("userId", res.result.userId);
                sessionStorage.setItem("isAuthenticated", true);
                history.push("/");
            }});
    };
    
    return (
        <div>
        <NavbarNotLogged></NavbarNotLogged>
    <div class="center">
        <h2>Zaloguj się</h2>
        <form onSubmit={login}>

        <div class="form-group">
            <label for="peselInput">PESEL</label>
            <input type="text" class="form-control" id="peselInput" placeholder="PESEL" value={peselInput} onChange={(event) => setPeselInput(event.target.value)}/>
        </div>

        <div class="form-group">
            <label for="passwordInput">Hasło</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="Hasło" value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)}/>
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