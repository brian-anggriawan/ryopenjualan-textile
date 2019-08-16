import React from "react";
import Page from 'layouts/Page';
import { Button , Input , Form } from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import { apiGet , apiPost , msgdialog } from 'app';
import Loading from 'components/Loading';

class Jenisbiaya extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading : true,
      input:'',
      edit: false,
      id:''
    }
    this.save = this.save.bind(this);
    this.getData = this.getData.bind(this);
    this.delete = this.delete.bind(this);
    this.button = this.button.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount(){
    this.getData();  
  }

  getData(){
    apiGet('jenis_biaya/result_data_jenis_biaya')
    .then(res =>{
      this.setState({ data: res , loading: false , edit:false , id:''});
    })
  }

  save(){
    let { input , edit , id } = this.state;
    this.setState({ loading: true });

    if (edit) {
      apiPost('jenis_biaya/edit' ,{ id:id , kelompok_acc: input })
        .then(res =>{
          console.log(res)
          if (res) {
            this.getData();
          }
        })
    }else{
      apiPost('jenis_biaya/tambah' ,{ kelompok_acc: input})
      .then(res =>{
        if (res) {
          this.getData();
        }
      })
    }
  }

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('jenis_biaya/hapus' , { id: id })
          .then( res =>{
            if (res) {
              this.getData();
            }
          })
        }
      })
  }

  edit(id){
    msgdialog('Edit')
    .then(res =>{
      if (res) {
       let data = this.state.data.filter( x => x.id === id)[0].kelompok_acc;
       this.setState({ edit: true , id: id});
       document.getElementById('jenis').value = data;
      }
    })
  }

  button(id){
    return (
      <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)} />
    )
  }

  render() {
    let { data ,loading } = this.state;

    if (loading){
      return(
        <Page title={'Jenis Biaya'}>
          <Loading active={loading} />
        </Page>
      ) 
    }

    return (
      <Page title={'Jenis Biaya'}>
        <Form id='form'>
          <Input type='text' placeholder='Jenis Biaya' onChange={(e)=> this.setState({ input: e.target.value })} id='jenis' />
          <Button color='primary' size='sm' style={{ width: '100%'}} onClick={this.save} className='mb-4'>Simpan</Button>
        </Form>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'kelompok_acc',
                text: 'Jenis Biaya'
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

export default Jenisbiaya;
