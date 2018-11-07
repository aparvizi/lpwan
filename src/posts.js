// in src/posts.js
import React from 'react';
//import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import {Create,LongTextInput,SimpleForm,DisabledInput,Edit,List,Show, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

import { Responsive, SimpleList, Filter, ReferenceInput, SelectInput, TextInput,DeleteButton,SimpleShowLayout,RichTextField,NumberField} from 'react-admin';


import Button from '@material-ui/core/Button';
import { CardActions, ShowButton } from '@material-ui/core/CardActions';


const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const PostShowActions = ({ permissions, basePath, data, resource }) => (
    <CardActions style={cardActionStyle}>
        <EditButton basePath={basePath} record={data} />
        {permissions === 'admin' &&
        <DeleteButton basePath={basePath} record={data} resource={resource} />
        }
    </CardActions>
);


export const PostShow = ({ permissions, ...props }) => (
    <Show actions={<PostShowActions permissions={permissions} />} {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <RichTextField source="body" />
            {permissions === 'admin' &&
            <NumberField source="nb_views" />
            }
        </SimpleShowLayout>
    </Show>
);



class customAction extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log('this is:', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}




const PostEditActions = ({ basePath, data, resource }) => (
    <CardActions>
        <ShowButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button color="primary" onClick={customAction}>Custom Action</Button>
    </CardActions>
);



const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};


const PostFilter = (props) => (
    <Filter {...props} >
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);


export const PostList = props => (
    <List {...props} filters={<PostFilter />}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="body" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

export const PostEdit = props => (
    <Edit actions={<PostEditActions />}   title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);
