import './css/input.css'

export const Select = ({ label, onChange, value, border, options }: ISelect) => {

    console.log(options)

    return <div className="input-container"  >
        <p className="input-label" style={{ color: '#101010' }} >{label}</p>
        <select style={{ border: '1px solid grey', color: '#101010', width: '100%', height: '2rem', padding: '5px', borderRadius: 5 }} value={value} onChange={onChange} >
            {options.map(o => <option value={o} >{o}</option>)}
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
}