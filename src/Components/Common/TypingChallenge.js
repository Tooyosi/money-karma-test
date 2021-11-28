import React from 'react'
import { Col, Container, Input, Row } from 'reactstrap'
import { convertTime } from '../utilities'

export const TypingChallenge = ({
    handleChange,
    time,
    timerStarted,
    selectedParagraph,
    inputtedText
}) => {
    return (
        <Container>
            <div className="text-center">
                <p className={`${time <= 10 ? 'text-danger' : ''}`}>{convertTime(time)}</p>
                <p className="small">{!timerStarted && 'Start typing to start the test'}</p>
            </div>

            <Row>
                <Col>
                    <Input
                        disabled={true}
                        type="textarea"
                        value={selectedParagraph}
                        rows={10}
                    />
                </Col>
                <Col>
                    <Input
                        onChange={handleChange}
                        disabled={timerStarted && time === 0}
                        onPaste={(e)=>{
                            e.preventDefault()
                            return false;
                          }}
                        name="inputtedText"
                        type="textarea"
                        value={inputtedText}
                        placeholder="Start typing here"
                        rows={10}
                    />

                </Col>
            </Row>
        </Container>
    )
}