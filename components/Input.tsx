import './css/input.css'

export const Input = ({ label, onChange, value, type, placeholder }: IInput) => {
    return <div className="input-container" >
        <p className="input-label" >{label}</p>
        <input className='input' type={type} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
}

interface IInput {
    label: string
    onChange: any
    value: string
    type: string
    placeholder: string
}