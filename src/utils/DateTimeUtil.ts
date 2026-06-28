export function convertToISTTime(datePassed?: Date | string): string  {
  // ✅ Handle both Date objects and ISO strings
  let date: Date;
  
  if (!datePassed) {
    date = new Date();
  } else if (typeof datePassed === 'string') {
    date = new Date(datePassed);  // Parse ISO string to Date
  } else {
    date = datePassed;  // Already a Date object
  }

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); 
  const yyyy = date.getFullYear();
  
  const hr = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');

  return `IST-${dd}-${mm}-${yyyy}_${hr}:${min}:${sec}`;
}