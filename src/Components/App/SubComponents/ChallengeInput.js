import React from 'react'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import FooterButton from '../../Common/FooterButton'

export default function ChallengeInput({formName, formControl, handleChange, inputs, onSubmit }) {
    return (
        <Container>
            <form name={formName}>
                <Row>
                    <Col md="6" className="m-auto">
                        <Card>
                            <CardBody>
                                <h4>Select Challange</h4>
                                <Row>
                                    {inputs.map((type) => (
                                        <Col xs="6" key={type}>
                                            <div data-testid={type} className={`btn-tabs text-center ${formControl.challangeType === type ? 'active' : ''}`} onClick={() => handleChange({ target: { name: "challangeType", value: type } }, formName)}>
                                                {type} Paragraph
                                            </div>
                                        </Col>
                                    ))}
                                </Row>

                                {formControl.challangeType !== "" &&
                                    <Row className="mt-4">
                                        <Col>
                                            <Label>{formControl.challangeType} Paragraph</Label>
                                            <Input
                                                type="textarea"
                                                data-testid="text-input"
                                                name="text"
                                                value={formControl.text}
                                                onChange={handleChange}
                                                required={true}
                                                disabled={formControl.challangeType === inputs[1]}
                                                rows={10}
                                            />
                                        </Col>
                                    </Row>}
                            </CardBody>
                        </Card>
                        <FooterButton
                            hasPrevious={false}
                            onSubmit={onSubmit}
                            hideSubmit={formControl.text.trim() === ""}
                        />
                    </Col>
                </Row>
            </form>
        </Container>
    )
}
