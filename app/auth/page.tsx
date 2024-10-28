'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import './style.css'
import { Input } from '@/components/Input'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import useAuth from '../context/useAuth'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Auth() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const btn = useRef(null)
    const { setToken, token } = useAuth()

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            (btn.current as any).click()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (token) {
            router.push("/admin");
        }
    }, [token])


    const handleLogin = async () => {
        try {
            setLoading(true)
            const resp = await axios.post('/api/auth', { username: email, password })
            setLoading(false)
            setToken(resp.data.message)
        } catch (error: any) {
            if (error.status == 401) {
                toast.error('Neispravni kredencijali.')
            } else {
                console.log(error)
                toast.error('Grekša na serveru')
            }
            console.log(error)
            setLoading(false)

        }
    }
    return <div className="auth-container" >
        <ToastContainer />

        <ClipLoader
            loading={loading}
            color={'#1c7aad'}
            cssOverride={{
                position: "fixed",
                top: '50%',
                left: '50%',
                transform: 'translate(-50% -50%)',
                opacity: 1
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <div className='auth-inputs' >
            <Input admin type='email' placeholder='Unesite email' label='E-mail' value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <Input admin type='password' placeholder='Unesite lozinku' label='Lozinka' value={password} onChange={(e: any) => setPassword(e.target.value)} />
            <div ref={btn} className='login-button' onClick={handleLogin} >Prijava</div>
        </div>
    </div>
}