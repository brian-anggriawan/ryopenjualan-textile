import React, { Component } from 'react';
import Page from 'layouts/Page';
import { Button , Input  , Form} from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import { apiGet , apiPost , msgdialog  } from 'app';
import Loading from 'components/Loading';


export default class jenis_bahan extends Component {
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
        apiGet('jenis_bahan/result_data_jenis_bahan')
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
          apiPost('jenis_bahan/edit' ,{ id:id , nama_jenis_bahan: input })
            .then(res =>{
              if (res) {
                this.getData();
              }
            })
        }else{
          apiPost('jenis_bahan/tambah' ,{ nama_jenis_bahan: input})
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
              apiPost('jenis_bahan/hapus' , { id: id })
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
           let data = this.state.data.filter( x => x.id === id)[0].nama_jenis_bahan;
           this.setState({ edit: true , id: id});
           document.getElementById('level').value = data;
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
            <Page title={'Jenis Bahan'}>
              <Loading active={loading} />
            </Page>
          ) 
        }    
        return (
            <Page title={'Jenis Bahan'}>
                <Form>
                    <Input type='text' autoFocus placeholder='Jenis Bahan' id='level' onChange={(e)=> this.setState({ input: e.target.value})} />
                    <Button color='primary' size='sm' style={{ width: '100%'}} onClick={this.save} className='mb-4'>Simpan</Button>
                </Form>
                <Tabel
                data ={data}
                keyField = {'id'}
                columns ={[
                    {
                        dataField: 'nama_jenis_bahan',
                        text: 'Jenis Bahan'
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
        )
    }
}
