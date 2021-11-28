import React from 'react'
import { Button, Col, Container, Row } from 'reactstrap'

export default function FooterButton({ onSubmit, hasPrevious, hideSubmit, goBack, submitText }) {
    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    {hasPrevious &&
                        <Button
                            type="button"
                            role="button"
                            onClick={goBack}
                            color="warning"
                            className="text-white"
                        >Previous</Button>
                    }
                </Col>
                <Col className="text-right">

                    {!hideSubmit &&
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            color="primary"
                        >{submitText? submitText : "Proceed"}</Button>}
                </Col>
            </Row>
        </Container>
    )
}
