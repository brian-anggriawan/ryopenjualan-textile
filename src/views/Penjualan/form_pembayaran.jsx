import Modal from 'layouts/list_modal';
import React, { Component } from 'react';
import { FormGroup , Label , Input ,Button , Form } from 'reactstrap';
import Serialize from 'form-serialize';
import Select from 'react-select';
import { inputRupiah , rupiahToNumber ,formatRupiah , apiPostPenjualan , urlServer , msgerror , dataUser} from 'app';
import Loading from 'components/Loading';

export default class form_pembayaran extends Component {
    constructor(){
        super()
        this.state ={
            flagnorek: false,
            kredit: false,
            diskon: '',
            loading:false
        }
        this.simpan = this.simpan.bind(this);
        this.cara = this.cara.bind(this);
        this.metode = this.metode.bind(this);
        this.hitungDiskon = this.hitungDiskon.bind(this);
        this.metodDiskon = this.metodDiskon.bind(this)
    }

    cara(e){
        if (e.value === 'KREDIT') {
            this.setState({ flagnorek: false , kredit: true  }); 
        }else{
            this.setState({ flagnorek: false , kredit: false }) 
        }
    }

    metode(e){
        if (e.value === 'TRANSFER' || e.value === 'EDC') {
            this.setState({ flagnorek: true , kredit: false });
        }else{
            this.setState({ flagnorek: false , kredit: false })   
        }
    }

