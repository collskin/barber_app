import './css/input.css'

export const Input = ({ label, onChange, value, type, placeholder, border, admin }: IInput) => {
    return <div className="input-container"  >
        <p className={"input-label" + (admin ? ' admin-label' : '')} style={border ? { color: '#101010' } : {}} >{label}</p>
        <input className='input' style={border ? { border: '1px solid grey', borderRadius: 5 } : {}} type={type} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
}

interface IInput {
    label: string
    onChange: any
    value: string | number
    type: string
    placeholder: string
    border?: boolean
    admin?: boolean
}