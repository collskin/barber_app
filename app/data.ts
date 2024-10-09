export const servicesList = [
    { name: "Haircut", price: 800, id: 1 },
    { name: "Haircut + Beard Trim", price: 1200, id: 2 },
    { name: "Beard Trim", price: 800, id: 3 },
    { name: "Haircut + Washing Hair", price: 1000, id: 4 },
  ];


  export const  objectToQueryParams = (obj:any) => {
    const queryParams = new URLSearchParams();
  
    Object.keys(obj).forEach(key => {
      const value = obj[key];
  
      if (Array.isArray(value)) {
        queryParams.append(key, value.join(','));
      } else {
        queryParams.append(key, value);
      }
    });
  
    return '?'+queryParams.toString();
  }

  export const convertToDate = (d: Date) => {
    d = new Date(d)
    return (
      addZero(d.getDate()) +
      ". " +
      addZero(d.getMonth() + 1) +
      ". " +
      d.getFullYear() +
      ". "
    );
  };


export const addZero = (num: string | number) => {
  if (Number(num) <= 9) {
    return '0' + num.toString()
  }
  return num
}

export const formatDateForPickerValue = (date: Date) => {
  // Ensure double-digit months, days, hours, and minutes
  const pad = (n:any) => (n < 10 ? "0" + n : n);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Month is zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0'); // Pad single digits with leading zero

  return `${year}-${month}-${day}`;
}