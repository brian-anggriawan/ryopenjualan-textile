import React from "react";
import Page from 'layouts/Page';
import Form from './form_pengeluaran';
import Tabel from 'components/tabel';
import Loading from 'components/Loading';
import { apiGet , dataUser , msgdialog , apiPost } from 'app';
import { Button } from 'reactstrap';
import { formatRupiah } from 'app';
import ButtonAction from 'components/ButtonAction';
import Formedit from './form_edit_pemasukkan';

class Listpemasukkan extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading: true,
      modal: false,
      modal2: false,
      edit:[]
    }
    this.mode = this.mode.bind(this);
    this.tambah = this.tambah.bind(this);
    this.getData = this.getData.bind(this);
    this.button = this.button.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.mode2 = this.mode2.bind(this);
    this.getData2 = this.getData2.bind(this);
  }

  mode(){
    this.setState({ modal: !this.state.modal })
  }

  mode2(){
    this.setState({ modal2: !this.state.modal2})
  }

  getData(){
    this.setState({ modal: false , loading: true });
    apiGet('pemasukan/result_data_pemasukan')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  getData2(){
    this.setState({ modal2: false , loading: true });
    apiGet('pemasukan/result_data_pemasukan')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentWillMount(){
    this.getData();
  }

  tambah(){
    this.mode();
    this.setState({ flag: 0 })
  }

  nominal(nilai){
    return formatRupiah(nilai ,'')
  }

  button(id){
    if (dataUser().tingkatan === 'Owner') {
      return <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)}  /> 
    }else{
      return <Button type='button' size='sm' color='danger'>No Access</Button>
    }
  }

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('pemasukan/hapus' , { id: id })
          .then( res =>{
            if (res) {
              this.getData();
            }
          })
        }
      })
  }

  edit(id){
    let data = this.state.data.filter(x => x.id === id)[0];

    this.setState({ edit: data });
    this.mode2();
  }

  render() {
    let { data , loading, modal , modal2 , edit } = this.state;

    if (loading){
      return(
        <Page title={'Pemasukkan'}>
          <Loading active={loading} />
        </Page>
      ) 
    }

    return (
      <Page title={'Pemasukkan'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form  mode={this.mode} modal={modal}  getData={this.getData} />
        <Formedit mode={this.mode2} modal={modal2} data={edit} getData={this.getData2}  />
         <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'tanggal',
                text: 'Tanggal'
            },
            {
              dataField: 'jam',
              text: 'Jam'
            },
            {
              dataField: 'operator',
              text: 'Operator'
            },
            {
              dataField: 'nama_acc',
              text: 'Jenis Biaya'
            },
            {
              dataField: 'keterangan',
              text: 'Keterangan'
            },
            {
              dataField: 'jumlah',
              formatter: this.nominal,
              text: 'Jumlah'
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

export default Listpemasukkan;
