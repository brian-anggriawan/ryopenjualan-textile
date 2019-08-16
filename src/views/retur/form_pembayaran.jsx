import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import { Input , Button , Form , FormGroup , Label } from 'reactstrap';
import { formatRupiah , inputRupiah , rupiahToNumber  , apiPostPenjualan , urlServer } from 'app';
import Serialize from 'form-serialize';
import Loading from 'components/Loading';

export default class form_pembayaran extends Component {
    constructor(){
        super()
        this.state={
            loading: false
        }

        this.bayar = this.bayar.bind(this);
        this.kredit = this.kredit.bind(this);
        this.simpan = this.simpan.bind(this);
    }

    bayar(value){
        inputRupiah('bayar' , value);
        let total = parseInt(rupiahToNumber(document.getElementById('total_harga').value || '0'));
        
        return document.getElementById('kembali').value = formatRupiah((rupiahToNumber(value) - total).toString(),'');
    }

    kredit(value){
        inputRupiah('bayar',value);
        let total = parseInt(rupiahToNumber(document.getElementById('total_harga').value || '0'));

        return document.getElementById('kembali').value = formatRupiah((total - rupiahToNumber(value)).toString(),'');
    }

    simpan(){
        let { id_penjualan , detail , clear , total ,pembayaran  ,mode , nonota } = this.props;
        let data = Serialize(document.getElementById('header') ,{ hash: true });
        let header = {};

            header.id_penjualan = id_penjualan;
            header.no_nota = nonota;
            header.total_harga = total
            header.bayar = rupiahToNumber(data.bayar || '0');
            header.kembali = pembayaran === '0' ?  rupiahToNumber(data.kembali || '0') : pembayaran === '1' ? '-'+rupiahToNumber(data.kembali || '0') : rupiahToNumber(data.kembali || '0') ;
            header.ket_retur = data.ket_retur;
            header.detail = detail;

            apiPostPenjualan('retur/tambah' , header)
                .then(res =>{
                    if (res.result === 'true') {
                        //window.open(`${urlServer}/penjualan/cetak_nota/${res.id_penjualan}`,'MsgWindow', 'width=4000,height=4000');
                        window.open(`${urlServer}/penjualan/cetak_nota/${res.id_penjualan}`,'_blank');
                        clear();
                        mode();   
                    }      
                })
        }
    
    render() {
        let { mode , modal , pembayaran  , total } = this.props;
        let { loading } = this.state;
        let total_harga = formatRupiah((total || '0').toString(),'');


        return (
            <Modal title={'Form Pembayaran'} mode={mode} modal={modal}>
                {
                    loading ? <Loading active={true} />
                    :

                    <Form id='header'>
                    {
                        pembayaran === '0' ?
                        <FormGroup>
                            <Label for='bayar'>Bayar</Label> 
                            <Input type='text' name='bayar' autoFocus={true} id='bayar' tabIndex='1' onKeyUp={(e)=> this.bayar(e.target.value)}/>
                        </FormGroup>

                        : pembayaran === '1' ?
                        <FormGroup>
                                <Label for='bayar'>Bayar</Label> 
                                <Input type='text' name='bayar' autoFocus={true} id='bayar' tabIndex='1' onKeyUp={(e)=> this.kredit(e.target.value)}/>
                        </FormGroup>
                        : ''
                    }
                         <FormGroup>
                            <Label for='ket_retur'>Keterangan</Label>
                            <Input type='text' name='ket_retur' tabIndex='2'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='total_harga'>Total Harga</Label>
                            <Input type='text' name='total_harga' id='total_harga' defaultValue={total_harga} tabIndex='3' readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='kembali'>Sisa Bayar</Label>
                            <Input type='text' name='kembali' id='kembali' tabIndex='4' readOnly/>
                        </FormGroup>
                        <hr />
                    <Button type='button' color='success' tabIndex='6' onClick={this.simpan} size='sm' style={{ width: '100%'}}>Bayar</Button>
                    </Form>

                }
            </Modal>
        )
    }
}
