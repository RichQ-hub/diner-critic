import './LoginPage.css';
import logoLarge from '../../assets/images/nav-logo-large.png';
import { Link } from 'react-router-dom';
import { useFormInputText } from '../../hooks/useFormInputText';

export default function LoginPage() {
    const email = useFormInputText();
    const password = useFormInputText();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
    }

    return (
        <main className="rest-login-page">
            <section className='auth-box'>
                <img src={logoLarge} alt="" className='auth-box__logo' />

                <form action="" className='login-details' onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className='auth-details__item'>
                        <h2>Email <span className='required-field'>*</span></h2>
                        <div className='auth-item__input-wrapper'>
                            <input type="text" className='auth-input--bg' required onChange={email.handleChange} />
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="auth-details__item">
                        <h2>Password <span className='required-field'>*</span></h2>
                        <div className='auth-item__input-wrapper'>
                            <input type="password" className='auth-input--bg' required onChange={password.handleChange} />
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button type='submit' className='auth-details__btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                        <p>Login</p>
                    </button>

                    {/* Signup text. */}
                    <p className='login-details__signup'>Don't have an account? 
                        <Link to='/auth/register' className='register-link'>Sign Up</Link>
                    </p>
                </form>
            </section>
        </main>
    )
}