import React, { useState } from "react"
import { paragraphs } from "../../Data/paragraphs";
import { onChange, randomise } from "../utilities";
import { CUSTOM, NEXT, PREV } from "../utilities/constants";
import './App.css';
import ChallengeInput from "./SubComponents/ChallengeInput";
import TimerSelector from "./SubComponents/TimerSelector";

const MapSubComponents = ({ activeTab, ...props }) => {
  let components = {
    challangeComp: <ChallengeInput {...props} />,
    timerComp: <TimerSelector {...props} />,
    mainComp: <>The main component</>
  }

  return components[activeTab]
}
function App() {

  const tabs = ["challangeComp", "timerComp", "mainComp"]
  const [state, setState] = useState({
    activeTab: tabs[0],
    challangeCompForm: {
      challangeType: '',
      text: ''
    },
    timerCompForm: {
      timerType: '',
      text: ''
    },
    data: {
      challenge: '',
      time: 0,
      words: 0,
      characters: 0,
      mistakes: 0,
    }
  })

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
      default:
        break;
    }
  }

  return (
    <MapSubComponents
      activeTab={activeTab}
      toggleTab={toggleTab}
      formControl={state[`${activeTab}Form`]}
      formName={`${activeTab}Form`}
      handleChange={handleChange}
      inputs={inputs}
      onSubmit={(e) => handleSubmit(e, activeTab)}
    />
  )
}

export default App;
