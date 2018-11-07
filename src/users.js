// in src/users.js
import React from 'react';
//import { List, Datagrid, TextField, EmailField } from 'react-admin';
import { Create,TabbedForm,required,FormTab} from 'react-admin';

import {SimpleForm, List,Edit, Datagrid, TextInput,TextField, EmailField ,DisabledInput,Toolbar,SaveButton} from 'react-admin';
import MyUrlField from './MyUrlField';
//import { css, withStyles } from 'react-with-styles';


export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);



//const styles = {
//  inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
//};

const UserCreateToolbar = ({ permissions, ...props }) =>
    <Toolbar {...props}>
        <SaveButton
            label="user.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        {permissions === 'admin' &&
        <SaveButton
            label="user.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />}
    </Toolbar>;

export const UserCreate = ({ permissions, ...props }) =>
    <Create {...props}>
        <SimpleForm
            toolbar={<UserCreateToolbar permissions={permissions} />}
            defaultValue={{ role: 'user' }}
        >
            <TextInput source="name" validate={[required()]} />
            {permissions === 'admin' &&
            <TextInput source="role" validate={[required()]} />}
        </SimpleForm>
    </Create>;



const UserTitle = ({ record }) => {
    return <span>Post {record ? `"${record.user}"` : ''}</span>;
};


export const UserEdit = ({ permissions, ...props }) =>
    <Edit title={<UserTitle />} {...props}>
        <TabbedForm defaultValue={{ role: 'user' }}>
            <FormTab label="user.form.summary">
                {permissions === 'admin' && <DisabledInput source="id" />}
                <TextInput source="name" validate={required()} />
            </FormTab>
            {permissions === 'admin' &&
            <FormTab label="user.form.security">
                <TextInput source="role" validate={required()} />
            </FormTab>}
        </TabbedForm>
    </Edit>
;
