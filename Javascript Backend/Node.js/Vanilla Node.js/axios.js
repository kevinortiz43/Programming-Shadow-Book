const axios = require('axios').default;
const connectToURL=(url)=>{
 const req=axios.get(url);
 console.log(req);
 req.then(resp=>{
 console.log("Fulfilled");
 console.log(resp.data);
 })
 .catch(err=>{
 console.log("Rejected");
 });
}
connectToURL('valid-url')
connectToURL('invalid-url')
