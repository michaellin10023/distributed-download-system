import React, { useState } from "react";
import worker from "../worker.js";
import WebWorker from "../workerSetup";

const ChildWorker = (props) => {

  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState(null);
  
  const key = props.keys;
  const myworker = new WebWorker(worker);

  const fetchWebWorker = () => {
    myworker.postMessage(key);
    myworker.addEventListener("message", event => {
      setFetched(true);
      setData(event.data);
    });
  };

  const renderResult = () => {
    if(fetched){
        return <input className="mt-5" onClick={props.parentCallback} value={data}/>
    } else {
        return <div> Haven't fetch anything yet</div>
    }
  }

  return (
    <div className="App-bottom">
      <section className="App-right">
        <button className="btn-worker" onClick={fetchWebWorker}>
          Fetch data with Web Worker
        </button>
        <br></br>
        {renderResult()}
      </section>
    </div>
  )
}

export default ChildWorker;