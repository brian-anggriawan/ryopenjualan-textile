import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel_pick';
import {  Input } from 'reactstrap';
import { formatRupiah } from 'app';

export default class list_jasa extends Component {

    constructor(){
        super()
        this.state = { 
            value: ''
        }

        this.proses = this.proses.bind(this);
    }

    proses(id){
        let { setJasa , mode , jasa } = this.props;
        let data = jasa.filter(x => x.id === id)[0];
        setJasa(data);
        this.setState({ value:''});
        mode();
    }

    rupiah(nilai){
        return formatRupiah(nilai ,'');
    }


    render() {
        let { mode , modal , jasa} = this.props;
        let { value } = this.state;

        let filter = jasa.filter(x => {
            if (x.nama_jasa.toLowerCase().includes(value.toLowerCase()) ) {
                return x.nama_jasa.toLowerCase().includes(value.toLowerCase()) 
            }else{
                return x.jenis.toLowerCase().includes(value.toLowerCase()) 
            }
                
        });

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
            <Modal title={'List Jasa'} mode={mode} modal={modal}>
                <div className='mb-3'>
                    <Input autoFocus={true} type='text' placeholder='Search Nama Jasa Atau Jenis' onKeyUp={(e)=> pick(e.keyCode)} onChange={(e)=> this.setState({ value: e.target.value  })} value={value} />
                </div>
                 <Tabel
                    data ={filter}
                    keyField = {'id'}
                    rowEvents={rowEvents}
                    columns ={[
                    {
                        dataField: 'kode_jasa',
                        text: 'Kode Jasa'
                    },
                    {
                        dataField: 'nama_jasa',
                        text: 'Nama Jasa'
                    },
                    {
                        dataField: 'jenis',
                        text: 'Jenis'
                    },
                    {
                        dataField: 'satuan',
                        text: 'Satuan'
                    },
                    {
                        dataField: 'harga_jual',
                        formatter: this.rupiah,
                        text: 'Harga 1'
                    }
                    ]}                            
                    width={{ width:'300px'}}
                />
            </Modal>
        )
    }
}
