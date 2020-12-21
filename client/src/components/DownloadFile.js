import { userInfo } from 'os';
import React from 'react';
import { Fragment, useState } from 'react';
import ChildWorker from './ChildWorker';
import MergeResult from './MergeResult'

const DownloadFile = () => {

    const [url, setUrl] = useState("");
    const [isFetched, setIsFetched] = useState(false);
    const [parts, setParts] = useState("");
    const [keys, setKeys] = useState([]);
    const [result, setResult] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { url, parts };
            // console.log("body", body)
            const response = await fetch("http://localhost:3000/download", {
                method: "POST",
                headers: {"Content-Type" : "application/json"}, // can't use application/arraybuffer!!!
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setIsFetched(true);
            setKeys(jsonData);
        } catch (err) {
            console.error('something is wrong', err.message)
        }
    }

    const parentCallback = (e) => {
        setResult(e.target.value);
    }

    const renderChildWorker = () => {
        if(isFetched){
            return Object.values(keys.keys).map((key) => 
            <div className="text-center mt-5" key={key}>
                <ChildWorker keys={key} parentCallback={parentCallback}/>
            </div>)
        } else {
            return <div> Haven't fetch anything yet</div>
        }
    }

    return (
        <div>
            <Fragment>
            <h1 className="text-center mt-5">Let's send a request to the server!</h1>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input placeholder="Url" type="text" className="form-control" value={url} onChange={e => setUrl(e.target.value)}></input>
                <input placeholder="numbers of partitions" type="text" className="form-control" value={parts} onChange={e => setParts(e.target.value)}></input>
                <button className="btn btn-success">Download</button>
            </form>
            </Fragment>
            <Fragment>
                <h1 className="text-center mt-5"> Unique keys: </h1>
                {JSON.stringify(keys.keys)}
            </Fragment>

            <div className="text-center mt-5">
                <p1>Web worker waiting...</p1>
                { renderChildWorker() }
            </div>
            <MergeResult/>
            {result}
        </div>
        );
}

export default DownloadFile;