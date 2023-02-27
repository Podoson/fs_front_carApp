import React, {useState} from "react";
import { SERVER_URL } from "../constants";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import CarList from "./Carlist";

function Login(){

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [open, setOpen] = useState(false);

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            if(jwtToken !== null){
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
            else{
                setOpen(true);
            }
        })
        .catch(err => console.error(err))
    }

    if (isAuthenticated){
        return <CarList />;
    }
    else{
        return(
            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange} />
                    <TextField
                        name="password"
                        label="Password"
                        onChange={handleChange} />
    
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={login}>Login</Button>
                </Stack>
                <Snackbar
                    open = {open}
                    autoHideDuration = {3000}
                    onClose = {() => setOpen(false)}
                    message = "login failed: Check your username and password"
                />
            </div>
        );
    }
    
}

export default Login;