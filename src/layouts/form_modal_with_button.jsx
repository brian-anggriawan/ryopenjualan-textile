import React from 'react';
import {
    Button,
    Modal
} from 'reactstrap';

class formModal extends React.Component{
    constructor(){
        super()
        this.state = {
            modal: false
        }

        this.mode = this.mode.bind(this);
    }

    mode(){
        this.setState({ modal : !this.state.modal })
    }

 
    render(){
        let { title , action } = this.props;
        return (
            <React.Fragment>
            <Button color='success' size='sm' className='mb-2' onClick={this.mode}>Tambah</Button>
            <Modal
                className = 'modal-dialog-centered'
                isOpen = {this.state.modal}
            >
                <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                        {title}
                    </h5>
                    <Button
                        aria-label='Close'
                        className='close'
                        data-dismiss ='modal'
                        type ='button'
                        onClick={this.mode}
                    >
                        <span aria-hidden = {true}> x </span>
                    </Button>
                </div>
                <div className='modal-body'>
                    {this.props.children}
                </div>
                <div className='modal-footer'>
                    <Button color='primary' type='button' onClick={action}>Simpan</Button>
                    <Button color='secondary' data-dismiss='modal' type='button' onClick={this.mode}>Close</Button>
                </div>
            </Modal>
            </React.Fragment>
        )
    }
}

export default formModal;