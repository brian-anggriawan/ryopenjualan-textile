import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <hr/>
        <Container fluid={this.props.fluid ? true : false}>
          <div className="copyright">
            &copy; 2019 , Design by
            <a
              href="https://www.ababilsoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className='ml-1'
            >
              Ababil Software
            </a>
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
