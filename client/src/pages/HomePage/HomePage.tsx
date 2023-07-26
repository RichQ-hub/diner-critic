import './HomePage.css';
import titleImg from '../../assets/images/title.png';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <main>
            <section className='hero'>
                <div className="hero-desc">
                    <div className="hero-desc__title">
                        <img className="hero-desc__img" src={titleImg} alt="idk" />
                    </div>
                    <div className="hero-desc__text-box">
                        <p>Grill, roast, or appreciate any restaurant you desire!</p>
                        <Link className="hero-desc__text-box__link" to="restaurants">
                            <p>Start Reviewing Restaurants</p>
                        </Link>
                    </div>
                </div>
            </section>
            <section className='socials'></section>
        </main>
    )
}
