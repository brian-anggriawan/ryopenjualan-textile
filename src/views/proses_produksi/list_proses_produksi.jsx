import React, { Component } from 'react';
import Page from 'layouts/Page';
import Loading from 'components/Loading';
import Tabel from 'components/tabel';
import { Button  } from 'reactstrap';
import { apiGet } from 'app';
import Form from './form_proses_produksi';

export default class list_proses_produksi extends Component {
    constructor(){
        super()
        this.state = {
            nota:[],
            loading: false,
            modal: false
        }
        this.setLoading = this.setLoading.bind(this);
        this.refresh = this.refresh.bind(this);
        //this.button = this.button.bind(this);
        this.mode = this.mode.bind(this);
        //this.setDetail = this.setDetail.bind(this);
    }

    setLoading(){
        this.setState({ loading: !this.state.loading });
    }

    mode(){
        this.setState({ modal: !this.state.modal});
    }

    componentDidMount(){
        this.refresh();
    }

    refresh(){
        this.setState({ loading:true});
        apiGet('operator_produksi/result_nota')
            .then(res =>{
                this.setState({ nota: res , loading: false })
            })
    }

    // button( id ){
    //     return <Button type='button' color='success' size='sm' onClick={()=> this.setDetail(id)}>Proses</Button>
    // }

    // setDetail(id){
    //     let nonota = this.state.nota.filter(x => x.id === id)[0].no_nota;
    //     this.setState({ nonota: nonota});
    //     this.mode();
    // }

    render() {
        let { nota , loading , modal } = this.state;

        if (loading){
            return(
              <Page title={'Proses Produksi'}>
                <Loading active={loading} />
              </Page>
            ) 
          }
        return (
            <Page title={'Proses Produksi'}> 
                <Form modal={modal} mode={this.mode} nota={nota} refresh={this.refresh} />
                <Button color='primary' size='sm' type='button' onClick={this.mode} style={{width:'100%'}}>Proses Nota</Button>
                <Tabel
                data ={nota}
                keyField = {'id'}
                columns ={[
                    {
                        dataField: 'no_nota',
                        text: 'No Nota'
                    },
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
                        text: 'Kasir'
                    },
                    {
                        dataField: 'nama_pelanggan',
                        text: 'Nama Pelanggan'
                    },
                    {
                        dataField: 'total_harga',
                        text: 'Total Harga',
                        formatter: this.formatUang
                    },
                    // {
                    //     dataField: 'id',
                    //     text: 'Action',
                    //     formatter: this.button
                    // }

                   
                ]}                            
                    width={{ width:'300px'}}
                />
            </Page>
        )
    }
}
