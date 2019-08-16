import React from "react";
import Page from 'layouts/Page';
import { Input , Button , Row , Col , Form , FormGroup , Label , Table  } from 'reactstrap';
import Serialize from 'form-serialize';
import { formatRupiah , msgdialog ,apiGet , inputQty , qtyToNumber ,rupiahToNumber , dataUser  } from 'app';
import { IoMdTrash } from 'react-icons/io';
import Hotkeys from 'react-hot-keys';
import cuid from 'cuid';
import { UncontrolledTooltip } from 'reactstrap';
import Select from 'react-select';
import Bayar from './form_pembayaran';
import Jasa from './list_jasa';
import { msgerror } from "app";


class Listpenjualan extends React.Component {
  constructor(){
    super()
    this.state = {
      row:[],
      petugas:[],
      jasa:[],
      modal2: false,
      modal3 : false,
      header:[],
      detail:[],
      idInputJasa:'',
      total:0,
      loadingJasa: false

    }
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
    this.setQty = this.setQty.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.save = this.save.bind(this);
    this.mode2 = this.mode2.bind(this);
    this.mode3 = this.mode3.bind(this);
    this.setJasa = this.setJasa.bind(this);
    this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.pickJasa = this.pickJasa.bind(this);
    this.refreshJasa = this.refreshJasa.bind(this);
 
  }

  setJasa(data){
    let { idInputJasa } = this.state;
    document.getElementById(`kode${idInputJasa}`).value = data.kode_jasa;
    document.getElementById(`jasa${idInputJasa}`).value = data.nama_jasa;
    document.getElementById(`satuan${idInputJasa}`).value = data.satuan;
    document.getElementById(`jenis${idInputJasa}`).value = data.jenis;
    document.getElementById(`qty${idInputJasa}`).value = '1';
    document.getElementById(`harga${idInputJasa}`).value = formatRupiah(data.harga_jual ,''); 
    document.getElementById(`total${idInputJasa}`).value = formatRupiah(data.harga_jual ,'');
    this.hitungTotalHarga();

  }

  mode2(){
    this.setState({ modal2: !this.state.modal2  });
  }

  mode3(id){
    this.setState({ modal3: !this.state.modal3 , idInputJasa: id  });
  }

  pickJasa(e ,id){
    if (e.keyCode === 17) {
      this.mode3(id)
    }
  }

  componentDidMount(){
    apiGet('/penjualan/result_data_petugas')
      .then(res  =>{
        this.setState({petugas: res });
      })
    apiGet('/penjualan/result_data_jasa')
      .then(res =>{
        this.setState({jasa: res }); 
      })
  }

  add(){
    apiGet('/penjualan/get_no_nota')
      .then(res  =>{
        document.getElementById('no_nota').value = res;
      });
        document.getElementById('header').hidden = false;
        document.getElementById('no_nota').focus();
        document.getElementById('save').hidden = false;
        document.getElementById('cancel').hidden = false;
        document.getElementById('addrow').hidden = false;
        document.getElementById('tambahnota').hidden = true;
        document.getElementById('addrow').style.width = '240px';

    this.addRow();

  }

  addRow(){
    let id = cuid(10);
    let tanggal = new Date();
    let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;
   
    let copy = [ ...this.state.row];
     copy.push( 
      <tr key={id}>
              <td>
                <Input type='text' name={`kode${id}`} id={`kode${id}`} tabIndex={0} hidden/>
                <Input type='text' name={`jasa${id}`} id={`jasa${id}`} placeholder='Tekan ctrl untk pilih jasa'  onKeyUp={(e)=> this.pickJasa(e , id)} tabIndex={index + 1}/>
                <Input type='text' name={`satuan${id}`} id={`satuan${id}`} tabIndex={0} hidden/>
                <Input type='text' name={`jenis${id}`} id={`jenis${id}`} tabIndex={0} hidden />
              </td>
              <td>
                <Input type='text' name={`qty${id}`} id={`qty${id}`} onKeyUp={(e)=> this.setQty(e ,id,e.target.value)} tabIndex={index + 2}/>
              </td>
              <td>
                <Input type='text' name={`harga${id}`} id={`harga${id}`} readOnly tabIndex='0' />
              </td>
              <td>
                <Input type='text' name={`total${id}`} id={`total${id}`} readOnly tabIndex='0'/>
              </td>
              <td>
                <Button color='danger' size='sm' onClick={()=> this.deleteRow(id)} tabIndex='0'><IoMdTrash /></Button>
              </td>
            </tr>
     )
     this.setState({ row : copy})
  }

