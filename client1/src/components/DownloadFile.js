import React from 'react';
import { Fragment, useState } from 'react';

const DownloadFile = () => {

    const [url, setUrl] = useState("");
    const [parts, setParts] = useState("");
    const [keys, setKeys] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { url, parts };
            const response = await fetch("http://localhost:5000/download", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setKeys(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    // const print = (keys) => {
        
    //     // let str = keys.toString();
    //     return JSON.stringify(keys);
    // }

    return (
        <div>
            <Fragment>
            <h1 className="text-center mt-5">Let's send a request to the server!</h1>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input placeholder="Url here" type="text" className="form-control" value={url} onChange={e => setUrl(e.target.value)}></input>
                <input placeholder="numbers of partitions" type="text" className="form-control" value={parts} onChange={e => setParts(e.target.value)}></input>
                <button className="btn btn-success">Download</button>
            </form>
            </Fragment>
            <Fragment>
                <h1 className="text-center mt-5"> Unique keys: </h1>
                {JSON.stringify(keys.keys)}
                {/* {keys.keys.toString()} */}
            </Fragment>
        </div>
        );
}

export default DownloadFile;