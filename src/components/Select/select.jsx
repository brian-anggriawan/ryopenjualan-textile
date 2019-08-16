import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import './select.css';



export default class select extends Component {
    render() {
        let { text , data , change , index , name } = this.props;
        return (
            <Dropdown
                placeholder={text}
                fluid
                search
                clearable
                selection
                options={data}
                onChange={change}
                id='selectbrian'
                tabIndex={index}
                name={name}
            />
        )
    }
}
