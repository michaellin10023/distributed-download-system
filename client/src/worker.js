/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */
export default () => {
    self.addEventListener("message", async e => {
        if (!e) return;
        console.log("worker received : " + e.data);
        const key = e.data;

        // fetch request here
        await fetch(`http://localhost:3000/download/${key}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data[0][0].parts.data);
            postMessage("hello main! fetch is done!");
            postMessage(data[0][0].parts.data)
        })
        .catch(e => console.log('something is wrong', e.message))
        
        // const body = await response.json();
        // console.log(body)
        
    });
  };