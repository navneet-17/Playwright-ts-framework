export function convertToISTTime(datePassed?: Date): string  {
  const date = datePassed || new Date();

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); 
  const yyyy = date.getFullYear();
  
  const hr = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');

  return `IST-${dd}-${mm}-${yyyy}_${hr}:${min}:${sec}`;
}