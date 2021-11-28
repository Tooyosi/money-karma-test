import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import FooterButton from '../../Common/FooterButton'
import { ChallengeDetailsCard } from '../../Common/ChallengeDetailsCard'
import { PREV } from '../../utilities/constants'
import { TypingChallenge } from '../../Common/TypingChallenge'
import CustomModal from '../../Common/CustomModal'
import ResultComponent from './ResultComponent'

export default function MainComponent({ toggleTab, formName, formControl, handleChange, reset, onSubmit, state }) {
    const mapData = [{ key: "Words", value: formControl.words }, { key: "Characters", value: formControl.characters }, { key: "Mistakes", value: formControl.mistakes }]
    return (
        <Container>
            <Row className="my-4">
                {/* {Object.entries(formControl).map((value) => ( */}
                {mapData.map(({ key, value }) => (
                    <Col key={key}>
                        <ChallengeDetailsCard cardName={key} cardValue={value} />
                    </Col>
                ))}
            </Row>
            <form onSubmit={onSubmit}>

                <Row>
                    <Col>
                        <TypingChallenge
                            time={state["timerCompForm"].text}
                            timerStarted={state["timerCompForm"].timerStarted}
                            selectedParagraph={state["challangeCompForm"].text}
                            handleChange={handleChange}
                            inputtedText={formControl.inputtedText}
                        />
                    </Col>
                </Row>
                <FooterButton
                    hasPrevious={!state["timerCompForm"].timerStarted}
                    onSubmit={onSubmit}
                    goBack={() => toggleTab(PREV)}
                    submitText={state["timerCompForm"].text === 0? "View Result" : "Submit"}
                    hideSubmit={formControl.inputtedText === "" ||  state.showSuccessModal}
                />
            </form>


            <CustomModal
                isOpen={state.showSuccessModal}
                toggle={reset}
            >
                <ResultComponent
                    mapData={mapData}
                    isSuccess={formControl.mistakes < 1 && (formControl.inputtedText === state["challangeCompForm"].text)}
                    toggle={reset}
                    totalPoints={formControl.points}
                    timeLeft = {state["timerCompForm"].timeDifference}
                />
            </CustomModal>
        </Container>
    )
}
