export interface IAppointmentResponse{
    barberName:string
    clientEmail:string
    clientName:string
    clientPhone:string
    confirmed:boolean
    date:string
    services:IServiceResponse[]
    time:string[]
    _id?:string
}

export interface IServiceResponse{
   name:string
   price:number | null
   slots:number
   _id:string
}
