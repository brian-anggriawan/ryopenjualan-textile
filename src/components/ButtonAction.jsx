import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { IoMdTrash , IoMdCreate } from 'react-icons/io';

export default class ButtonAction extends Component {
    render() {
        let { edit , hapus } = this.props;
        return (
            <div>
                <Button color='info' size='sm' className='mr-2' onClick={edit}><IoMdCreate /></Button>
                <Button color='danger' size='sm' onClick={hapus}><IoMdTrash /></Button>
            </div>
        )
    }
}
