import Image from 'next/image'
import '../components/css/header.css'
import logo from '../public/sale-logo.svg'
import Link from 'next/link'

export default function Header() {
  return <header>
    <nav>
      <a href='#main' >O nama</a>
      <a href='#services' >Usluge</a>
    </nav>
    <div className="nav-logo" >
      <Image
        src={logo}
        alt={"logo"}
        height={90}
      />
    </div>
    <nav>
      <a href='#footer' >Kontakt</a>
    </nav>
    <Link href='/select' ><button>Zakazivanje</button></Link>
  </header>
}