import React, { Component } from 'react';
import Page from 'layouts/Page';
import { Input , Card , CardBody , CardTitle, Button} from 'reactstrap';
import { dataMenu } from 'app';
import './report.css';
import Form from './form_filter';

export default class list_report extends Component {
    constructor(){
        super()
        this.state ={
            report:[],
            filter:'',
            modal: false,
            title:'',
            url:''
        }
        this.mode = this.mode.bind(this);
        this.Show = this.show.bind(this);
    }
    componentDidMount(){
        let data = dataMenu();
        let menu = data.filter( x=> x.group === 'report');

        this.setState({ report: menu });
    }

    mode(){
        this.setState({ modal: !this.state.modal });
    }
    show(title , url){
        this.setState({ title: title , url: url });
        this.mode();
    }

    render() {
        let { report , filter , modal , title , url } =  this.state;
        let list = report.filter( x =>{
            return  x.name.toLowerCase().includes(filter.toLocaleLowerCase());
        })
        return (
            <Page title={'List Report'}>
                <Input type='text' placeholder='Cari Laporan' className='mb-4' onChange={(e)=> this.setState({ filter: e.target.value })} />
                <Form modal={modal} mode={this.mode} title={title} filter={'tanggal'} url={url} />
                <hr />
                <div id='list'>
                    {
                        list.map(x => (
                            <Card id='card' key={x.id}>
                                <CardBody >
                                    <CardTitle id='title'>{x.name}</CardTitle>
                                    <Button color='primary' type='button' onClick={()=> this.show(x.name , x.component)} size='sm'>Show Report</Button>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
            </Page>
        )
    }
}
