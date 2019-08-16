import React, { Component } from 'react';
import Modal from'layouts/list_modal';
import Tabel from 'components/tabel';
import { Button , Form  , Input} from 'reactstrap';
import serialize from 'form-serialize';
import { apiPost } from 'app';
import Loading from 'components/Loading';

export default class list_menu extends Component {
    constructor(){
        super();
        this.state={}

        this.save = this.save.bind(this);
    }

    action(path){
        return <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                    <Input
                    className="custom-control-input"
                    id={path}
                    type="checkbox"
                    name='data'
                    value={path}
                    />
                    <label className="custom-control-label" htmlFor={path}>
                    Tambah
                    </label>
                </div>
    }

    save(){
        let data = serialize(document.getElementById('menu') , {hash: true}).data;
        let cek = typeof(data);
        let { dataMenu } = this.props;
        if (cek === 'string') {
           let filter = dataMenu.filter(x => x.path === data)[0];
           filter.id_user = this.props.user
         

           apiPost('list_menu/tambah',filter)
                .then(res =>{
                    if (res) {
                        this.props.refresh();
                    }
                })
        }else{
            let count = data.length;
            this.props.proses();

            for (let i = 0; i < count; i++) {
               let hasil = dataMenu.filter(x => x.path === data[i])[0];
               hasil.id_user = this.props.user

               apiPost('list_menu/tambah',hasil);

               let cek = i +1;
               if (cek === count) {
                this.props.refresh();
               }
            }
        }
    }

    render() {
        let { modal , mode , dataMenu , loading } = this.props;
        return (
            <Modal title={'List Menu'} mode={mode} modal={modal}>
                {
                    loading ? <Loading active={loading} /> 
                    :
                    <div>
                    <Button color='success' type='button' onClick={this.save}>Tambah Menu</Button>
                        <Form id='menu'>
                            <Tabel
                                data ={dataMenu}
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
                                        dataField: 'path',
                                        formatter: this.action,
                                        text: 'Action'
                                    }
                                ]}                            
                                    width={{ width:'300px'}}
                            />
                        </Form>
                    </div>
                }
            </Modal>
        )
    }
}
