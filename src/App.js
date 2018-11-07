// in src/App.js
import React from 'react';
//import { Admin, Resource ,ListGuesser} from 'react-admin';
import { Admin, Resource , fetchUtils} from 'react-admin';
//import { Admin, Resource, EditGuesser } from 'react-admin';
import NotFound from './NotFound';

//import CssBaseline from "@material-ui/core/CssBaseline";
//import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
//import Grid from '@material-ui/core/Grid';

import { createMuiTheme } from '@material-ui/core/styles';
//import indigo from '@material-ui/core/colors/indigo';
//import pink from '@material-ui/core/colors/pink';
//import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

//import amber from "@material-ui/core/colors/amber";

import Dashboard from './Dashboard';
import authProvider from './authProvider';

import dataProvider from './dataProvider';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import setIcon from '@material-ui/icons/SettingsApplications';
import devIcon from '@material-ui/icons/DevicesOther';
import gwIcon from '@material-ui/icons/Router';
import notfIcon from '@material-ui/icons/Notifications';
import mapIcon from '@material-ui/icons/Map';
import CommentIcon from '@material-ui/icons/Comment';


import request from 'request';
import restful, { requestBackend } from 'restful.js';

//import fakeDataProvider from 'ra-data-fakerest';

import { PostShow,PostList, PostEdit, PostCreate } from './posts';
import {UserCreate, UserEdit,UserList} from './users';
import { CommentList } from './comments';


/*
const dataProvider = fakeDataProvider({
    posts: [
        { id: 0, title: 'Hello, world!' },
        { id: 1, title: 'FooBar' },
    ],
    users: [
        { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
        { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
    ],
})

*/

//import jsonServerProvider from 'ra-data-json-server';
//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
//import jsonapiClient from "ra-jsonapi-client";
//const dataProvider = jsonapiClient('http://localhost:3000');




//const API_URL = 'http://jsonplaceholder.typicode.com';
//const API_URL = 'http://www.iotsolar.net/posts/posts.php';

const api = restful('http://www.iotsolar.net/posts/posts.php', requestBackend(request));

/*
import simpleRestProvider from 'ra-data-json-server';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
   // options.headers.set('X-Custom-Header', 'foobar');

    options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');

    options.headers.set('exposedHeaders', 'X-Total-Count')
    options.headers.set('X-Total-Count', '10');


    options.user = {
        authenticated: true,
        token: 'SRTRDFVESGNJYTUKTYTHRG'
    }

    return fetchUtils.fetchJson(url, options);
}

const my_dataProvider = simpleRestProvider(api, httpClient);



*/
//const apiUrl = 'https://jsonplaceholder.typicode.com';

//const apiUrl = 'http://www.iotsolar.net/posts/posts.php';


//const apiUrl = 'http://localhost:3001';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    // options.headers.set('X-Custom-Header', 'foobar');

    options.headers.set('Access-Control-Expose-Headers', 'Content-Range');

    options.headers.set('Content-Range','bytes : 0-9/*')

    options.user = {
        authenticated: true,
        token: 'SRTRDFVESGNJYTUKTYTHRG'
    }

    return fetchUtils.fetchJson(url, options);
}

const my_dataProvider = dataProvider(api, httpClient);



const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});



const drawerWidth = 270;

const styles = {
    root: {
        flexGrow: 1,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    main: {
        width: "100%",
        padding: 2 * 24,
        paddingTop: 115,
        flex: 1,
    },

    mainDrawerOpen: {
        paddingLeft: drawerWidth + (2 * 24),
    },
    footerDrawerOpen: {
        paddingLeft: drawerWidth,
    },
};


const App = () => (
    <Admin  styles = {styles} theme={theme}  title="LPWAANdata IIoT Admin"  catchAll={NotFound}  dashboard={Dashboard} authProvider={authProvider} dataProvider={my_dataProvider} >
        <Resource name="Notification" list={UserList} icon={notfIcon} />
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}  icon={UserIcon} />
        <Resource name="setting" list={UserList} icon={setIcon} />
        <Resource name="gateways" list={UserList} icon={gwIcon} />
        <Resource name="Devices" list={UserList} icon={devIcon} edit={PostEdit} create={PostCreate} />
        <Resource name="net-coverage" list={UserList} icon={mapIcon} />
        <Resource name="Posts" list={PostList} edit={PostEdit} create={PostCreate} show ={PostShow} icon={PostIcon} />
        <Resource name="comments" list={CommentList} icon={CommentIcon} />

    </Admin>
);
export default App;