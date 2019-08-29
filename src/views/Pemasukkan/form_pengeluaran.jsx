import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import { Input , FormGroup , Label , Form ,Button , Table  } from 'reactstrap';
import Select from 'react-select';
import serialize from 'form-serialize';
import { apiPost  , apiGet , inputRupiah ,formatRupiah , formatTanggal , rupiahToNumber ,dataUser} from 'app';
import cuid from 'cuid';
import Loading from 'components/Loading';
import { IoMdTrash } from 'react-icons/io';

export default class form_pemasukkan extends Component {
    constructor(){
        super()
        this.state={
            jenis:[],
            row:[],
            total:0,
            loading: false
        }
        
        this.save = this.save.bind(this);
        this.addRow = this.addRow.bind(this);
        this.dinamicRow = this.dinamicRow.bind(this);
        this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    addRow(){
        let { row } = this.state;
        let id = cuid(10);
        let tanggal = new Date();
        let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;

        let copy = [ ...row];
            copy.push(
                <tr key={id}>
                    <td>
                        <Input type='text' name={`keterangan${id}`} tabIndex={index + 1} />
                    </td>
                    <td>
                        <Input type='text' name={`jumlah${id}`} id={`jumlah${id}`} tabIndex={index + 2 } onKeyUp={(e)=> this.dinamicRow(e.keyCode , id ,e.target.value)} />
                    </td>
                    <td>
                        <Button color='danger' size='sm' onClick={()=> this.deleteRow(id)} tabIndex='0'><IoMdTrash /></Button>
                    </td>
                </tr>
            )
        this.setState({ row: copy });
    }

    dinamicRow(e ,id , value){
        inputRupiah(`jumlah${id}`,value);
        let index = this.state.row.findIndex( x => x.key === id) + 1;
        let count = this.state.row.length;

        if (e === 13 && index === count) {
            this.addRow();
        }

        this.hitungTotalHarga();
    }

    hitungTotalHarga(){
        let detail = document.getElementById('detail');
        let dataDetail = serialize( detail , { hash : true });
        let nilai = 0
        for( let i = 0; i < this.state.row.length; i++){
          
          let cek = rupiahToNumber(dataDetail[`jumlah${this.state.row[i].key}`]);      
          nilai += parseInt(cek);
          
        }
        this.setState({ total: nilai });
      }

    componentDidMount(){
        apiGet('jenis_biaya/result_data_jenis_biaya')
        .then(res =>{
          this.setState({ jenis:  res });
        })  
        
       this.addRow();
    }
    
    save(){
        let header =  serialize(document.getElementById('header') ,{hash: true});
        let detail =  serialize(document.getElementById('detail') ,{hash: true});
        let { row } = this.state;
        let arrayDetail = [];
        
        this.setState({ loading: true });
        
        row.map(x => (
            arrayDetail.push({
                tanggal:formatTanggal(new Date()),
                kode_pengeluaran:'0',
                operator: dataUser().username,
                nama_acc:header.nama_acc,
                keterangan: detail[`keterangan${x.key}`] || '',
                jumlah: rupiahToNumber(detail[`jumlah${x.key}`] || '0'),
            })
        ))

        let detail2 = arrayDetail.filter(x => x.keterangan !== '');
        let hasil = {};
        hasil.detail = detail2;

        apiPost('pemasukan/tambah' ,hasil)
            .then(res =>{
                if (res) {
                    this.setState({ loading: true });
                    this.props.getData();
                }
        })  
    }

    deleteRow(id){
        this.setState({row: this.state.row.filter( x => x.key !== id) }) 
    }
    


    render() {
        let { modal , mode } = this.props;
        let { jenis , row , total , loading } = this.state;

        return (
            <div>
                <Modal title={'Form Pemasukkan'} modal={modal} mode={mode} >
                    {
                        loading ? <Loading active={loading} /> :
                        <div>
                            <Form id='header'>
                                <FormGroup>
                                    <Label for='nama_acc'>Jenis Biaya</Label>
                                    <Select autoFocus={true} className='select'  options={jenis.map(x => ({
                                        value: x.kelompok_acc,
                                        label: x.kelompok_acc
                                    }))}
                                    name='nama_acc'/>
                                </FormGroup>
                            </Form>
                            <Form id='detail' className='mb-3'>
                                <Table responsive style={{ width:'100%'}}>
                                    <thead>
                                        <tr>
                                            <th>Keterangan</th>
                                            <th>Nominal</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { row }
                                    </tbody>
                                </Table>
                            </Form>
                            <h3>{`Total : ${formatRupiah(total.toString(),'')}`}</h3>
                            <Button style={{width: '100%'}} color='success' size='sm' onClick={this.save}>Simpan</Button>
                        </div>
                    }
                </Modal>   
            </div>
        )
    }
}
