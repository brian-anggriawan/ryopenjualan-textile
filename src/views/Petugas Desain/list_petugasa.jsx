import React from "react";
import Page from 'layouts/Page';
import Form from './form_petugas';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';import Loading from 'components/Loading';
import { apiGet , apiPost , msgdialog , formatPersen} from 'app';
import { Button } from 'reactstrap';

class Listpetugas extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
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
  }
  
  mode(){
    this.setState({ modal: !this.state.modal })
  }

  getData(){
    this.setState({ modal: false , loading: true });
    apiGet('petugas/result_data_petugas')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentWillMount(){
    this.getData();
  }

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('petugas/hapus' , { id: id })
          .then( res =>{
            if (res) {
              this.getData();
            }
          })
        }
      })
  }

  button(id){
    return <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)}  />
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

  persen(nilai){
    return formatPersen(nilai)
  }

  render() {

    let { data , loading, modal, edit , flag } = this.state;

    if (loading){
      return(
        <Page title={'Petugas Desain'}>
          <Loading active={loading} />
        </Page>
      ) 
    }
    return (
      <Page title={'Petugas Desain'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form mode={this.mode} modal={modal} edit={edit} flag={flag} getData={this.getData} count={data.length}/>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
              dataField: 'kode_petugas',
              text: 'Kode Petugas'
            },
            {
                dataField: 'nama_petugas',
                text: 'Nama'
            },
            {
                dataField: 'bonus',
                formatter: this.persen,
                text: 'Bonus'
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

export default Listpetugas;
