"use client";
import { useState } from 'react';
import '../login.css';
import img from '../../../public/images/home.jpeg';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // For routing

export default function Ownerregister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Show alert or modern dialog
        alert('Login successful!');

        // Store user info securely in localStorage or cookies
        localStorage.setItem('user', JSON.stringify({ token: data.token }));

        // Navigate to homepage after successful login
        router.push('/');
      } else {
        // Show error in alert
        alert(`Login error: ${data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Show success alert
        alert('Signup successful!');

        // Clear fields after pressing OK on alert
        setName('');
        setEmail('');
        setPassword('');
      } else {
        // Show error in alert
        alert(`Signup error: ${data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, please try again.');
    }
  };

  return (
    <>
      <div className='panel1'>
        <div className='container'>
          <input type='checkbox' id='flip' />
          <div className='cover'>
            <div className='front'>
              <Image src={img} alt='' />
            </div>
            <div className='back'>
              <Image className='backImg' src={img} alt='' />
            </div>
          </div>
          <div className='forms'>
            <div className='form-content'>
              <div className='login-form'>
                <div className='title'>Login as Owner</div>
                <form action='#'>
                  <div className='input-boxes'>
                    <div className='input-box'>
                      <i className='fas fa-envelope' />
                      <input
                        type='text'
                        placeholder='Enter your email'
                        required=''
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='input-box'>
                      <i className='fas fa-lock' />
                      <input
                        type='password'
                        placeholder='Enter your password'
                        required=''
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='text'>
                      <a href='#'>Forgot password?</a>
                    </div>
                    <div className='button input-box'>
                      <input
                        type='submit'
                        value='Submit'
                        onClick={handleLogin}
                      />
                    </div>
                    <div className='text sign-up-text'>
                      Don't have an account?{' '}
                      <label htmlFor='flip'>Signup now</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className='signup-form'>
                <div className='title'>Signup as Owner</div>
                <form action='#'>
                  <div className='input-boxes'>
                    <div className='input-box'>
                      <i className='fas fa-user' />
                      <input
                        type='text'
                        placeholder='Enter your name'
                        required=''
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='input-box'>
                      <i className='fas fa-envelope' />
                      <input
                        type='text'
                        placeholder='Enter your email'
                        required=''
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='input-box'>
                      <i className='fas fa-lock' />
                      <input
                        type='password'
                        placeholder='Enter your password'
                        required=''
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='button input-box'>
                      <input
                        type='submit'
                        value='Submit'
                        onClick={handleSignup}
                      />
                    </div>
                    <div className='text sign-up-text'>
                      Already have an account?{' '}
                      <label htmlFor='flip'>Login now</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
