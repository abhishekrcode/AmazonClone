import React, { useState } from 'react'
import "./Login.css"
import {Link,useNavigate} from "react-router-dom";
import {auth} from './firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';

function Login() {
    
    const navigate = useNavigate(); //yaha par useHistory() ke jagah useNavigate() kiya hai v6 mai yeh support karta hai -->yeh redirect to home page ke liye hai jab login karlenge tho home page par redirect kar dega
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        //some fancy firebase things..

        signInWithEmailAndPassword(auth,email,password)
        .then(auth =>{
            navigate('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        //do some fancy firebase register things....

        
            createUserWithEmailAndPassword(auth,email,password)
            .then((auth) =>{
                //successfully created a new user with email ans password.
                console.log(auth);  
                if(auth){
                    navigate('/')
                }
            })
        .catch(error => alert(error.message))
    }


  return (
    <div className='login'>
      <Link to='/'>
            <img  className='login__logo'
                    src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png'
                alt=''
            />       
      </Link>  

      <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type='password' value ={password} onChange = {e => setPassword(e.target.value)} />

                <button type='submit' onClick={signIn}
                className='login__signInButton'>Sign In</button>

            </form>
            <p>
            By signing-in you agree the Amazon's condition of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
             </p>

             <button onClick={register}
             className='login__registerButton'>Create your Amazon Account</button>

      </div>  



    </div>
  )
}

export default Login;
