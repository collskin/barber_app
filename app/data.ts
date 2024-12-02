import dayjs from "dayjs";
import { IAppointmentResponse } from "./admin/types";
import { Barber, IBarberWithServicesObject } from "./models/Barber";

export const servicesList = [
    { name: "Šišanje", price: 800, id: 1 },
    { name: "Šišanje + Brijanje brade", price: 1200, id: 2 },
    { name: "Brijanje brade", price: 800, id: 3 },
    { name: "Šišanje + Pranje kose", price: 1000, id: 4 },
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

export const generateTimeSlots = (
): string[] => {

  const start = 9 * 60; // 9:00 AM in minutes
  const end = 17 * 60 + 30; // 5:30 PM in minutes
  const interval = 30; // 30 minutes
  
  const times: string[] = [];
  let current = start;

  while (current <= end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    times.push(time);
    current += interval;
  }

  return ['08:30' ,...times.filter(t=>t!=='13:30')];
};

export const months = ['Januar','Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}


export const getTakenTimes = (resp:IBarberWithServicesObject[]) =>{

  const times = []
  for(let r of resp){
      const scheduleArray = generateTimeSlots()
      let startIndex = scheduleArray.indexOf(String(r.time[0]));
      if (startIndex === -1) {
          throw new Error("Start time not found in the schedule array.");
      }
      const totalSlots = r.servicesDetails.reduce((a,c) => a+c.slots,0)


      for (let i = 0; i < totalSlots; i++) {
          let currentIndex = startIndex + i;
          if (currentIndex < scheduleArray.length) {
              times.push(scheduleArray[currentIndex]);
          } else {
              break; 
          }
      }
  }

  //@ts-ignore
   return [...new Set(times)]

}

export const formatDate = (date:Date |string) =>{
  const dt = new Date(date)
  return dt.getMonth()+1+'/'+dt.getDate()+'/'+dt.getFullYear()
}


export function sortAppointmentsByFirstTime(appointments: IAppointmentResponse[]): IAppointmentResponse[] {
  return appointments.sort((a, b) => {
    // Extract the first time from both arrays
    const timeA = a.time[0];
    const timeB = b.time[0];

    // Use localeCompare to compare the times
    return timeA.localeCompare(timeB);
  });
}

export const isBeforeNov = (date?:Date) =>{
  const dt = date ?? new Date()
  const month = dt.getMonth()
  const year = dt.getFullYear()

  if((year == 2024 && month < 10)){
    return true
  }

  return false

}

export function getNextWorkdayDate() {
  const today = new Date();
  let day = today.getDay(); // 0 = Sunday, 6 = Saturday

  // If today is Saturday (6), add 2 days to reach Monday (1).
  // If today is Sunday (0), add 1 day to reach Monday (1).
  if (day === 6) {
      today.setDate(today.getDate() + 2);
  } else if (day === 0) {
      today.setDate(today.getDate() + 1);
  }

  return today;
}

export const getFirstWorkdayOfMonth = () => {
  const firstDayOfMonth = dayjs().startOf('month');
  const dayOfWeek = firstDayOfMonth.day();

  // If the first day is Saturday (6), add 2 days to make it Monday
  // If the first day is Sunday (0), add 1 day to make it Monday
  if (dayOfWeek === 6) {
      return firstDayOfMonth.add(2, 'day');
  } else if (dayOfWeek === 0) {
      return firstDayOfMonth.add(1, 'day');
  }
  return firstDayOfMonth;
};