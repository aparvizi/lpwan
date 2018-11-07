// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

//import Swagger from "swagger-client";
import SessionStore from "./stores/SessionStore";

//import {fetchUtils} from 'react-admin';

//import request from 'request';
//import restful, { requestBackend } from 'restful.js';
//import axios from 'axios';
//const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const {username, password} = params;


        /*
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(response => console.log('Success:', JSON.stringify(response)))
            .then(({ token }) => {
                localStorage.setItem('jwt', token);
            });*/


        return SessionStore.login(JSON.stringify({username, password}), () => {
            this.props.history.push("/");
        });
    }

    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.resolve();
};
