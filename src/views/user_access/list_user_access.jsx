import React from "react";
import Page from 'layouts/Page';
import { Button , Row ,Col} from 'reactstrap';
import Tabel from 'components/tabel';
import { IoMdTrash } from 'react-icons/io';
import List from './list_menu';
import { apiGet , apiPostGet , msgdialog , apiPost ,msgerror} from 'app';
import Select from 'react-select';
import Loading from 'components/Loading';
import menu from './menu';


class Listuseraccess extends React.Component {
  constructor(){
    super()
    this.state = {
      modal: false,
      userlevel:[],
      access:[],
      loading: false,
      dataMenu:[],
      user:'',
      loading2: false
    }

    this.mode = this.mode.bind(this);
    this.handleChane = this.handleChane.bind(this);
    this.button = this.button.bind(this);
    this.delete = this.delete.bind(this);
    this.refresh = this.refresh.bind(this);
    this.tambah = this.tambah.bind(this);
    this.prosesSave = this.prosesSave.bind(this);
  }

  componentDidMount(){
      apiGet('user_level/result_data_user_level')
      .then(res =>{
        this.setState({ userlevel : res});
      })
  }

  button(id){
    return <Button color='danger' onClick={()=> this.delete(id)} size='sm'><IoMdTrash /></Button>
  }


  mode(){
    this.setState({ modal : !this.state.modal})
  }

  delete(id){
    let { user } = this.state;
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('list_menu/hapus' , { id: id })
          .then( res =>{
            if (res) {
              apiPostGet('list_menu/row_list_menu' ,{ id_user: user})
                .then(res =>{
                  this.setState({ access: res.data , loading: false })
                })
            }
          })
        }
      })
  }

  handleChane(e){
    this.setState({ loading : true});
    apiPostGet('list_menu/row_list_menu' ,{ id_user: e.value})
      .then(res =>{
        this.setState({ access: res.data , loading: false , user: e.value})
      })
  }

  refresh(){
    let { user } = this.state;
    this.setState({ loading : true });

    apiPostGet('list_menu/row_list_menu' ,{ id_user: user})
      .then(res =>{
        if (res) {
          this.setState({ access: res.data , loading: false , user: user , loading2: false ,modal: false}); 
        }
      }) 
  }

  prosesSave(){
    this.setState({ loading2: !this.state.loading2});
  }

  tambah(){
    let { access , user } = this.state;
    let proses = menu;
    let i = 0;

    if (user === '') {
      msgerror('Belum Pilih User Access');
    }else{
      if (access.length > 0) {
        for(i = 0; i < proses.length; i++){
          for(let b = 0; b < access.length; b++){
            if (proses[i].path === access[b].path) {
                proses[i].cek = true
                break;
            }else{
              proses[i].cek = false;
            }
          }
        }
      }else{
        for(let i = 0; i < proses.length; i++){
          proses[i].cek = false;
        }
      }
      this.setState({ dataMenu: proses.filter(x => x.cek !== true) });
      this.mode(); 
    }
  }

  render() {
    let { userlevel , access ,loading , modal , user , dataMenu , loading2 } = this.state;
    return (
      <Page title={'User Access'}>
        <List mode={this.mode} modal={modal} user={user} refresh={this.refresh} dataMenu={dataMenu} loading={loading2} proses={this.prosesSave}/>
        <Row className='mb-3'>
          <Col className='mt-3'>
            <Select 
              className='select'
              options ={ userlevel.map(x =>({
                value: x.user_level,
                label: x.user_level
              }))}
              onChange={this.handleChane}
            />
          </Col>
          <Col>
            <Button color='success' onClick={this.tambah}> Tambah</Button>
          </Col>
        </Row>
        {
          loading ? <Loading active={loading} />
          :
          <Tabel
            data ={access}
            keyField = {'path'}
            columns ={[
              {
                dataField: 'name',
                text: 'Menu'
              },
              {
                dataField: 'group',
                text: 'Group Menu'
              },
              {
                dataField: 'id',
                formatter: this.button,
                text: 'Action'
              }
            ]}                            
              width={{ width:'300px'}}
          />
        }
      </Page>
    );
  }
}

export default Listuseraccess;
