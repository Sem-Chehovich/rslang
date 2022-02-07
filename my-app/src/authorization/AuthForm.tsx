import React from 'react';
import { useState } from 'react';
import './AuthForm.css';
import { signUpUser, signInUser } from './api';
import { getErrorMessage } from './errorMessages';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formType, setFormType] = useState('Sign in');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'Sign up') {
      const newUser = { name: name, email: email, password: password };
      const creationResult = await signUpUser(newUser);

      if (typeof creationResult === 'number') { 
        setMessage(getErrorMessage(creationResult));
      } else { 
        const user = { email: email, password: password };
        const result = await signInUser(user);

        if (typeof result === 'number') { 
          setMessage(getErrorMessage(result));
        } else { 
          setMessage('');
          navigate('/home');
        }
      }
    }

    if (formType === 'Sign in') {
      const user = { email: email, password: password };
      const result = await signInUser(user);
      
      if (typeof result === 'number') { 
        setMessage(getErrorMessage(result));
      } else { 
        setMessage('');   
        navigate('/home');
      }
    }
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'Sign in')  {
      setFormType('Sign up');
      setMessage('');
    } else { 
      setFormType('Sign in');
      setMessage('');
    }
  }

  return (
    <div className='form-page'>
      <div className='form-container'>
        <div className='form-container__box'>
          <h2 className='form-container__title'>{ formType }</h2>
          { message && <p className='error-message'>{ message }</p> }
          <form className='auth-form' onSubmit={handleSubmit}>
            { formType === 'Sign up' ?
              (<div>
                <label className='auth-form__label' htmlFor='name'>Name:</label>
                <input 
                  className='auth-form__input' 
                  type='name'
                  required 
                  placeholder='User name'
                  id='name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>) : ''
            }
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
              <a className='auth-form__link' href='/' onClick={handleClick} >
                { formType === 'Sign in' ? 'Sign up' : 'Sign in' }
              </a>
            </div>    
            <button className='auth-form__btn'>{formType}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default AuthForm;
