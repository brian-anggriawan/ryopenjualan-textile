import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label  } from 'reactstrap';
import Select from 'react-select';
import { apiPost } from 'app';
import serialize from 'form-serialize';
import dt from 'moment';

export default class form_user_login extends Component {
    constructor(){
        super()
        this.state={

        }
        this.save = this.save.bind(this);
    }

    save(){
        let data =  serialize(document.getElementById('user_login') ,{hash: true});
 
        if(this.props.flag === 1){
            data.id = this.props.edit.id;
            apiPost('user_login/edit' ,data)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }else{
            apiPost('user_login/tambah' ,data)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }
     }
     
    render() {
        let { modal , mode ,edit , flag , count , level } = this.props;
        let tanggal = dt(new Date()).format('l').replace('/','').replace('/','');

        return (
            <Modal title={'Form User'} modal={modal} mode={mode} idform={'user_login'} action={this.save}>
                {
                    flag === 1 ? 
                    <div>
                            <FormGroup>
                                <Label for='kode_operator'>Kode Operator</Label>
                                <Input type='text' name='kode_operator' readOnly defaultValue={edit.kode_operator} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='username'>Username</Label>
                                <Input type='text' name='username' defaultValue={edit.username}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='tingkatan'>User Level</Label>
                                <Select defaultValue={{ value: edit.tingkatan, label: edit.tingkatan }} options={ level.map(x =>({
                                    value: x.user_level,
                                    label: x.user_level
                                }))} name='tingkatan' className='select'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input type='password' name='password' id='password' defaultValue={edit.password}/>
                            </FormGroup>
                    </div>
                    :
                    <div>
                            <FormGroup>
                                <Label for='kode_operator'>Kode Operator</Label>
                                <Input type='text' name='kode_operator' readOnly defaultValue={`USR-${count+1}${tanggal}`} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='username'>Username</Label>
                                <Input type='text' name='username'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='tingkatan'>User Level</Label>
                                <Select options={ level.map(x =>({
                                    value: x.user_level,
                                    label: x.user_level
                                }))} name='tingkatan' className='select'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input type='password' name='password' id='password'/>
                            </FormGroup>
                    </div>
                    
                }
            </Modal>
        )
    }
}
