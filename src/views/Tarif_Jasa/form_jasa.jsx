import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label } from 'reactstrap';
import Select from 'react-select';
import { inputRupiah , rupiahToNumber , formatRupiah } from 'app';
import { apiPost } from 'app';
import serialize from 'form-serialize';
import dt from 'moment';

export default class form_jasa extends Component {
    constructor(){
        super()
        this.state={}

        this.save = this.save.bind(this);
    }

    save(){
        let data =  serialize(document.getElementById('pelanggan') ,{hash: true});
        let proses = {
            harga_jual: rupiahToNumber(data.harga_jual),
            hpp: rupiahToNumber(data.hpp),
            jenis: data.jenis,
            kode_jasa: data.kode_jasa,
            nama_jasa: data.nama_jasa,
            satuan: data.satuan
        }
 
        if(this.props.flag === 1){
            proses.id = this.props.edit.id;
            apiPost('harga_jasa/edit' ,proses)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }else{
            apiPost('harga_jasa/tambah' ,proses)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }
    }
    render() {
        let { modal , mode ,edit , flag , count , satuan , jenis } = this.props;
        let tanggal = dt(new Date()).format('l').replace('/','').replace('/','');

        return (
            <div>
                <Modal title={'Form Jasa'} modal={modal} mode={mode} idform={'pelanggan'} action={this.save}>
                    {
                        flag === 1 ? 
                        <div>
                            <FormGroup>
                                <Label for='kode_jasa'>Kode Jasa</Label>
                                <Input type='text' name='kode_jasa' readOnly defaultValue={edit.kode_jasa}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_jasa'>Nama Jasa</Label>
                                <Input type='text' name='nama_jasa' defaultValue={edit.nama_jasa}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='jenis'>Jenis</Label>
                                <Select className='select' defaultValue={{  value: edit.jenis , label: edit.jenis }}  options={ jenis.map( x =>({
                                    value: x.jenis,
                                    label: x.jenis
                                }))} 
                                name='jenis'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='satuan'>Satuan</Label>
                                <Select className='select' defaultValue={{  value: edit.satuan , label: edit.satuan }}  options={ satuan.map( x =>({
                                    value: x.satuan,
                                    label: x.satuan
                                }))} 
                                name='satuan'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='hpp'>Harga Pokok</Label>
                                <Input type='text' name='hpp' id='hpp' onKeyUp={(e)=> inputRupiah('hpp',e.target.value) } defaultValue={formatRupiah(edit.hpp ,'')}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='harga_jual'>Harga Jual 1</Label>
                                <Input type='text' name='harga_jual' id='harga_jual' onKeyUp={(e)=> inputRupiah('harga_jual',e.target.value) } defaultValue={formatRupiah(edit.harga_jual,'')}/>
                            </FormGroup>
                        </div>
                        :
                        <div>
                            <FormGroup>
                                <Label for='kode_jasa'>Kode Jasa</Label>
                                <Input type='text' name='kode_jasa' readOnly defaultValue={`HJ-${count+1}${tanggal}`}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_jasa'>Nama Jasa</Label>
                                <Input type='text' name='nama_jasa'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='jenis'>Jenis</Label>
                                <Select className='select'  options={ jenis.map( x =>({
                                    value: x.jenis,
                                    label: x.jenis
                                }))} 
                                name='jenis'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='satuan'>Satuan</Label>
                                <Select className='select'  options={ satuan.map( x =>({
                                    value: x.satuan,
                                    label: x.satuan
                                }))} 
                                name='satuan'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='hpp'>Harga Pokok</Label>
                                <Input type='text' name='hpp' id='hpp' onKeyUp={(e)=> inputRupiah('hpp',e.target.value) }/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='harga_jual'>Harga</Label>
                                <Input type='text' name='harga_jual' id='harga_jual' onKeyUp={(e)=> inputRupiah('harga_jual',e.target.value) }/>
                            </FormGroup>
                        </div>
                    }
                        
                </Modal>
            </div>
        )
    }
}
