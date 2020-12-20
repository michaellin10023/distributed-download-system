import React from 'react';
import { Fragment, useState } from 'react';
import ChildWorker from './ChildWorker';


const unique_keys = ["421f7b70-4292-11eb-898c-cbcdf2f5515b0"]

const DownloadFile = () => {

    const [url, setUrl] = useState("");
    const [parts, setParts] = useState("");
    const [keys, setKeys] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { url, parts };
            const response = await fetch("http://localhost:3000/download", {
                method: "POST",
                headers: {"Content-Type" : "application/arraybuffer"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setKeys(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error('something is wrong', err.message)
        }
    }
    
    // const unique_keys = JSON.stringify(keys.keys)
    console.log(keys.keys)

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

            <div>
                { unique_keys.map((key) => <ChildWorker keys={key}/>) }
            </div>
        </div>
        );
}

export default DownloadFile;