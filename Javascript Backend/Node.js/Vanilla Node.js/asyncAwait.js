const axios = require('axios').default;
let url = "some remote url"
async function asyncCall() {
 console.log('calling');
 const result = await axios.get(url);
 console.log(result.data);
}
asyncCall();
