// Write your code here

import {Component} from 'react'

import './index.css'

const initialSate = {
  isTimerRunning: false,
  timeInSeconds: 0,
  timeInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialSate

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  decreaseTimerLimit = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  IncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeInSeconds, timeInMinutes} = this.state

    const isTimeCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  OnStartOrPause = () => {
    const {isTimerRunning, timeInSeconds, timeInMinutes} = this.state

    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  OnReset = () => {
    this.clearTimerInterval()
    this.setState(initialSate)
  }

  renderTimerLimitController = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonDisabled = timeInSeconds > 0

    return (
      <div className="limit-container">
        <p className="limit-text">Set Timer limit</p>
        <div className="increase-and-decrease-container">
          <button
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.decreaseTimerLimit}
            type="button"
          >
            -
          </button>
          <div className="limit-label-container">
            <p className="limit-value">{timeInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.IncreaseTimerLimit}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrpauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-control-container">
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.OnStartOrPause}
        >
          <img src={startOrpauseImgUrl} alt={altText} className="image-icon" />
          <p className="image-text">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.OnReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="image-icon"
          />
          <p className="image-text">Reset</p>
        </button>
      </div>
    )
  }

  setTimeSecondsFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingTime = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingTime / 60)
    const seconds = Math.floor(totalRemainingTime % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">{this.setTimeSecondsFormat()}</h1>
              <p className="label-text">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
