import React, { useEffect } from "react"
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import{auth} from "./firebase"
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from "./Orders";

const promise = loadStripe("pk_test_51M8ke8SJbbkV9nh9Fov8eymPNSVD7dV2cfkteWjvgQcj5BBOObVKadIAd3OcD3RJrF3f3MRSQR2mKaEk4axwikKo00E5wGNkfh");

function App() {
   const [{},dispatch] = useStateValue();

   useEffect(() =>{
      //will only run once when the app component loads
     auth.onAuthStateChanged(authUser =>{
         console.log('THE USER IS >>>',authUser);

         if(authUser){
            //the user just logged in/the user was logged in
            dispatch({
               type:'SET_USER',
               user:authUser
            })
         }else {
            //the user is logged out
            dispatch({
               type:'SET_USER',
               user:null
            })
         }
     })
   },[])

  return (
    <Router>
     {/* //BEM convention */}
      <div className="app">
      
      <Routes>

             {/* orders     */}
             <Route path="/orders" element={[<Header/>,<Orders/>]}>

             </Route>

          {/* loginpage     */}
          <Route path="/login" element={<Login/>}>

          </Route>

          {/* Checkout page */}
          <Route path="/checkout" element={[<Header/>,<Checkout/>]}>
             {/* <Checkout/> */}
          
          </Route>
          <Route path="/payment" element={[<Header/>,
          <Elements stripe={promise}>
               <Payment/>
          </Elements>
          ]}>
          
             {/* <Payment/> */}
          
          </Route>

       {/* This is default route and should be at the bottom */}
         
          <Route path="/" element={[<Header/>,<Home/>]}>   
              {/*Header */}
              {/* <Header /> */}
              {/*Home */}
              {/* <Home /> */}
          </Route>
       </Routes>
       </div>

    </Router>
  );
}

export default App;
