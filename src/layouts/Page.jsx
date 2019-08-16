import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

export default class Page extends React.Component {
    render() {
        let { title } = this.props;
      return (
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <Row>
              <Col md={12}>
                <Card>
                  <CardHeader>
                    <h5 className="title">{title}</h5>
                  </CardHeader>
                  <hr/>
                  <CardBody className="all-icons">
                    <Row>
                     <Col>
                        {this.props.children}
                     </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    }
  }