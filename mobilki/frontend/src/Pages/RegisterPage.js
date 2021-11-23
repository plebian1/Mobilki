import React, { useState } from "react";
import { useHistory } from "react-router";
import useFetch from "use-http";
import NavbarNotLogged from "./NavbarNotLogged";

const RegisterPage = () =>  {
    const history = useHistory();
    const [peselInput, setPeselInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    const { post, response } = useFetch(
        '/api/logins/register',
        {
          cachePolicy: 'no-cache',
        }
      );

    const register = async (event) =>  {
        event.preventDefault();

        await post("", {
            name: nameInput,
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
        <h2>Zarejestruj się</h2>
        <form onSubmit={register}>

        <div class="form-group">
            <label for="nameInput">Imię i nazwisko</label>
            <input type="text" class="form-control" id="nameInput" placeholder="Imię i nazwisko" value={nameInput} onChange={(event) => setNameInput(event.target.value)}/>
        </div>

        <div class="form-group">
            <label for="peselInput">PESEL</label>
            <input type="text" class="form-control" id="peselInput" placeholder="PESEL" value={peselInput} onChange={(event) => setPeselInput(event.target.value)}/>
        </div>

        <div class="form-group">
            <label for="passwordInput">Hasło</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="Hasło" value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)}/>
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