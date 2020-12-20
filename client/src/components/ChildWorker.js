import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import worker from "../worker.js";
import WebWorker from "../workerSetup";

class ChildWorker extends Component {
  constructor(props) {
    super(props);
    this.key = this.props.keys;
  }

  fetchWebWorker = () => {
    this.worker.postMessage(this.key);

    this.worker.addEventListener("message", event => {
      console.log("main received : " + event.data)
    });
  };

  componentDidMount = () => {
    this.worker = new WebWorker(worker);
  };

  render() {
    return (
      <div className="App-bottom">

        <section className="App-right">
          <ReactCountdownClock
            seconds={100}
            color="#e56"
            alpha={0.9}
            size={300}
          />
          <button className="btn-worker" onClick={this.fetchWebWorker}>
            Fetch Users with Web Worker
          </button>
        </section>
      </div>
    );
  }
}

export default ChildWorker;