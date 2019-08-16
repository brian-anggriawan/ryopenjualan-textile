import React, { Component } from 'react';
import image from 'assets/img/img-01.png';
import { Button } from 'reactstrap';
import { msgok , msgerror , apiPostGet } from 'app';
import './main.css';
import './util.css';


class login extends Component {
    
    constructor(){
        super()
        this.state ={
            name: '',
            pass:''
        }
        this.Login = this.Login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    

    Login(){
        let { name , pass} = this.state;

        apiPostGet('login/masuk',{ username: name , password: pass})
            .then(res =>{
                if (res.result === 'true') {
                    localStorage.setItem('userKasir' , JSON.stringify([{ 
                        'login': true , 
                        'id_user': res.id_user,
                        'username': res.username,
                        'tingkatan': res.tingkatan
                    }]));
    
                    localStorage.setItem('menu' , JSON.stringify(res.list_menu));
                    msgok('Berhasil Login' , '/admin/dashboard')   
                }else{
                    msgerror('Username Dan Password Salah')
                }
               
            })
    }

    handleChange(e , name){
        if (name === 'name') {
            this.setState({ name: e.target.value})
        }else{
            this.setState({ pass : e.target.value}) 
        }
    }

    render() {
        return (
            <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={image} alt="IMG" />
                    </div>
    
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Login
                        </span>
    
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="username" placeholder="Username" onChange={(e)=> this.handleChange(e , 'name')}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
    
                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input className="input100" type="password" name="pass" placeholder="Password" onChange={(e)=> this.handleChange(e , 'pass')}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <Button className="login100-form-btn" onClick={this.Login}>
                                Login
                            </Button>
                        </div>
                        <div className="text-center p-t-136">
                            <p> 
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default login;
