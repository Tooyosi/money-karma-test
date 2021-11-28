import React from 'react'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import FooterButton from '../../Common/FooterButton'
import { PREV } from '../../utilities/constants'

export default function TimerSelector({ toggleTab, formName, formControl, handleChange, inputs, onSubmit }) {
    return (
        <Container>
            <form name={formName}>
                <Row>
                    <Col md="6" className="m-auto">
                        <Card>
                            <CardBody>
                                <h4>Select Duration</h4>
                                <Row>
                                    {inputs.map((type, i) => (
                                        <Col xs="3" key={i} className="my-2">
                                            <div className={`btn-tabs text-center ${formControl.text === ((i + 1) * 60) ? 'active' : ''}`} onClick={() => handleChange({ target: { name: "text", value: ((i + 1) * 60) } }, formName)}>
                                                {(i + 1)}m
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <h5 className="text-center">OR</h5>
                                <Row className="mt-4">
                                    <Col>
                                        <Label>Enter Time (in minutes)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max={60}
                                            name="text"
                                            value={formControl.text > 0 ? (formControl.text / 60) : ''}
                                            onChange={(e) => handleChange({ target: { name: "text", value: Number(e.target.value) <= 60 ? ((Number(e.target.value)) * 60) : formControl.text } }, formName)}
                                            required={true}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <FooterButton
                            hasPrevious={true}
                            onSubmit={onSubmit}
                            goBack={() => toggleTab(PREV)}
                            hideSubmit={formControl.text === "" || formControl.text < 1}
                        />
                    </Col>
                </Row>
            </form>
        </Container>

    )
}
