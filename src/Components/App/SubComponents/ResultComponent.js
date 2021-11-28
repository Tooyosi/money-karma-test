import React from 'react'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import { ChallengeDetailsCard } from '../../Common/ChallengeDetailsCard'

export default function ResultComponent({ mapData, toggle, isSuccess, timeLeft, totalPoints }) {
    return (
        <Container>
            <Row>
                <Col className="mt-3">
                    <Alert color={`${isSuccess ? 'success' : 'danger'}`}>
                        {isSuccess ? "Success" : "Failed"}
                    </Alert>
                </Col>
                <Col sm="12" className="my-3">

                    <ChallengeDetailsCard cardName={"Total Points"} cardValue={`${totalPoints}`} />
                </Col>

                {mapData.map(({ key, value }) => (
                    <Col sm="12" className="my-3" key={key}>
                        <ChallengeDetailsCard cardName={key} cardValue={value} />
                    </Col>
                ))}
                <Col sm="12" className="my-3">
                    <ChallengeDetailsCard cardName={"Completed in"} cardValue={`${timeLeft}s`} />
                </Col>
                <Col sm="12" className="my-3">
                    <Button className="btn-block" color="primary" onClick={toggle}>Restart</Button>
                </Col>
            </Row>
        </Container>
    )
}
