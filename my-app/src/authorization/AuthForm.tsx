import { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className='form-page'>
      <div className='form-container'>
        <div className='form-container__box'>
          <h2 className='form-container__title'>Sign in</h2>
          <form className='auth-form' onSubmit={handleSubmit}>
            <div>
              <label className='auth-form__label' htmlFor='email'>Email:</label>
              <input 
                className='auth-form__input' 
                type='email' 
                required 
                placeholder='Email'
                id='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className='auth-form__label' htmlFor='password'>Password:</label>
              <input 
                className='auth-form__input' 
                type='password' 
                required 
                placeholder='Password'
                min={8}
                id='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className='auth-form__register'>
              <a className='auth-form__link' href='/' onClick={handleClick} >Sign in</a>
            </div>    
            <button className='auth-form__btn'>Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default AuthForm;