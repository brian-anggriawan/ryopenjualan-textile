import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel';
import { Input , Button , Form , FormGroup , Label} from 'reactstrap';
import { formatRupiah , inputRupiah, rupiahToNumber , apiPost , apiGet1} from 'app';
import Serialize from 'form-serialize';
import Loading from 'components/Loading';

export default class form_hutang extends Component {
    constructor(){
        super()
        this.state={}

        this.save = this.save.bind(this);
        this.check = this.check.bind(this);
    }

    format(value){
        return formatRupiah(value ,'')
    }

    save(){
        this.props.setloading();
        let data = Serialize(document.getElementById('save') , {hash: true });
        let { nota } = this.props;
        let bayar = parseInt(rupiahToNumber(data.bayar));
        let sisa = (parseInt(nota.kembali) - bayar);

        data.id_penjualan = nota.id;
        data.no_nota = nota.no_nota;
        data.kode_pelanggan = nota.kode_pelanggan;
        data.nama_pelanggan = nota.nama_pelanggan;
        data.bayar = bayar;
        data.sisa = sisa;
        data.kembali = nota.kembali;

        apiPost('pembayaran_hutang/tambah' ,data);
        
        apiGet1('pembayaran_hutang/row_data_pembayaran_hutang' , nota.id)
        .then(res =>{
            this.props.refreshAll();
            this.props.refresh(res);
            this.props.mode();
        });
    }

    check(){
        let cek = document.getElementById('lunas').checked;

        if (cek) {
            document.getElementById('bayar').value = formatRupiah(this.props.nota.kembali.toString() ,'');
        }else{
            document.getElementById('bayar').value = formatRupiah('0','')
        }
    }

    render() {
        let { modal , mode , title , dataBayar ,loading , flag } = this.props;
        return (
            <Modal modal={modal} mode={mode} title={title} >
                {
                    flag === 1 ?
                    <div>
                         <Form id='save'>
                            <Input type='text' name='bayar' className='mb-3' id='bayar' onKeyUp={(e)=> inputRupiah('bayar' , e.target.value)} />
                        </Form>
                        <FormGroup className='ml-4'>
                            <Input className="custom-control-input" type='checkbox' name='lunas' id='lunas' onChange={this.check} />
                            <Label className="custom-control-label" htmlFor='lunas'>Lunas</Label>
                        </FormGroup>
                        <Button type='button' color='success' size='sm' style={{width: '100%'}} onClick={this.save}>Bayar</Button>
                        <hr />
                    
                        { loading ? <Loading active={loading} />
                            :
                            <Tabel
                                data ={[dataBayar]}
                                keyField = {'id'}
                                columns ={[
                                    {
                                        dataField: 'tanggal',
                                        text: 'Tanggal'
                                    },
                                    {
                                        dataField: 'bayar',
                                        text: 'Bayar',
                                        formatter: this.format
                                    },
                                    {
                                        dataField: 'sisa',
                                        text: 'Sisa',
                                        formatter: this.format
                                    }
                                ]}                            
                                    width={{ width:'300px'}}
                                />

                            }

                    </div> 
                    : flag === 2 ?
                        <Tabel
                            data ={[dataBayar]}
                            keyField = {'id'}
                            columns ={[
                                {
                                        dataField: 'tanggal',
                                        text: 'Tanggal'
                                },
                                {
                                        dataField: 'bayar',
                                        text: 'Bayar',
                                        formatter: this.format
                                },
                                {
                                        dataField: 'sisa',
                                        text: 'Sisa',
                                        formatter: this.format
                                }
                            ]}                            
                            width={{ width:'300px'}}
                        /> :''


                }
                
            </Modal>
        )
    }
}
