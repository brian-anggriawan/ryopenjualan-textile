import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel_pick';
import { apiGet , formatRupiah } from 'app';
import { Input } from 'reactstrap';

export default class list_nota extends Component {
    constructor(){
        super()
        this.state = {
            nota: [],
            value:''
        }
        this.proses = this.proses.bind(this);
    }

    componentDidMount(){
        apiGet('retur/result_nota')
            .then(res =>{
                this.setState({ nota: res })
            })
    }

    formatUang(value){
        return formatRupiah(value ,'')
    }

    proses(id){
        let { proses , mode } = this.props;
        let { nota } = this.state;
        let data = nota.filter(x => x.id === id)[0];
        proses(id , data.no_nota , data.status_hutang);
        this.setState({ value:''});
        mode();
    }

    render() {
        let { mode , modal } = this.props;
        let { nota , value } = this.state;
 
        let filter = nota.filter(x => {
            let nota = x.no_nota || '';
            return nota.toLowerCase().includes(value.toLowerCase());
        })

        let pick = (e) =>{
            if (e === 13) {
                this.proses(filter[0].id)
            }
         }
 
         const rowEvents = {
             onClick: (e, row, rowIndex) => {
               this.proses(row.id)
             }
           };
        return (
            <Modal title={'List Nota'} mode={mode} modal={modal}>
                <Input className='mb-3' type='text' autoFocus={true} placeholder='Cari Nota Nota' onKeyUp={(e)=> pick(e.keyCode)} onChange={(e)=> this.setState({ value: e.target.value })} value={value} />
                 <Tabel
                    data ={filter}
                    keyField = {'id'}
                    rowEvents={rowEvents}
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
                        } 
                    ]}                            
                        width={{ width:'300px'}}
                    />
            </Modal>
        )
    }
}
