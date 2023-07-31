import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './LoginPage.css';

function LoginPage({onLogin, message, err}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [nr, setNr] = useState(0);
    async function getRole() {
        const response = await fetch('api/users/' + username);
        const data = await response.text();
        if (data === "")
            alert("Username or password are not correct");
        setRole(data);
    }
    document.body.style.background = "linear-gradient(90deg, #C7C5F4, #776BCC)";
    function errorAlert(err) {
        /*if (err !== "")
            alert(err);*/
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(username);
        getRole();
        console.log(role);
        
    }
    React.useEffect(() => {
        
        onLogin({ username, password, role });
        
    }, [role]);

    errorAlert(err) 
    return (
/*        <form className="login" onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
            <div className="text-center">
                {message}
            </div>
            
        </form>*/

        <div className="cont">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="User name / Email" onChange={(e) => setUsername(e.target.value)} />
				</div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} / >
				</div>
                        <button className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
                    <div className="social-login">
				<h3>No Account?</h3>
                        <div className="social-icons">
                            <a href="/register" className="social-login__icon ">Register</a>
                            
				</div>
			</div>
		</div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>		
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    );
}

export default LoginPage