import React, { Component } from 'react';
import Page from 'layouts/Page';
import {Row , Col , Button , Input , Table , Form} from 'reactstrap';
import Nota from './list_nota';
import Jasa from './list_jasa';
import FormBayar from './form_pembayaran';
import { apiPostGet , formatRupiah , inputQty , rupiahToNumber , qtyToNumber } from 'app';
import cuid from 'cuid';
import { IoMdTrash } from 'react-icons/io';
import Serialize from 'form-serialize';
import Loading from 'components/Loading';

export default class retur extends Component {
    constructor(){
        super()
        this.state = {
            modal1: false,
            modal2: false,
            modal3: false,
            edit: false,
            row:[],
            total:0,
            id_penjualan: '',
            idInputJasa:'',
            pembayaran: '',
            detail:[],
            loading: false,
            nonota:''
        }
        this.mode1 = this.mode1.bind(this);
        this.mode2 = this.mode2.bind(this);
        this.mode3 = this.mode3.bind(this);
        this.getDetail = this.getDetail.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addRow = this.addRow.bind(this);
        this.pickJasa = this.pickJasa.bind(this);
        this.setQty = this.setQty.bind(this);
        this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.setJasa = this.setJasa.bind(this);
        this.save = this.save.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    mode1(){
        this.setState({ modal1: !this.state.modal1 });
    }

    mode2(id){
        this.setState({ modal2: !this.state.modal2  ,idInputJasa: id });
    }

    mode3(){
        this.setState({ modal3: !this.state.modal3 });
    }

    setLoading(){
      this.setState({ loading: !this.state.loading });
    }

    setJasa(data){
        let { idInputJasa  } = this.state;
        document.getElementById(`kode${idInputJasa}`).value = data.kode_jasa;
        document.getElementById(`jasa${idInputJasa}`).value = data.nama_jasa;
        document.getElementById(`satuan${idInputJasa}`).value = data.satuan;
        document.getElementById(`jenis${idInputJasa}`).value = data.jenis;
        document.getElementById(`qty${idInputJasa}`).value = '1';

        document.getElementById(`harga${idInputJasa}`).value = formatRupiah(data.harga_jual,'');
        document.getElementById(`total${idInputJasa}`).value = formatRupiah(data.harga_jual ,'');
    

        this.hitungTotalHarga();
    
      }

    getDetail(id , no_nota , status_hutang){
        document.getElementById('no_nota').value = no_nota;
        apiPostGet('retur/result_nota_detail' , { id_penjualan: id})
            .then(res =>{
                let data = res.data;
                let copy = [ ...this.state.row];

                for (let i = 0; i < data.length; i++) {
                    let id = cuid(10);
                    let tanggal = new Date();
                    let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;
                     copy.push( 
                      <tr key={id}>
                              <td>
                                <Input type='text' name={`kode${id}`} id={`kode${id}`} tabIndex={0} defaultValue={data[i].kode_jasa} hidden/>
                                <Input type='text' name={`jasa${id}`} id={`jasa${id}`} placeholder='Tekan ctrl untk pilih jasa'  onKeyUp={(e)=> this.pickJasa(e , id)} tabIndex={index + 1} defaultValue={data[i].nama_jasa}/>
                                <Input type='text' name={`satuan${id}`} id={`satuan${id}`} tabIndex={0} defaultValue={data[i].satuan} hidden/>
                                <Input type='text' name={`jenis${id}`} id={`jenis${id}`} tabIndex={0} defaultValue={data[i].jenis_jasa} hidden />
                              </td>
                              <td>
                                <Input type='text' name={`qty${id}`} id={`qty${id}`} onKeyUp={(e)=> this.setQty(e ,id,e.target.value)} defaultValue={data[i].qty} tabIndex={index + 2}/>
                              </td>
                              <td>
                                <Input type='text' name={`harga${id}`} id={`harga${id}`} defaultValue={formatRupiah(data[i].harga.toString() ,'')} readOnly tabIndex='0' />
                              </td>
                              <td>
                                <Input type='text' name={`total${id}`} id={`total${id}`} defaultValue={formatRupiah(data[i].total_harga.toString() ,'')} readOnly tabIndex='0'/>
                              </td>
                              <td>
                                <Button color='danger' size='sm' onClick={()=> this.deleteRow(id)} tabIndex='0'><IoMdTrash /></Button>
                              </td>
                            </tr>
                     )
                }

                this.setState({ edit: true , id_penjualan: id , row: copy , pembayaran: status_hutang , nonota: no_nota });
                this.hitungTotalHarga();
            })
    }

    cancel(){
        this.setState({
            edit: false,
            total: 0,
            row:[],
            id_penjualan:'',
            idInputJasa:'',
            pembayaran:'',
            detail:[],
            nonota:''
        })
        document.getElementById('no_nota').value = '';
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

    pickJasa(e ,id){
        if (e.keyCode === 17) {
          this.mode2(id);
        }
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

    deleteRow(id){
        this.setState({
          row: this.state.row.filter( x => x.key !== id) 
        },()=>{
          this.hitungTotalHarga();
        }) 
    }

    save(){
        let dataDetail = Serialize( document.getElementById('detail') , { hash : true });
        let arrayDetail = [];

        this.state.row.map(x => (
          arrayDetail.push({
            kode_jasa: dataDetail[`kode${x.key}`] || '', 
            nama_jasa: dataDetail[`jasa${x.key}`] || '', 
            satuan: dataDetail[`satuan${x.key}`] || '', 
            harga: rupiahToNumber(dataDetail[`harga${x.key}`] || '0'), 
            qty: qtyToNumber(dataDetail[`qty${x.key}`] || '0'), 
            total_harga: rupiahToNumber(dataDetail[`total${x.key}`] || '0'),
            jenis_jasa: dataDetail[`jenis${x.key}`] || ''
          })
        ))
      this.setState({ detail: arrayDetail.filter(x => x.kode_jasa !== '')});
      this.mode3();
}
    

    render() {
        let { modal1 , modal2 , modal3 , row , edit , total , detail , pembayaran , id_penjualan , loading , nonota  } = this.state;
        return (
            <Page title={'Retur Nota'}>
                <Nota mode={this.mode1} modal={modal1} proses={this.getDetail} />
                <Jasa mode={this.mode2} modal={modal2} setJasa={this.setJasa} />
                <FormBayar mode={this.mode3} modal={modal3} detail={detail} pembayaran={pembayaran} id_penjualan ={id_penjualan} total={total} clear={this.cancel} nonota={nonota} />
                <Row>
                    <Col>
                        <Input type='text' id='no_nota' className='mt-2' name='no_nota' readOnly />
                    </Col>
                    <Col>
                        <Button size='sm' type='button' color='primary' onClick={this.mode1}>Cari Nota</Button>
                    </Col>
                </Row>
                {
                  loading ? <Loading active={loading} />
                  :
                    edit ? 
                    <Form id='detail'>
                        <Table>
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
                        <h3>{`Total Harga : ${formatRupiah(total.toString(),'')}`}</h3>
                        <Row>
                            <Col>
                                <Button color='success' size='sm' type='button' style={{ width:'100%'}} tabIndex='0' onClick={this.save}>Proses</Button>
                            </Col>
                            <Col>
                                <Button color='danger' size='sm' type='button'  style={{ width:'100%'}}  tabIndex='0' onClick={this.cancel}>Cancel</Button>
                            </Col>
                        </Row>
                    </Form>
                :''
                }
                
            </Page>
        )
    }
}
