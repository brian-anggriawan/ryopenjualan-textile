import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel';
import { Input , Button , Form , FormGroup , Label} from 'reactstrap';
import { formatRupiah , inputRupiah, rupiahToNumber , apiPost , apiGet1} from 'app';
import Serialize from 'form-serialize';
import Loading from 'components/Loading';
import Select from 'react-select';

export default class form_hutang extends Component {
    constructor(){
        super()
        this.state={
            flagnorek: false
        }

        this.save = this.save.bind(this);
        this.check = this.check.bind(this);
        this.metode = this.metode.bind(this);
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
        data.metode_pembayaran = data.metode_pembayaran || '0';
        data.nama_bank = data.nama_bank || '0';

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

    metode(e){
        if (e.value === 'TRANSFER' || e.value === 'EDC') {
            this.setState({ flagnorek: true });
        }else{
            this.setState({ flagnorek: false })   
        }
    }

    render() {
        let { modal , mode , title , dataBayar ,loading , flag } = this.props;
        let { flagnorek } = this.state;
        return (
            <Modal modal={modal} mode={mode} title={title} >
                {
                    flag === 1 ?
                    <div>
                         <Form id='save'>
                             <FormGroup>
                                <Label for='bayar'>Bayar</Label>
                                <Input type='text' autoFocus={true} name='bayar' className='mb-3' id='bayar' onKeyUp={(e)=> inputRupiah('bayar' , e.target.value)} />
                             </FormGroup>
                             <FormGroup>
                                <Label for='metode_pembayaran'>Metode Pembayaran</Label>
                                <Select 
                                    options={[
                                        {
                                            label: 'CASH',
                                            value:'CASH'
                                        },
                                        {
                                            label: 'TRANSFER',
                                            value:'TRANSFER'
                                        },
                                        {
                                            label: 'EDC',
                                            value:'EDC'
                                        }
                                    ]}
                                name='metode_pembayaran' onChange={this.metode} className='select'/>
                             </FormGroup>
                             {
                                 flagnorek ?
                                 <FormGroup>
                                    <Label for='nama_bank'>Nama Bank </Label>
                                    <Select 
                                        options={[
                                            {
                                                label: 'BNI',
                                                value:'BNI'
                                            },
                                            {
                                                label: 'MANDIRI',
                                                value:'MANDIRI'
                                            },
                                            {
                                                label: 'BRI',
                                                value:'BRI'
                                            },
                                            {
                                                label: 'BCA',
                                                value:'BCA'
                                            }
                                        ]}
                                        name='nama_bank' id='nama_bank'  className='select'/>
                                </FormGroup> 
                                : ''
                             }
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
                                data ={dataBayar}
                                keyField = {'id'}
                                columns ={[
                                    {
                                        dataField: 'tanggal',
                                        text: 'Tanggal'
                                    },
                                    {
                                        dataField: 'metode_pembayaran',
                                        text: 'pembayaran'
                                    },
                                    {
                                        dataField: 'nama_bank',
                                        text: 'Bank'
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
                            data ={dataBayar}
                            keyField = {'id'}
                            columns ={[
                                {
                                    dataField: 'tanggal',
                                    text: 'Tanggal'
                                },
                                {
                                    dataField: 'metode_pembayaran',
                                    text: 'pembayaran'
                                },
                                {
                                    dataField: 'nama_bank',
                                    text: 'Bank'
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
