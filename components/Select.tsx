import './css/input.css'

export const Select = ({ label, onChange, value, options, admin, adminDate }: ISelect) => {


    return <div className="input-container" style={adminDate ? { width: '100%' } : {}} >
        <p className={"input-label" + (admin ? ' admin-label' : '')} style={{ color: '#101010' }} >{label}</p>
        <select className={admin ? 'admin-select' : ''} value={value} onChange={onChange} >
            {options.map(o => <option key={o} value={o} >{o}</option>)}
        </select>
        {/* <input className='input' style={border ? { border: '1px solid grey' } : {}} type={type} value={value} placeholder={placeholder} onChange={onChange} /> */}
    </div>
}

interface ISelect {
    label: string
    onChange: any
    value: string
    border?: boolean
    options: string[]
    admin?: boolean
    adminDate?: boolean
}