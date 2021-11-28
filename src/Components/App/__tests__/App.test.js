import React from "react"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from "../App";
import ChallengeInput from "../SubComponents/ChallengeInput";
import ResultComponent from "../SubComponents/ResultComponent";
import { ChallengeDetailsCard } from "../../Common/ChallengeDetailsCard";
import { testDetailsCalculator } from "../../utilities/testDetailsCalculator";
import { convertTime, onChange } from "../../utilities";

Enzyme.configure({ adapter: new Adapter() })
const tabs = ["challangeComp", "timerComp", "mainComp"]
const defaultState = {
    activeTab: tabs[0],
    showSuccessModal: false,
    challangeCompForm: {
        challangeType: '',
        text: ''
    },
    timerCompForm: {
        timerStarted: false,
        text: 0,
        inputtedTime: '',
        timeDifference: ''
    },
    mainCompForm: {
        points: 0,
        words: 0,
        characters: 0,
        mistakes: 0,
        inputtedText: '',
        speed: ''
    }
}

describe("App", () => {
    it("renders correctly", () => {
        shallow(<App />)
    })
})

describe("ChallengeInput", () => {
    let inputsArr = ["Paste", "Random"]
    let formControl = {
        challangeType: '',
        text: ''
    }
    const wrapper = shallow(<ChallengeInput formName={`${tabs[0]}Form`} formControl={defaultState[`${tabs[0]}Form`]} handleChange={(e) => {
        formControl.challangeType = e.target.value
    }} inputs={inputsArr} onSubmit={(e) => console.log("Submitted", e)} />);
    let elem1 = wrapper.find({ 'data-testid': 'Paste' })
    let elem2 = wrapper.find({ 'data-testid': 'Random' })
    it("changes input", () => {
        elem1.simulate("click")
        expect(formControl.challangeType).toBe(inputsArr[0])
        elem2.simulate("click")
        expect(formControl.challangeType).toBe(inputsArr[1])
    });

})

describe("Result Component", () => {
    const mapData = [{ key: "Words", value: "3" }, { key: "Characters", value: "4" }, { key: "Mistakes", value: "4" }]
    let value = false
    const wrapper = shallow(<ResultComponent mapData={mapData} toggle={(e) => {
        value = true
    }} isSuccess={true} timeLeft="0.00" totalPoints={3} />);
    let button = wrapper.find({ 'data-testid': 'restart-button' })

    it("Closes and restarts process on button click", () => {
        button.simulate("click")
        expect(value).toBe(true)
    });

})

describe("Utilities", () => {

    it("calculates user input", () => {
        let originalValue = "Original String"
        let typedValue = "Original String"
        let calculator = testDetailsCalculator(originalValue, typedValue)
        expect(calculator.words).toEqual(2)
        expect(calculator.characters).toEqual(14)
        expect(calculator.mistakes).toEqual(0)
        expect(calculator.points).toEqual(2)
    });

    it("converts seconds minute:seconds format", () => {
        let originalValue = 600
        let convertedTime = convertTime(originalValue)
        expect(convertedTime).toEqual("10:00")
    });

})