import React from "react";
import Page from 'layouts/Page';
import Form from './form_user_login';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import Loading from 'components/Loading';
import { apiGet , apiPost , msgdialog } from 'app';
import { Button } from 'reactstrap';

class Listuserlogin extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading: true,
      modal: false,
      flag:0,
      edit:[],
      level:[]
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
    apiGet('user_login/result_data_user_login')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentWillMount(){
    this.getData();
    apiGet('user_level/result_data_user_level')
    .then(res =>{
      this.setState({ level: res});
    })
  }

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('user_login/hapus' , { id: id })
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

  render() {

    let { data , loading, modal, edit , flag , level } = this.state;

    if (loading){
      return(
        <Page title={'User Login'}>
          <Loading active={loading} />
        </Page>
      ) 
    }

    return (
      <Page title={'User Login'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form mode={this.mode} modal={modal} edit={edit} flag={flag} getData={this.getData} count={data.length} level={level} />
         <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
              dataField: 'kode_operator',
              text: 'Kode'
            },
            {
                dataField: 'username',
                text: 'Username'
            },
            {
              dataField: 'password',
              text: 'Password'
            },
            {
              dataField: 'tingkatan',
              text: 'User Level'
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

export default Listuserlogin;
