import { ChooseBarber } from './sections/ChooseBarber'
import './style.css'

export default function Book() {
    return <div className="book-container">

        <div className='book-wrapper' >
            <div className='numbers' >
                <div className='single-number' >1</div>
                <div className='single-number' >2</div>
                <div className='single-number' >3</div>
                <div className='single-number' >4</div>
            </div>
            <ChooseBarber />
        </div>
    </div>
}