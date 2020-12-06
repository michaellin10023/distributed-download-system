import React, {Fragment} from 'react';

const DownloadPart = () => {
    return (
        <Fragment>
            <h1 className="text-center mt-5">Download Part here</h1>
            <form className="d-flex">
                <input placeholder="id" type="text" className="form-control"></input>
                <input placeholder="index" type="text" className="form-control"></input>
                <button className="btn btn-success">Download</button>
            </form>
        </Fragment>
    );
}

export default DownloadPart;