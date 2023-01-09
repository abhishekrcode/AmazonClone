import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './Orders.css'
import {useStateValue} from './StateProvider'
import Order from './Order'
// import { collection, setDoc ,doc ,orderBy  } from 'firebase/firestore/lite';
// import {doc, setDoc,orderBy,onSnapshot} from "firebase/firestore"
function Orders() {
    const [{basket,user},dispatch] = useStateValue();
    const [orders,setOrders] = useState([]);

    // console.log(user);
    // console.log(db);
    useEffect(  () => {
        if(user){
         db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created','desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data()
            })))
        ))

    //    setDoc(doc(db,"users",user?.uid),doc(db,"orders"),orderBy('created','desc'),
    //     onSnapshot(snapshot => (
    //             setOrders(snapshot.doc.map(doc =>({
    //                 id: doc.id,
    //                 data: doc.data()
    //             }))))) )

        } else {
            setOrders([])
        }
    },[user])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map(order =>(
            <Order order={order}/>
        ))}

      </div>
    </div>
  )
}

export default Orders
