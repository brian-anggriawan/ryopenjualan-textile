import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { FormGroup , Label , Input } from 'reactstrap';
import Select from 'react-select';
import { inputRupiah , apiGet , formatRupiah , rupiahToNumber , apiPost , dataUser} from 'app';
import Serialize from 'form-serialize';

export default class form_edit_pengeluaran extends Component {
    constructor(){
        super()
        this.state = {
            jenis:[]
        }
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        apiGet('jenis_biaya/result_data_jenis_biaya')
        .then(res =>{
          this.setState({ jenis:  res });
        })  
    }

    save(){
        let data = Serialize(document.getElementById('edit') , { hash: true });
        data.id = this.props.data.id;
        data.jumlah = rupiahToNumber(data.jumlah)
        data.operator = dataUser().username;
        data.kode_pengeluaran = '0';


        apiPost('pengeluaran/edit' ,data)
        .then(res =>{
            if (res) {
                this.props.getData();
            }
        })  
    }

    render() {
        let { modal , mode , data } = this.props;
        let { jenis } = this.state;
        return (
            <Modal modal={modal} mode={mode} title={'Edit Pengeluaran'} idform={'edit'} action={this.save}>
                <FormGroup>
                    <Label for='nama_acc'>Jenis Biaya</Label>
                    <Select autoFocus={true} className='select' defaultValue={{ value: data.nama_acc , label: data.nama_acc }}  options={jenis.map(x => ({
                         value: x.kelompok_acc,
                         label: x.kelompok_acc
                    }))}
                    name='nama_acc'/>
                </FormGroup>
                <FormGroup>
                    <Label for='keterangan'>Keterangan</Label>
                    <Input type='text' name='keterangan' defaultValue={data.keterangan} />
                </FormGroup>
                <FormGroup>
                    <Label for='keterangan'>Nominal</Label>
                    <Input type='text' name='jumlah' onKeyUp={(e)=> inputRupiah( 'jumlah',e.target.value)} defaultValue={formatRupiah(data.jumlah || '0' ,'')} />
                </FormGroup>
            </Modal>
        )
    }
}
