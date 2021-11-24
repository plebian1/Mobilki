import React from "react";
import { useHistory } from "react-router";
import NavbarNotLogged from "./NavbarNotLogged";

const RegisterPage = () =>  {
    const history = useHistory();
    
    const register = (event) => {
       event. preventDefault();
       var data = {
       name:"SGSTR",
       password:"gae8rhgui",
       pesel:"2734892374",


       };
        fetch('/api/logins/register',
        {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }

        ).then(res => res.json()).then(data => {
    });

<<<<<<< Updated upstream
      //  sessionStorage.setItem("isAuthenticated", true);
      // history.push("/");


    }
=======
        await post("", {
            name: nameInput,
            password: passwordInput,
            pesel: peselInput,
          }).then((res) => {
            if (response.ok) {
 //               sessionStorage.setItem("userId", res.result.userId);
                sessionStorage.setItem("isAuthenticated", true);
                history.push("/");
            }});
    };
    
>>>>>>> Stashed changes
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