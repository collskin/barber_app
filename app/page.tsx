import Image from 'next/image'
import logo from "../public/sale-logo.svg";
import './style.css'
import Header from '@/components/Header';
import { MapComponent } from '@/components/Map';
import { AnimatedDiv, AnimatedDivImg, AnimatedSection } from '@/components/AnimatedDiv';
import { MapProvider } from './providers/map-provider';
import Link from 'next/link'
import { ServicesList } from '@/components/ServicesList';

export default function Home() {
    return <>
        <Header />
        <main id='main' >
            <AnimatedDiv className='main-button' >
                <h1>SAŠA BARBER</h1>
                <h4>Frizerski salon u Kruševcu sa dugom  tradicijom <br />i bogatim iskustvom</h4>
                <Link href='select' ><button>ZAKAŽI</button></Link>
            </AnimatedDiv>
            <AnimatedDivImg className='main-img' >
                <Image
                    src={logo}
                    alt={"logo"}
                />
            </AnimatedDivImg>
        </main>
        <AnimatedSection id='services' className='services' >
            <AnimatedDiv>
                <h2>Usluge</h2>
                <p>Sve usluge koje salon pruža prikazane po trenutnim cenama</p>
            </AnimatedDiv>
            <ServicesList />
        </AnimatedSection>
        <footer id='footer' >
            <AnimatedDiv className='footer-info' >
                <AnimatedDiv>
                    <AnimatedDiv className='footer-info__image' >
                        <Image
                            src={logo}
                            alt={"logo"}
                            height={70}
                            width={70}
                        />
                        <h3>Sasa Barber</h3>
                    </AnimatedDiv>
                    <p>Frizerski salon u Kruševcu sa dugom  tradicijom <br /> i bogatim iskustvom</p>
                </AnimatedDiv>
                <div>
                    <p className='tel' >Kontakt: <span className='orange' ></span></p>
                    <p className='address' >+381 <span className='orange' >64 11 52 273</span></p>
                    <p className='address' >Cara Lazara 182, Kruševac</p>
                    <p className='tel' >Radno <span className='orange' >Vreme:</span></p>
                    <p className='address' >Ponedeljak - Petak <br />    08:30 - 18:00</p>
                </div>
            </AnimatedDiv>
            <AnimatedDiv className='map' >
                <MapProvider>
                    <MapComponent />
                </MapProvider>
            </AnimatedDiv>
        </footer>
    </>
}