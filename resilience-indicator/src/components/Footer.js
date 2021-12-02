import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
function Footer() {
    return(
        <section >
            <hr />
            <Container className="footer">
                <Row>
                    <Col className="footer-center">
                        © Copyright of University of Utah
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default Footer;