    simpan(){
        let { header , detail , clear } = this.props;
        let { diskon } = this.state;
        let data = Serialize(document.getElementById('pembayaran') ,{ hash: true });
        let cek  = data.cara_bayar;

        this.setState({ loading: true });

        if (cek === 'KREDIT') {
            let bayar = parseInt(rupiahToNumber(data.bayar || '0'));
            let proses = (50 / 100) * header.total_harga;
            
            if (proses > bayar && dataUser().tingkatan !== 'Owner' ) {
                msgerror('Diskon Hanya Boleh Minimal 50%')
            }else{
                header.cara_bayar = data.cara_bayar || '0';
                header.nama_bank = data.nama_bank || '0';
                header.bayar = rupiahToNumber(data.bayar || '0');
                header.kembali = '-'+rupiahToNumber(data.kembali || '0');
                header.tanggal_jam_ambil = data.tanggal_ambil || '0';
                header.metode_pembayaran = data.metode_pembayaran || '0';
                header.total_harga = rupiahToNumber(data.total_harga || '0');
                header.diskon = diskon === 'Nominal' ? rupiahToNumber(data.diskon) : diskon === 'Persen' ? data.diskon : '0';
                header.detail = detail;
                apiPostPenjualan('penjualan/tambah' , header)
                    .then(res =>{
                        if (res.result === 'true') {
                            window.open(`${urlServer}/penjualan/cetak_nota/${res.id_penjualan}`,'_blank');
                            this.setState({ loading: false });
                            clear();   
                        }      
                    })
            }
        }else{

            let cekBayar = rupiahToNumber(data.bayar || '0');
            let cekTotal = rupiahToNumber(data.total_harga || '0');

            if (parseInt(cekBayar) >= parseInt(cekTotal)) {
                header.cara_bayar = data.cara_bayar || '0';
                header.nama_bank = data.nama_bank || '0';
                header.bayar = rupiahToNumber(data.bayar || '0');
                header.kembali = rupiahToNumber(data.kembali || '0');
                header.tanggal_jam_ambil = data.tanggal_ambil || '0';
                header.metode_pembayaran = data.metode_pembayaran || '0';
                header.total_harga = rupiahToNumber(data.total_harga || '0');
                header.diskon = diskon === 'Nominal' ? rupiahToNumber(data.diskon) : diskon === 'Persen' ? data.diskon : '0';
                header.detail = detail;
                apiPostPenjualan('penjualan/tambah' , header)
                    .then(res =>{
                        if (res.result === 'true') {
                            window.open(`${urlServer}/penjualan/cetak_nota/${res.id_penjualan}`,'_blank');
                            this.setState({ loading: false });
                            clear();   
                        }      
                    })
            }else{
                this.setState({ loading: false });
                msgerror('Uang Pembayaran Masih Kurang');
                
            }
        }
        
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

    metodDiskon(e){
        document.getElementById('total_harga').value = formatRupiah(this.props.header.total_harga.toString(),'');
        if (e.value ==='Nominal') {
           this.setState({ diskon: 'Nominal'}) 
        }else{
            this.setState({ diskon: 'Persen'})  
        }
    }

    hitungDiskon(flag , value){
        if (flag === 1) {
            inputRupiah('nominal' , value);
            let hasil = parseInt(rupiahToNumber(value)) - this.props.header.total_harga;
            document.getElementById('total_harga').value = formatRupiah(hasil.toString() ,'');
        }else{
            let nilaiDiskon = ( value / 100) * this.props.header.total_harga;
            let hasil = this.props.header.total_harga - nilaiDiskon;
            document.getElementById('total_harga').value = formatRupiah(hasil.toString() ,'')
        }
    }


    render() {
        let { modal , mode , header } = this.props;
        let { flagnorek , kredit , diskon , loading } = this.state;

        let total_harga = formatRupiah((header.total_harga || '0').toString(),'');
        
        return (
            <Modal modal={modal} mode={mode} title={'Pembayaran'}>
                {
                    loading ? <Loading active={loading} /> 
                    
                    :
                    <Form id='pembayaran'>
                    <FormGroup>
                        <Label>Tanggal Pengambilan</Label>
                        <Input autoFocus={true} type='text' name='tanggal_ambil'  tabIndex='1'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='cara_bayar'>Pembayaran</Label>
                        <Select 
                            options={[
                                {
                                    label: 'LUNAS',
                                    value:'LUNAS'
                                },
                                {
                                    label: 'KREDIT',
                                    value:'KREDIT'
                                }
                            ]}
                        name='cara_bayar' id='cara_bayar' tabIndex= '3' onChange={this.cara} className='select'/>
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
                        name='metode_pembayaran' id='metode_pembayaran' tabIndex= '4' onChange={this.metode} className='select'/>
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
                                name='nama_bank' id='nama_bank' tabIndex= '5'  className='select'/>
                        </FormGroup> 
                        : ''

                    }
                    {
                        dataUser().tingkatan === 'Owner' ?
                        <FormGroup>
                            <Label for='type_diskon'>Metode Diskon</Label>
                            <Select 
                                options={[
                                    {
                                        label: 'Nominal',
                                        value:'Nominal'
                                    },
                                    {
                                        label: 'Persen',
                                        value:'Persen'
                                    }
                                ]}
                            name='type_diskon' tabIndex= '6' onChange={this.metodDiskon} className='select'/>
                        </FormGroup>
                        : ''
                    }
                    {
                        diskon === 'Nominal' ?
                        <FormGroup>
                            <Label for='diskon'>Nominal</Label>
                            <Input type='text' name='diskon' id='nominal' tabIndex='7' onKeyUp={(e)=>this.hitungDiskon(1 , e.target.value)} />
                        </FormGroup>
                        : diskon === 'Persen' ?
                        <FormGroup>
                            <Label for='diskon'>Persen</Label>
                            <Input type='number' name='diskon' tabIndex='7' onKeyUp={(e)=> this.hitungDiskon(2 , e.target.value)} />
                        </FormGroup>
                        :''
                    }
                    {
                        kredit ?
                        <div>
                            <FormGroup>
                                <Label for='bayar'>Bayar</Label> 
                                <Input type='text' name='bayar' id='bayar' tabIndex='6' onKeyUp={(e)=> this.kredit(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='total_harga'>Total Harga</Label>
                                <Input type='text' name='total_harga' id='total_harga' defaultValue={total_harga} tabIndex='7' readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='kembali'>Sisa Bayar</Label>
                                <Input type='text' name='kembali' id='kembali' tabIndex='8' readOnly/>
                            </FormGroup>
                        </div>
                        :
                        <div>
                            <FormGroup>
                                <Label for='bayar'>Bayar</Label> 
                                <Input type='text' name='bayar' id='bayar' tabIndex='6' onKeyUp={(e)=> this.bayar(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='total_harga'>Total Harga</Label>
                                <Input type='text' name='total_harga' id='total_harga' defaultValue={total_harga} tabIndex='7' readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='kembali'>Kembalian</Label>
                                <Input type='text' name='kembali' id='kembali' tabIndex='8' readOnly/>
                            </FormGroup>
                        </div>
                    }  
                   
                    <hr />
                    <Button type='button' color='success' tabIndex='6' onClick={this.simpan} size='sm' style={{ width: '100%'}}>Bayar</Button>
                </Form>

                }
                
            </Modal>
        )
    }
}
