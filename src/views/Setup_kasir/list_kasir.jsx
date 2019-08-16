import React from "react";
import Page from 'layouts/Page';
import { Button , Input } from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class list_kasir extends React.Component {


  action(){
    return (
      <ButtonAction />
    )
  }

  render() {
    let data =  [
                  { kasir: 'Kasir 1' , id: 1},
                  { kasir: 'Kasir 2' , id: 2},
                  { kasir: 'Kasir 3' , id: 3},
                  { kasir: 'Kasir 4' , id: 4},
                  { kasir: 'Kasir 5' , id: 5},
                  { kasir: 'Kasir 6' , id: 6},
                ]
    return (
      <Page title={'Jenis Biaya'}>
        <Input type='text' placeholder='Nama Kasir' />
        <Button color='primary' size='sm' style={{ width: '100%'}} className='mb-4'>Simpan</Button>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'kasir',
                text: 'Kasir'
            }
          ]}                            
            width={{ width:'300px'}}
          />
      </Page>
    );
  }
}

export default list_kasir;
