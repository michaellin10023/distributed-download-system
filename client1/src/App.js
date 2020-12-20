import './App.css';
import React, {Fragment} from 'react';
import DownloadPart from './components/DownloadPart';
import DownloadFile from './components/DownloadFile';

function App() {
  return (
    <Fragment>
      <div className="container">
        <DownloadFile/>
        {/* <DownloadPart/> */}
      </div>
    </Fragment>
  );
}

export default App;
