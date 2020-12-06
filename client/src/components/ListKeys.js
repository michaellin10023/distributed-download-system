import React, { Fragment, useEffect, useState } from 'react';

const ListKeys = () => {

    const getKeys = async () => {
        try {
            const response = await fetch("http://localhost:5000/download");
            const jsonData = await response.json();
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    return(
        <div>
            <div className="text-center mt-5">Unique keys...</div>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>Partition</th>
                        <th>uid</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*<tr>
                        <td>John</td>
                        <td>Doe</td>
                    </tr> */}
                    {
                        <tr>
                            <td>1</td>
                            <td>{keys.id}</td>
                        </tr>
                    }
                    </tbody>
                </table>
        </div>
    );
}

export default ListKeys;