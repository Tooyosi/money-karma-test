import React, { useEffect, useState } from "react"
import { paragraphs } from "../../Data/paragraphs";
import { convertTime, onChange, randomise } from "../utilities";
import { CUSTOM, NEXT, PREV } from "../utilities/constants";
import { testDetailsCalculator } from "../utilities/testDetailsCalculator";
import './App.css';
import ChallengeInput from "./SubComponents/ChallengeInput";
import MainComponent from "./SubComponents/MainComponent";
import TimerSelector from "./SubComponents/TimerSelector";

const MapSubComponents = ({ activeTab, ...props }) => {
  let components = {
    challangeComp: <ChallengeInput {...props} />,
    timerComp: <TimerSelector {...props} />,
    mainComp: <MainComponent {...props} />
  }

  return components[activeTab]
}
function App() {
  let timer
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
  const [state, setState] = useState(defaultState)

  const updateState = (data) => {
    setState((prev) => ({
      ...prev,
      ...data
    }))
  }

  // destructurings
  let { activeTab } = state
  const inputs = activeTab === tabs[0] ? ["Paste", "Random"] : activeTab === tabs[1] ? [...Array(10)] : ''

  const handleChange = (e, formName = undefined) => {
    onChange(e, setState, formName)
    if (e.target.name === "challangeType") {
      let updateObj = {
        ...state.challangeCompForm,
        challangeType: e.target.value,
        text: ""
      }
      if (e.target.value === inputs[1]) {
        let newChallange = randomise(paragraphs)
        updateObj.text = newChallange
      }
      updateState({
        challangeCompForm: updateObj
      })

    }
    if (e.target.name === "inputtedText") {
      if (!state.timerCompForm.timerStarted) {
        startTimer()
      }
      const updatedDetails = testDetailsCalculator(state.challangeCompForm.text, e.target.value)
      updateState({
        mainCompForm: {
          ...updatedDetails,
          inputtedText: e.target.value
        }
      })

    }
  }

  const toggleTab = (action = CUSTOM, value = "") => {
    let tabVal
    let currentIndex = tabs.indexOf(activeTab)
    switch (action) {
      case NEXT:
        tabVal = currentIndex === tabs[tabs.length - 1] ? tabs[0] : tabs[currentIndex + 1]
        break;
      case PREV:
        tabVal = currentIndex === tabs[tabs.length - 1] ? tabs[0] : tabs[currentIndex - 1]
        break;
      case CUSTOM:
      default:
        tabVal = value !== "" && tabs.includes(value) ? value : tabs[0]
        break;
    }
    updateState({ activeTab: tabVal })
  }

  const handleSubmit = (e, tab) => {
    e.preventDefault()
    switch (tab) {
      case tabs[0]:
        if (state.challangeCompForm.text.trim() !== "") {
          toggleTab(NEXT)
        }
        break;
      case tabs[1]:
        if (state.timerCompForm.text > 0) {
          toggleTab(NEXT)
        }
        break;
      case tabs[2]:
        if (timer) {
          clearInterval(timer)
        }
        let { timerCompForm: { text: currentTime, inputtedTime } } = state
        const timeDiff = inputtedTime - currentTime
        updateState({
          showSuccessModal: true,
          timerCompForm:{
            ...state.timerCompForm,
            timeDifference: convertTime(timeDiff)
          }
        })
        break;
      default:
        break;
    }
  }

  const startTimer = () => {
    updateState({
      timerCompForm: {
        ...state.timerCompForm,
        timerStarted: true,
        inputtedTime: state.timerCompForm.text
      }
    });
    timer = setInterval(() => {
      setState((prev) => {
        if (prev.timerCompForm.text > 0) {
          return {
            ...prev,
            timerCompForm: {
              ...prev.timerCompForm,
              text: (prev.timerCompForm.text - 1)
            }
          }
        } else {
          clearInterval(timer)
          return {
            ...prev,
          }
        }
      })

    }, 1000)
  }

  useEffect(() => {
    if (timer) {
      clearInterval(timer)
    }
  }, [state.showSuccessModal, timer])
  return (
    <MapSubComponents
      activeTab={activeTab}
      toggleTab={toggleTab}
      formControl={state[`${activeTab}Form`]}
      formName={`${activeTab}Form`}
      handleChange={handleChange}
      inputs={inputs}
      state={state}
      onSubmit={(e) => handleSubmit(e, activeTab)}
      reset={() => {
        updateState(defaultState)
      }}
    />
  )
}

export default App;
