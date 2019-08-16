import React from 'react';
import {
    Button,
    Modal,
    Form
} from 'reactstrap';


class formModal extends React.Component{
    render(){
        return (
            <React.Fragment>
            <Modal
                className = 'modal-dialog-centered'
                isOpen = {this.props.modal}
                autoFocus={false}
            >
                <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                        {this.props.title}
                    </h5>
                    <Button
                        aria-label='Close'
                        className='close'
                        data-dismiss ='modal'
                        type ='button'
                        onClick={this.props.mode}
                    >
                        <span aria-hidden = {true}> x </span>
                    </Button>
                </div>
                <Form id={this.props.idform} autoFocus={false}> 
                    <div className='modal-body'>
                        {this.props.children}
                    </div>
                    <div className='modal-footer'>
                        <Button color='primary' type='button' onClick={this.props.action}>Simpan</Button>
                        <Button color='secondary' data-dismiss='modal' type='button' onClick={this.props.mode}>Close</Button>
                    </div>
                </Form> 
            </Modal>
            </React.Fragment>
        )
    }
}

export default formModal;