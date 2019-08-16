import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel';
import { formatRupiah } from 'app';

export default class list_nota extends Component {

    formatUang(value){
        return formatRupiah(value ,'')
    }
    render() {
        let { modal , mode , data , nota } = this.props;
        return (
            <Modal title={`Detail Nota ${nota}`} modal={modal} mode={mode} >
                <Tabel
                    data ={data}
                    keyField = {'id'}
                    columns ={[
                        {
                            dataField: 'nama_jasa',
                            text: 'Nama Jasa'
                        },
                        {
                            dataField: 'satuan',
                            text: 'Satuan'
                        },
                        {
                            dataField: 'qty',
                            text: 'Qty'
                        },
                        {
                            dataField: 'harga',
                            text: 'Harga',
                            formatter: this.formatUang
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