  setQty(e ,id , value){
    inputQty(`qty${id}` , value);
    let harga = rupiahToNumber(document.getElementById(`harga${id}`).value);
    let qty = qtyToNumber(value);
    let index = this.state.row.findIndex( x => x.key === id) + 1;
    let count = this.state.row.length;

    if (e.keyCode === 13 && index === count) {
      this.addRow();
    }
  
    document.getElementById(`total${id}`).value = formatRupiah((harga * qty).toString(),'Rp. ');
    this.hitungTotalHarga();
  }

  hitungTotalHarga(){
    let detail = document.getElementById('detail');
    let dataDetail = Serialize( detail , { hash : true });
    let nilai = 0
    for( let i = 0; i < this.state.row.length; i++){
      
      let cek = rupiahToNumber(dataDetail[`total${this.state.row[i].key}`]);      
      nilai += parseInt(cek);
      
    }
    this.setState({ total: nilai });
  }

  clearAll(){
    this.setState({ row: [] , modal: false , modal2: false , modal3: false , header:[] , detail:[] , idinput:'' , total: 0 });
    document.getElementById('no_nota').value = '';
    document.getElementById('header').hidden = true;
    document.getElementById('save').hidden = true;
    document.getElementById('cancel').hidden = true;
    document.getElementById('addrow').hidden = true;
    document.getElementById('tambahnota').hidden = false;
    document.getElementById('header').reset();
    document.getElementById('detail').reset();
  }

  cancel(){
    msgdialog('Membatalkan')
      .then(res =>{
        if (res){
          this.clearAll();
        }
      })
  }

  save(){
          let header = document.getElementById('header');
          let detail = document.getElementById('detail');
          let dataHeader = Serialize( header , { hash : true });
          let dataDetail = Serialize( detail , { hash : true });

          dataHeader.operator = dataUser().username;
          dataHeader.total_harga = this.state.total;
          let cek = dataHeader.kode_petugas_design || 0;

          if (cek !== 0) {
            dataHeader.petugas_design = this.state.petugas.filter(x => x.kode_petugas === dataHeader.kode_petugas_design)[0].nama_petugas;
          }

          let arrayDetail = [];

          this.state.row.map(x => (
            arrayDetail.push({
              id_penjualan: dataHeader.no_nota,
              kode_jasa: dataDetail[`kode${x.key}`] || '', 
              nama_jasa: dataDetail[`jasa${x.key}`] || '', 
              satuan: dataDetail[`satuan${x.key}`] || '', 
              harga: rupiahToNumber(dataDetail[`harga${x.key}`] || '0'), 
              qty: qtyToNumber(dataDetail[`qty${x.key}`] || '0'), 
              total_harga: rupiahToNumber(dataDetail[`total${x.key}`] || '0'),
              jenis_jasa: dataDetail[`jenis${x.key}`] || ''
            })
          ))
        this.setState({ detail: arrayDetail.filter(x => x.kode_jasa !== '') , header: dataHeader });

        let count = Object.keys(dataHeader).length;
        if (count === 8) {
          this.mode2();
        }else{
          msgerror('Header Masih ada Yang Kosong')
        }

        
  }

  onKeyDown(keyName, e, handle) {
    if (keyName === 'shift+a') {
      let count = this.state.row.length;
      if (count === 0) {
        return this.add();
      }
    }else if(keyName === 'shift+s'){
      return this.addRow()
    }else if(keyName === 'f5'){
      e.preventDefault()
    }

  }

  deleteRow(id){
    this.setState({
      row: this.state.row.filter( x => x.key !== id) 
    },()=>{
      this.hitungTotalHarga();
    }) 
  }

