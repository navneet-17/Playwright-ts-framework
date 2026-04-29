import {getCurrentTime} from '../../src/utils/DateTimeUtil'

console.log("Testing IST time from framework's date_time utility file: \t", getCurrentTime(),"\n")

console.log("Generating a local IST date/time format here:")
const now = new Date();

const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0'); 
const yyyy = now.getFullYear();
  
const hr = String(now.getHours()).padStart(2, '0');
const min = String(now.getMinutes()).padStart(2, '0');
const sec = String(now.getSeconds()).padStart(2, '0');

const getCurrentTime1 = `Indian Standard Time format: \t ${dd}-${mm}-${yyyy}_${hr}_${min}_${sec}`;

console.log ('Default full Date and Time \t', now ) 
console.log(getCurrentTime1)


