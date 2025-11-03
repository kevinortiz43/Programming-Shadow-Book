// addTwoNos.mjs
function addTwo(num) {
 return num + 4;
}
export { addTwo };
// app.js
import { addTwo } from './addTwoNos.mjs';
// Prints: 8
console.log(addTwo(4));
