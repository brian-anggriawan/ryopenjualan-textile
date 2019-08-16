import React from "react";
import Page from 'layouts/Page';
import Form from './form_jasa';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import Loading from 'components/Loading';
import { Button } from 'reactstrap';
import { apiGet , apiPost , msgdialog , formatRupiah , dataUser } from 'app';
import XlsExport from 'xlsexport';

class Listtarif extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      satuan:[],
      jenis:[],
      loading: true,
      modal: false,
      flag:0,
      edit:[]
    }
    this.mode = this.mode.bind(this);
    this.tambah = this.tambah.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.button = this.button.bind(this);
    this.getData = this.getData.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
  }

  mode(){
    this.setState({ modal: !this.state.modal })
  }

  getData(){
    this.setState({ modal: false , loading: true });
    apiGet('harga_jasa/result_harga_jasa')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentDidMount(){
    this.getData();

     /* data satuan */
     apiGet('satuan/result_data_satuan')
     .then(res =>{
       this.setState({ satuan: res})
     })
    /* data satuan */

    /* data jenis */
        apiGet('kategori_jasa/result_data_kategori_jasa')
          .then(res =>{
            this.setState({ jenis: res })
          })
    /* data jenis */
  }

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('harga_jasa/hapus' , { id: id })
          .then( res =>{
            if (res) {
              this.getData();
            }
          })
        }
      })
  }

  button(id){
    return  dataUser().tingkatan === 'Owner' ? <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)}  />
            : <Button type='button' color='danger' size='sm'>No Access</Button>
  }

  tambah(){
    this.mode();
    this.setState({ flag: 0 })
  }

  edit(id){
    let data = this.state.data.filter( x => x.id === id)[0];
    this.setState({ edit: data , flag: 1 });
    this.mode();
  }

  formatuang(nilai){
    return formatRupiah(nilai,'')
  }

  exportExcel(){
    let data = [];
    this.state.data.map(x =>(
      data.push({
        kode_jasa: x.kode_jasa,
        nama_jasa: x.nama_jasa,
        jenis: x.jenis,
        satuan: x.satuan,
        harga_jual1: x.harga,
      })
    ))
    let xls = new XlsExport( data, 'dataJasa');
    xls.exportToXLS('dataHargaJasa.xls');
  }

  render() {
    let { data , loading, modal, edit , flag , satuan , jenis} = this.state;

    if (loading){
      return(
        <Page title={'Harga Jasa'}>
          <Loading active={loading} />
        </Page>
      ) 
    }
    return (
      <Page title={'Harga Jasa'}>
        <Form mode={this.mode} modal={modal} edit={edit} flag={flag} getData={this.getData} count={data.length} satuan={satuan} jenis={jenis} />
        {
          dataUser().tingkatan === 'Owner' ?
          <div>
              <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
              <Button type='button' size='sm' color='success' onClick={this.exportExcel}>Export Excel</Button>
              {/* <Button type='button' size='sm' color='info'>Import</Button>
              <Button type='button' size='sm' color='danger'>Hapus Semua</Button> */}
          </div>
          :
          <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        }
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
              dataField: 'kode_jasa',
              text: 'Kode'
            },
            {
                dataField: 'nama_jasa',
                text: 'Jasa'
            },
            {
                dataField: 'jenis',
                text: 'Jenis'
            },
            {
              dataField: 'satuan',
              text: 'Satuan'
            },
            {
              dataField: 'hpp',
              formatter: this.formatuang,
              text: 'HPP'
            },
            {
              dataField: 'harga_jual',
              formatter: this.formatuang,
              text: 'Harga'
            },
            {
              dataField: 'id',
              formatter: this.button,
              text: 'Action'
            }
          ]}                            
            width={{ width:'300px'}}
          />
      </Page>
    );
  }
}

export default Listtarif;
