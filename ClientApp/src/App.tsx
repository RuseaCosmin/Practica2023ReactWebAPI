import * as React from "react";
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AdminAppRoutes from './AdminAppRoutes';
import LoginAppRoutes from './LoginAppRoutes';

import { Layout } from './components/Layout';
import './custom.css';
import { CookiesProvider, useCookies } from "react-cookie";
import LoginPage from "./pages/LoginPage.tsx";
import { AdminLayout } from "./components/AdminLayout";
function App() {
    const [cookies, setCookie] = useCookies(["user"]);
    const [error, setError] = React.useState(<p></p>);
    const [err, setErr] = React.useState("");
    function handleLogin(user) {
        
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, password: user.password, role: user.role })
            };
        fetch('api/users/authenticate', requestOptions)
            .then(response => {
                if (response.status===200) {
                    
                    return response.json();
                    
                }
                else {
                    setError(<p>Login Failed</p>);
                    setErr("Username or Password Invalid");
                    throw new Error("Login Failed");
                }
            })
            .then(data => {
                setCookie("token", data, { path: "/" });
                localStorage.setItem("token", data.token);
                localStorage.setItem("refToken", data.refToken);
                localStorage.setItem("refTokenExp", data.refTokenExp);
                localStorage.setItem("refTokenExpStr", data.refTokenExpStr);
                console.log(user);
                setCookie("user", user, { path: "/" });
                localStorage.setItem("user", JSON.stringify({ username: user.username, password: user.password, role: user.role }));
            }
            )
            .catch(error => console.log(error));
        }


        return (
            <CookiesProvider>
                {cookies.user && cookies.user["role"]==="User" ?
                    <div className="row">
                        <div className="col-2">
                            <Layout />
                        </div>
                        <div className="col-10">
                            <Routes>
                                {AppRoutes.map((route, index) => {
                                    const { element, ...rest } = route;
                                    return <Route key={index} {...rest} element={element} />;
                                })}
                            </Routes>
                        </div>
                    </div>
                    : (cookies.user && cookies.user["role"] === "Admin" ?
                        <div className="row">
                            <AdminLayout />
                            <Routes>
                                {AdminAppRoutes.map((route, index) => {
                                    const { element, ...rest } = route;
                                    return <Route key={index} {...rest} element={element} />;
                                })}
                            </Routes>
                        
                        </div> :
                        <>
                            <Routes>
                                <Route path="/" element={<LoginPage onLogin={handleLogin} message={error} err={err} />} />
                                {LoginAppRoutes.map((route, index) => {
                                    const { element, ...rest } = route;
                                    return <Route key={index} {...rest} element={element} />;
                                })}
                            </Routes>
                        </>         
                    )

                    
                }
            </CookiesProvider>
        );
    }

export default App