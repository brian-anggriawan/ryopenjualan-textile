import React from "react";
import Page from 'layouts/Page';
import { Button , Input , Form } from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import { apiGet , apiPost , msgdialog  } from 'app';
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

  getData(){
    apiGet('kategori_jasa/result_data_kategori_jasa')
    .then(res =>{
      this.setState({ data: res , loading: false , edit:false , id:''});
    })
  }

  componentDidMount(){
    this.getData();  
  }

  save(){
    let { input , edit , id } = this.state;
    this.setState({ loading: true });

    if (edit) {
      apiPost('kategori_jasa/edit' ,{ id:id , jenis: input })
        .then(res =>{
          if (res) {
            this.getData();
          }
        })
    }else{
      apiPost('kategori_jasa/tambah' ,{ jenis: input})
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
          apiPost('kategori_jasa/hapus' , { id: id })
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
       let data = this.state.data.filter( x => x.id === id)[0].jenis;
       this.setState({ edit: true , id: id});
       document.getElementById('jasa').value = data;
      }
    })
  }


  button(id){
    return (
      <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)} />
    )
  }

  render() {
    let { data , loading } = this.state;

    if (loading){
      return(
        <Page title={'Kategori Jasa'}>
          <Loading active={loading} />
        </Page>
      ) 
    }
    return (
      <Page title={'Kategori Jasa'}>
        <Form>
          <Input type='text' placeholder='Kategor Produk' id='jasa' onChange={(e)=> this.setState({ input: e.target.value })} />
          <Button color='primary' size='sm' style={{ width: '100%'}} className='mb-4' onClick={this.save}>Simpan</Button>
        </Form>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'jenis',
                text: 'Kategori Jasa'
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
