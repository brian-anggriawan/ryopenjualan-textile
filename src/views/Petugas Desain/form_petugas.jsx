import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label } from 'reactstrap';
import serialize from 'form-serialize';
import { apiPost , inputPersen , persenToNumber , formatPersen } from 'app';
import dt from 'moment';

export default class form_petugas extends Component {
    constructor(){
        super()
        this.state={

        }
        this.save = this.save.bind(this);
    }

    save(){
        let data =  serialize(document.getElementById('petugas') ,{hash: true});
        let proses = {
            bonus: persenToNumber(data.bonus),
            kode_petugas: data.kode_petugas,
            nama_petugas: data.nama_petugas
        }
 
        if(this.props.flag === 1){
            proses.id = this.props.edit.id;
            apiPost('petugas/edit' ,proses)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }else{
            apiPost('petugas/tambah' ,proses)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }
     }
    render() {
        let { modal , mode ,edit , flag , count } = this.props;
        let tanggal = dt(new Date()).format('l').replace('/','').replace('/','');
        return (
            <div>
                <Modal title={'Form Petugas Desain'} modal={modal} mode={mode} idform={'petugas'} action={this.save}>
                    {
                        flag === 1 ?
                        <div>
                            <FormGroup>
                                <Label for='kode_petugas'>Kode Petugas</Label>
                                <Input type='text' name='kode_petugas' readOnly defaultValue={edit.kode_petugas}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_petugas'>Nama</Label>
                                <Input type='text' name='nama_petugas' defaultValue={edit.nama_petugas}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='bonus'>Bonus / (Persen)</Label>
                                <Input type='text' name='bonus' id='bonus' onKeyUp={(e)=> inputPersen('bonus',e.target.value)} defaultValue={formatPersen(edit.bonus)}/>
                            </FormGroup>
                        </div>
                        :
                        <div>
                            <FormGroup>
                                <Label for='kode_petugas'>Kode Petugas</Label>
                                <Input type='text' name='kode_petugas' readOnly defaultValue={`PTG-${count+1}${tanggal}`}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_petugas'>Nama</Label>
                                <Input type='text' name='nama_petugas'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='bonus'>Bonus / (Persen)</Label>
                                <Input type='text' name='bonus' id='bonus' onKeyUp={(e)=> inputPersen('bonus',e.target.value)}/>
                            </FormGroup>
                        </div>
                    }
                        
                </Modal>
            </div>
        )
    }
}
