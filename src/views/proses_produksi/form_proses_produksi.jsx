import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import { Input , Table , Form  } from 'reactstrap';
import cuid from 'cuid';
import { apiGet , apiPost , dataUser } from 'app';
import Select from 'react-select';
import { Button } from 'reactstrap';
import Serialize from 'form-serialize';
import Loading from 'components/Loading';
import { IoMdTrash } from 'react-icons/io';

export default class form_proses_produksi extends Component {
    constructor(){
        super()
        this.state = {
            row:[],
            rowNota: [],
            bahan:[],
            loading: false
        }

        this.addRow = this.addRow.bind(this);
        this.dinamicRow = this.dinamicRow.bind(this);
        this.dinamicRowNota = this.dinamicRowNota.bind(this);
        this.simpan = this.simpan.bind(this);
        this.addRowNota = this.addRowNota.bind(this);
        this.deleteHD = this.deleteHD.bind(this);
        this.deleteDT = this.deleteDT.bind(this);
    }

    addRow(){
        let { row , bahan } = this.state;
        let id = cuid(10);
        let tanggal = new Date();
        let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;

        let copy = [ ...row];
            copy.push(
                <tr key={id}>
                    <td>
                        <Select options={bahan.map(x => ({
                            value: x.nama_jenis_bahan,
                            label: x.nama_jenis_bahan
                            }))}
                        name={`bahan${id}`} className='select' tabIndex={index + 1 } />
                    </td>
                    <td>
                        <Input type='text' name={`area${id}`} tabIndex={index + 2 }/>
                    </td>
                    <td>
                        <Input type='number' name={`jumlah${id}`} tabIndex={index + 3 } />
                    </td>
                    <td>
                        <Input type='number' name={`kesalahan${id}`} tabIndex={index + 4 } onKeyDown={(e)=> this.dinamicRow(e.keyCode , id)} />
                    </td>
                    <td>
                        <Button color='danger' size='sm' onClick={()=> this.deleteHD(id)} tabIndex='0'><IoMdTrash /></Button>
                    </td>
                </tr>
            )
        this.setState({ row: copy });
    }

    addRowNota(){
        let { rowNota } = this.state;
        let { nota } = this.props;
        let id = cuid(10);
        let tanggal = new Date();
        let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;

        let copy = [ ...rowNota];
            copy.push(
                <tr key={id}>
                    <td>
                        <Select options={nota.map(x => ({
                            value: x.no_nota,
                            label: x.no_nota
                            }))}
                        name={`nota${id}`} className='select' tabIndex={index + 1 } onKeyDown={(e)=> this.dinamicRowNota(e.keyCode , id)}/>
                    </td>
                    <td>
                        <Button color='danger' size='sm' onClick={()=> this.deleteDT(id)} tabIndex='0'><IoMdTrash /></Button>
                    </td>
                </tr>
            )
        this.setState({ rowNota: copy });
    }

    dinamicRow(e ,id ){
        let index = this.state.row.findIndex( x => x.key === id) + 1;
        let count = this.state.row.length;

        if (e === 13 && index === count) {
            this.addRow();
        }
    }

    dinamicRowNota(e , id){
        let index = this.state.rowNota.findIndex( x => x.key === id) + 1;
        let count = this.state.rowNota.length;

        if (e === 13 && index === count) {
            this.addRowNota();
        }
    }


    componentDidMount(){
       apiGet('operator_produksi/result_jenis_bahan')
            .then(res =>{
                this.setState({ bahan: res });
                this.addRow();
                this.addRowNota();
            })
       
    }

    simpan(){
        let {  row , rowNota } = this.state;
        let { mode , refresh } = this.props;

        let header = Serialize(document.getElementById('nota') , { hash: true });
        let detail  = Serialize(document.getElementById('detail') , { hash : true });

        let arrayHd = [];
        let arrayDt = [];

        row.map(x => (
            arrayDt.push({
                nama_jenis_bahan:detail[`bahan${x.key}`] || '',
                area_cetak:detail[`area${x.key}`] || '',
                jumlah_cetak:detail[`jumlah${x.key}`] || 0,
                kesalahan:detail[`kesalahan${x.key}`] || 0
            })
        ))

        let dt = arrayDt.filter(x => x.nama_jenis_bahan !== '');



        rowNota.map(x =>(
            arrayHd.push({
                no_nota: header[`nota${x.key}`]
            })  

        ))

        let data = {};
            data.operator = dataUser().username;
            data.header = arrayHd.filter(x => x.no_nota !== undefined);
            data.detail = dt;
        
        apiPost('operator_produksi/tambah' , data)
            .then(res =>{
                if (res) {
                    mode();
                    refresh();
                }
            })


    }

    deleteHD(id){
        this.setState({ row: this.state.row.filter( x => x.key !== id) })
    }

    deleteDT(id){
        this.setState({ rowNota: this.state.rowNota.filter( x => x.key !== id) })
    }

    render() {
        let { mode , modal } = this.props;
        let { row , rowNota , loading  } = this.state;
        return (
            <Modal title={`Proses Produksi Nota`} modal={modal} mode={mode}>
                {
                    loading ? <Loading active={loading} />
                    :
                    <div>
                        <Form id='nota'>
                            <Table style={{ width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>Nota</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { rowNota }
                                </tbody>
                            </Table>
                        </Form>
                        <hr />
                        <Form id='detail'>
                            <Table style={{ width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>Jenis Bahan</th>
                                        <th>Area Cetak</th>
                                        <th>Jumlah Cetak</th>
                                        <th>Kesalahan</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { row }
                                </tbody>
                            </Table>
                        </Form>
                        <Button onClick={this.simpan} color='success' type='button' size='sm' style={{ width: '100%'}}>Simpan</Button>
                    </div>
                }
            </Modal>
        )
    }
}
