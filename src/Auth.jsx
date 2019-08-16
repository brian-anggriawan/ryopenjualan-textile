import React from 'react';

export default function withAuth(View){
    return class Auth extends React.Component{
        constructor(){
            super()
            this.state = {
                login: false
            }
        }

        componentWillMount(){
            let data  = JSON.parse(localStorage.getItem('userKasir')) || [{ login: false}];
            let cek = data[0].login;
            
            if (cek) {
                this.setState({ login: true })   
            }else{
                this.props.history.replace('/login');
            }  
        }

        render(){
            let { login } = this.state;

            if (login) {
                return <View />
            }else{
                return null
            }
        }

    }
}