  refreshJasa(){
    this.setState({ loadingJasa: true });
    apiGet('/penjualan/result_data_jasa')
    .then(res =>{
      this.setState({jasa: res , loadingJasa: false }); 
    })
  }

  render() {
    let { row , petugas  , jasa , modal2 , modal3 , idInputJasa , total , header , detail , loadingJasa} = this.state;
    return (
      <Hotkeys 
        keyName="shift+a ,shift+s ,f5"
        onKeyUp={this.onKeyDown}
      >
      <Page title={'Penjualan'}>
        <Bayar modal={modal2} mode={this.mode2} header={header} detail={detail} clear={this.clearAll}  />
        <Jasa modal={modal3} mode={this.mode3} jasa={jasa} idinput={idInputJasa} setJasa={this.setJasa} loading={loadingJasa} refresh={this.refreshJasa}  />
        <Row>
          <Col sm='3'>
            <Row>
              <Col>
                <Button color='primary' size='sm' onClick={this.add} style={{width:'100%'}} id='tambahnota' tabIndex='0'>Add</Button>
                <UncontrolledTooltip placement="top" target="tambahnota" delay={0}>
                  Bisa Juga Dengan Shift + A
                </UncontrolledTooltip>
              </Col>
              <Col>
                <Button color='info' size='sm' id='addrow' onClick={this.addRow} style={{width:'100%'}} hidden tabIndex='0'>Row</Button>
                <UncontrolledTooltip placement="top" target="addrow" delay={0}>
                  Bisa Juga Dengan Shift + S
                </UncontrolledTooltip>
              </Col>
            </Row>
          </Col>
          <Col sm='9'></Col>
        </Row>
        <hr/>
        <Form id='header' onSubmit={(e)=>  e.preventDefault()} hidden>
        <Row>
            <Col>
              <FormGroup>
                <Label for='no_nota'>Nota</Label>
                <Input type='text' name='no_nota' id='no_nota'  readOnly tabIndex='0' />
              </FormGroup>
              <FormGroup id='kode_petugas_design'>
                <Label for='kode_petugas_design'>Petugas Design</Label>
                <Select options={petugas.map(x => ({
                  value: x.kode_petugas,
                  label: x.nama_petugas
                }))}
                name='kode_petugas_design' className='select' id='kode_petugas_design' tabIndex='1'/>
              </FormGroup>
            </Col>
            <Col>
                <FormGroup >
                  <Label for='nama_pelanggan'>Nama Pelanggan</Label>
                  <Input type='text' name='nama_pelanggan' id='nama_pelanggan'  tabIndex='2'/>
                </FormGroup>
              <FormGroup>
                <Label for='alamat'>Alamat</Label>
                <Input type='text' name='alamat' id='alamat' tabIndex='3' />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for='no_telepon'>No Telp</Label>
                <Input type='number' name='no_telepon' tabIndex='4'/>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <hr />
        <Row style={{ marginBottom:'50px'}}>
          <Col>
              <Form id='detail' onSubmit={(e)=>  e.preventDefault()}>
              <Table responsive>
                <thead>
                  <tr>
                      <th style={{width: '35%' , fontSize:'20px'}}>Jasa</th>
                      <th style={{width: '10%' , fontSize:'20px'}}>QTY</th>
                      <th style={{ fontSize: '20px'}}>Harga</th>
                      <th style={{ fontSize: '20px'}}>Total</th>
                      <th style={{ fontSize: '20px'}}>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    row
                  }
                </tbody> 
              </Table>
              </Form>
            </Col>
        </Row>
        <h3>{`Total Harga : ${formatRupiah(total.toString(),'')}`}</h3>
        <Row>
          <Col>
              <Button color='success' size='sm' type='button' style={{ width:'100%'}} id='save' tabIndex='0' onClick={this.save} hidden >Proses</Button>
          </Col>
          <Col>
              <Button color='danger' size='sm' type='button'  style={{ width:'100%'}} id='cancel' tabIndex='0' onClick={this.cancel} hidden>Cancel</Button>
          </Col>
        </Row>
      </Page>
      </Hotkeys>
    );
  }
}

export default Listpenjualan;
