import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom"
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";

function Header() {
const [{basket,user},dispatch] = useStateValue();

const handleAuthentication = () => {
    if(user){
        auth.signOut();
    }
}

  return (
    <div className="header">
    <Link to="/">
    <img
    className="header__logo" 
    src='https://pnggrid.com/wp-content/uploads/2021/05/Amazon-Logo-Transparent-1024x310.png'/>
    </Link>
   
   
   <div className="header__search">
    <input 
        className="header__searchInput"
        type="text"/>
        <SearchIcon
        className='header__searchIcon'/>
    {/*logo*/}
   </div>

   <div className="header__nav">
   <Link to={!user && "/login"}> {/*yaha par !user && "/login" karne se kya hua hai ki jab bhi log out par click karte the tho wo singpage par redirect ho jata tha but abaisa nehi hoga wo ussi page par rahega*/}
    <div onClick={handleAuthentication} 
         className="header__option">
        <span className="header__optionLineOne">Hello {user ? user.email:"Guest"}</span>
        <span className="header__optionLineTwo">{user ? 'Sign Out': 'Sign In'}</span> 
    </div>
   </Link>
   
    <Link to='/orders'>
        <div className="header__option">
            <span className="header__optionLineOne">Return</span>
            <span className="header__optionLineTwo">& Orders</span> 
    
        </div>
    </Link>
    
    <div className="header__option">
        <span className="header__optionLineOne">Your</span>
        <span className="header__optionLineTwo">Prime</span> 
    </div>

    <Link to="/checkout">
        <div className='header__optionBasket'>
            <ShoppingBasketIcon/>
            <span className="header__optionLineTwo header__basketCount">{basket.length}</span>  {/* ? yeh lagane ka matlab hai otional chaining if basket is undefined or not provide correct value then it will halde it gracefully*/}
        </div>
    </Link>

   
  
   </div>

    </div>
  )
}

export default Header;
