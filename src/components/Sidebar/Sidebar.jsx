import React from "react";
import { NavLink , Link } from "react-router-dom";
import { Nav , Collapse} from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import routes from '../../routes';
import { dataMenu } from 'app';

import logo from "Ryo.jpg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      setup: false,
      transaksi: false,
      config: false,
      menu: [],
      menuActive:'',
      dataMenu:[]
    }
    this.activeRoute.bind(this);
    this.setup = this.setup.bind(this);
    this.transaksi = this.transaksi.bind(this);
    this.config = this.config.bind(this);
    this.dashboard = this.dashboard.bind(this);

  }

  dashboard(){
    this.setState({ menuActive: 'dashboard'})
  }

  setup() {
    this.setState({ 
      setup: !this.state.setup , 
      transaksi: false,
      menuActive:'setup',
      config: false
    });
  }

  transaksi() {
    this.setState({ 
      transaksi: !this.state.transaksi , 
      setup: false,
      menuActive: 'transaksi',
      config: false
    });
  }

  config(){
    this.setState({ 
      config: !this.state.config,
      menuActive:'config',
      setup: false,
      transaksi: false
    })
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentWillMount(){
    this.setState({ menu: routes , dataMenu: dataMenu()});
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
 
  render() {

    let { menuActive , dataMenu } = this.state;

    let Auth = dataMenu || [{group:''}];
    let setup = Auth.filter(x => x.group === 'setup').length;
    let transaksi = Auth.filter(x => x.group === 'transaksi').length;
    let config = Auth.filter(x => x.group === 'config').length;

    let listMenu = Auth.filter(x =>{
      return x.group.toLowerCase().includes(menuActive.toLocaleLowerCase());
    });



    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href="https://www.ryopercetakan.com/"
            className="simple-text logo-mini"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.ryopercetakan.com/"
            className="simple-text logo-normal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ryo Percetakan
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
        <Nav>
            <li className='active'>
                <NavLink
                    className="nav-link text-dark"
                    to='/admin/dashboard'
                  >
                    <i className={"now-ui-icons business_chart-bar-32"} />
                    <p>Dashboard</p>
                </NavLink>
            </li>
            {
              setup > 0 ?
              <li className='active'>
                <NavLink
                    className="nav-link text-dark"
                    onClick={this.setup}
                    to='#'
                  >
                    <i className={"now-ui-icons design_bullet-list-67"} />
                    <p>Setup</p>
                  </NavLink>
                    <Collapse isOpen={this.state.setup} className='ml-4'>
                      {
                        listMenu.map( (x , i) =>(
                          <Link
                            className="nav-link text-light"
                            to={`${x.layout}${x.path}`}
                            key={i}
                          >
                            <i className={`now-ui-icons ${x.icon}`} />
                            <p>{x.name}</p>
                          </Link>
                        ))
                      }
                    </Collapse>
              </li> :''
            }
            {
              transaksi > 0 ?
              <li className='active'>
                <NavLink
                    className="nav-link text-dark"
                    onClick={this.transaksi}
                    to='#'
                  >
                    <i className={"now-ui-icons shopping_bag-16"} />
                    <p>Transaksi</p>
                  </NavLink>
                    <Collapse isOpen={this.state.transaksi} className='ml-4'>
                    {
                        listMenu.map( (x , i) =>(
                          <Link
                            className="nav-link text-light"
                            to={`${x.layout}${x.path}`}
                            key={i}
                          >
                            <i className={`now-ui-icons ${x.icon}`} />
                            <p>{x.name}</p>
                          </Link>
                        ))
                      }
                    </Collapse>
              </li> :''
            }
              <li className='active'>
                <NavLink
                     className="nav-link text-dark"
                     to='/admin/report'
                  >
                    <i className={"now-ui-icons education_paper"} />
                    <p>Report</p>
                </NavLink>
              </li> 
            {
              config > 0 ?
              <li className='active'>
                <NavLink
                    className="nav-link text-dark"
                    onClick={this.config}
                    to='#'
                  >
                    <i className={"now-ui-icons ui-1_settings-gear-63"} />
                    <p>Config</p>
                </NavLink>
                    <Collapse isOpen={this.state.config} className='ml-4'>
                    {
                        listMenu.map( (x , i) =>(
                          <Link
                            className="nav-link text-light"
                            to={`${x.layout}${x.path}`}
                            key={i}
                          >
                            <i className={`now-ui-icons ${x.icon}`} />
                            <p>{x.name}</p>
                          </Link>
                        ))
                      }
                    </Collapse>
            </li> : ''
            }    
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
