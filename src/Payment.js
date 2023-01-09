import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { db } from './firebase';
import { setDoc, doc,add} from "firebase/firestore";
function Payment() {
    // const history = useHistory();
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which alloes us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //Stripe exceps the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket]);
 
  console.log("The Secret is >>>", clientSecret);

  const handleSubmit = async (event) => {
    //do all the fancy stuff..
    event.preventDefault();
    setProcessing(true);
    

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
         card: elements.getElement(CardElement),
        }
      }).then( ({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        })

        // await setDoc(doc(db,'users',user.uid),doc('orders',paymentIntent.id),({
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created
        // }))

        setSucceeded(true);
        setError(null);
        setProcessing(false);


        dispatch({
            type:'EMPTY_BASKET'
        })

        // history.replace('/orders')
        navigate('/orders', { replace: true });
       
      });
  };

  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          checkout (<Link to="/checkout">{basket?.length} item</Link>)
        </h1>

        {/* Payment section for dilevery Adress */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Delhi,India</p>
          </div>
        </div>

        {/* Payment section for dilevery Adress */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review item and Delivery</h3>
          </div>
          <div className="payment__item">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section for dilevery Adress */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement 
                    onChange={handleChange} 

              />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3> Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled = {processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* ERROR */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
