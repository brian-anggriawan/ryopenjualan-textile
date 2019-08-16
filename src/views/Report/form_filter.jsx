import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Date from 'react-datetime';
import 'moment/locale/de';
import 'react-datetime/css/react-datetime.css';
import {
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Form,
    Button
  } from "reactstrap";
import { getDate , getMounth , getYears , formatTanggal , apiPostPenjualan , apiGet } from 'app';
import Select from 'react-select';
import Serialize from 'form-serialize';


let Harian = ({ onchange })=>{
    return <Date dateFormat="DD-MM-YYYY" timeFormat={false} defaultValue={getDate()} onChange={onchange}/>
}

let Bulanan = ({ onchange })=>{
    return <Date dateFormat="MM" timeFormat={false} defaultValue={getMounth()} onChange={onchange} />
}

let Tahunan = ({ onchange }) =>{
    return <Date dateFormat="YYYY" timeFormat={false} defaultValue={getYears()} onChange={onchange} />
}

export default class form_filter extends Component {
    constructor(props){
        super(props)
        this.state = {
            filter: this.props.filter,
            tanggal1:getDate(),
            tanggal2:getDate(),
            bulan: getMounth(),
            tahun: getYears(),
            petugas:[]
        }
        this.set = this.set.bind(this);
        this.print = this.print.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    

    set(value){
        this.setState({ filter: value });
    }

    componentDidMount(){
        apiGet('/penjualan/result_data_petugas')
        .then(res  =>{
          this.setState({petugas: res });
        })
    }

    print(){
        let { filter , tanggal1 , tanggal2 , bulan , tahun  } = this.state;
        let x = Serialize(document.getElementById('report') ,{ hash: true});
    
        let { url } = this.props;
        let data ={};

        if (this.props.title === 'Laporan Jasa Desain') {
            switch(filter){
                case 'tanggal':
                    data.filter = 'tanggal';
                    data.dari_tanggal = tanggal1;
                    data.sampai_tanggal = tanggal2;
                    data.kode_petugas_design = x.petugas_desain;
                    break;
                case 'bulan':
                    data.filter = 'bulan';
                    data.filter_bulan = bulan < 10 ? `0${bulan}` : bulan;
                    data.filter_tahun_bulan = tahun;
                    data.kode_petugas_design = x.petugas_desain;
                    break;
                case 'tahun':
                    data.filter = 'tahun';
                    data.filter_tahun = tahun;
                    data.kode_petugas_design = x.petugas_desain;
                    break;
                default: console.log('');
            }  
        }else if (this.props.title === 'Laporan Metode Pembayaran'){
            switch(filter){
                case 'tanggal':
                    data.filter = 'tanggal';
                    data.dari_tanggal = tanggal1;
                    data.sampai_tanggal = tanggal2;
                    data.metode_pembayaran = x.metode;
                    break;
                case 'bulan':
                    data.filter = 'bulan';
                    data.filter_bulan = bulan < 10 ? `0${bulan}` : bulan;
                    data.filter_tahun_bulan = tahun;
                    data.metode_pembayaran = x.metode;
                    break;
                case 'tahun':
                    data.filter = 'tahun';
                    data.filter_tahun = tahun;
                    data.metode_pembayaran = x.metode;
                    break;
                default: console.log('');
            }    
        }else{
            switch(filter){
                case 'tanggal':
                    data.filter = 'tanggal';
                    data.dari_tanggal = tanggal1;
                    data.sampai_tanggal = tanggal2;
                    break;
                case 'bulan':
                    data.filter = 'bulan';
                    data.filter_bulan = bulan < 10 ? `0${bulan}` : bulan;
                    data.filter_tahun_bulan = tahun;
                    break;
                case 'tahun':
                    data.filter = 'tahun';
                    data.filter_tahun = tahun;
                    break;
                default: console.log('');
            }
        }

        apiPostPenjualan(`/${url}/print_laporan` , data)
                .then(res =>{
                        // let  myWindow = window.open("", "MsgWindow", "width=4000,height=4000");
                        // myWindow.document.write(res);   
                        let myWindow = window.open('','_blank');
                        myWindow.document.write(res);
                   
                })
    }

    handleChange(e , state){
        let tanggal = e._d;
        switch(state){
            case 'tanggal1':
                this.setState({ tanggal1: formatTanggal(tanggal) });
                break;
            case 'tanggal2':
                this.setState({ tanggal2: formatTanggal(tanggal) });
                break;
            case 'bulan':
                this.setState({ bulan: tanggal.getMonth() + 1});
                break;
           case 'tahun':
                this.setState({ tahun: tanggal.getFullYear()});
                break;
            default : console.log('')
        }
    }

    render() {
        let { title , modal , mode } = this.props;
        let { filter , petugas } = this.state;

        return (
            <Modal title={title} modal={modal} mode={mode} >
                <Form id='report'>
                <Row className='mb-5'>
                    <Col>
                        <FormGroup check className="form-check-radio">
                            <Label check>
                            <Input
                                defaultChecked
                                defaultValue="tanggal"
                                name="filter"
                                type="radio"
                                onChange={()=> this.set('tanggal')}
                            />
                            Harian <span className="form-check-sign" />
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup check className="form-check-radio">
                            <Label check>
                            <Input
                                defaultValue="bulan"
                                name="filter"
                                type="radio"
                                onChange={()=> this.set('bulan')}
                            />
                            Bulanan <span className="form-check-sign" />
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup check className="form-check-radio">
                            <Label check>
                            <Input
                                defaultValue="tahun"
                                name="filter"
                                type="radio"
                                onChange={()=> this.set('tahun')}
                            />
                            Tahunan <span className="form-check-sign" />
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                {
                    filter === 'tanggal' ?
                    <div>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Start</Label>
                                    <Harian onchange={(e)=> this.handleChange(e , 'tanggal1')} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>End</Label>
                                    <Harian onchange={(e)=> this.handleChange(e , 'tanggal2')} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    :filter === 'bulan' ?
                    <div>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Bulan</Label>
                                    <Bulanan onchange={(e)=> this.handleChange(e , 'bulan')}  />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Tahun</Label>
                                    <Tahunan onchange={(e)=> this.handleChange(e , 'tahun')} />
                                </FormGroup>
                            
                            </Col>
                        </Row>
                    </div>
                    :filter === 'tahun' ?
                    <div>
                        <FormGroup>
                            <Label>Tahunan</Label>
                            <Tahunan onchange={(e)=> this.handleChange(e , 'tahun')} />
                        </FormGroup>
                    </div>:''
                }
                {
                    title === 'Laporan Jasa Desain' ?
                    <FormGroup>
                        <Label for='petugas_desain'>Petugas Design</Label>
                        <Select options={petugas.map(x => ({
                        value: x.kode_petugas,
                        label: x.nama_petugas
                        }))}
                        name='petugas_desain' className='select'/>
                    </FormGroup>
                    :''
                    
                }
                {
                  title === 'Laporan Metode Pembayaran' ?
                  <FormGroup>
                      <Label for='metode'>Metode Pembayaran</Label>
                      <Select 
                            options={[
                                {
                                    label: 'CASH',
                                    value:'CASH'
                                },
                                {
                                    label: 'TRANSFER',
                                    value:'TRANSFER'
                                },
                                {
                                    label: 'EDC',
                                    value:'EDC'
                                }
                            ]}
                      name='metode' className='select'/>
                  </FormGroup>
                  :''  
                }
                </Form>
                <Button style={{ width:'100%'}} color='primary' onClick={this.print}>
                    <i className={"now-ui-icons files_paper mr-2"} />
                    Print
                </Button>
            </Modal>
        )
    }
}
