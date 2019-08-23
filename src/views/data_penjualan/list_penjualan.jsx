import React, { Component } from 'react';
import Page from 'layouts/Page';
import Tabel from 'components/tabel';
import { apiGet , formatRupiah , urlServer , apiPostGet , formatTanggal , getDate   } from 'app';
import { Button  , Row , Col  } from 'reactstrap';
import Detail from './list_nota';
import Loading from 'components/Loading';
import Date from 'react-datetime';
import 'moment/locale/de';
import 'react-datetime/css/react-datetime.css';

export default class list_penjualan extends Component {
    constructor(){
        super()
        this.state = {
            modal: false,
            header:[],
            detail:[],
            nonota:'',
            loading: true,
            tanggal1: getDate(),
            tanggal2: getDate()
        }
        this.mode = this.mode.bind(this);
        this.button = this.button.bind(this);
        this.cetak = this.cetak.bind(this);
        this.detail = this.detail.bind(this);
        this.getDataWithDate = this.getDataWithDate.bind(this);
    }

    mode(){
        this.setState({ modal: !this.state.modal });
    }
    
    componentDidMount(){
        this.setState({ loading:true});
        apiGet('riwayat_penjualan/result_data_riwayat_penjualan')
            .then(res =>{
                this.setState({ header: res , loading: false })
            })
    }

    formatUang(e){
        return formatRupiah(e,'')
    }

    button(id){
        return (
            <div>
                <Button size='sm' color='info' className='mr-2' onClick={()=> this.cetak(id)}>Cetak</Button>
                <Button size='sm' color='success' onClick={()=> this.detail(id)}>Detail</Button>
            </div>
        )
    }

    cetak(id){
        window.open(`${urlServer}/penjualan/cetak_nota/${id}`,'MsgWindow', 'width=4000,height=4000');
    }

    detail(id){
        let { header } = this.state;

        let nota = header.filter(x => x.id === id)[0].no_nota;
        apiPostGet('/riwayat_penjualan/row_data_riwayat_penjualan/', { id : id})
            .then(res =>{
                this.setState({ detail: res.data , nonota: nota });
            })
        this.mode();
    }

    getDataWithDate(){
       let { tanggal1 , tanggal2 } = this.state; 
       this.setState({ loading: true });

       apiPostGet('/riwayat_penjualan/filter_tanggal', { tanggal_dari : tanggal1 , tanggal_sampai: tanggal2})
            .then(res =>{
                this.setState({ header: res.data , loading: false })
            })

        
    }

    render() {
        let { modal , header , detail ,nonota , loading } = this.state;


        if (loading){
            return(
              <Page title={'Data Penjualan'}>
                <Loading active={loading} />
              </Page>
            ) 
          }
        return (
            <Page title={'Data Penjualan'}>
                <Detail modal={modal} mode={this.mode} data={detail} nota={nonota} />
                <Row>
                    <Col>
                        <Date dateFormat="DD-MM-YYYY" className='mt-2' timeFormat={false} defaultValue={getDate()} onChange={(e)=> this.setState({ tanggal1: formatTanggal(e._d) })}/>
                    </Col>
                    <Col>
                        <Date dateFormat="DD-MM-YYYY" className='mt-2' timeFormat={false} defaultValue={getDate()} onChange={(e)=> this.setState({ tanggal2: formatTanggal(e._d) })}/>
                    </Col>
                    <Col>
                        <Button type='button' size='sm' color='success' onClick={this.getDataWithDate}>Cari Data</Button>
                    </Col>
                 </Row>
                <Tabel
                data ={header}
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
                    {
                        dataField: 'id',
                        text: 'Action',
                        formatter: this.button
                    }

                   
                ]}                            
                    width={{ width:'300px'}}
                />
            </Page>
        )
    }
}
