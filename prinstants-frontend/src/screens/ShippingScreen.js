import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {saveShipping} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen(props) {
        const [address, setAddress] = useState('');
        const [country, setCountry] = useState('');
        const [city, setCity] = useState('');
        const [postalCode, setPostalCode] = useState('');
        // const [aptNum, setAptNum] = useState('');
        // const [state, setState] = useState('');
        // const [billingAddress, setBillingAddress] = useState('');
        // const [billingCountry, setBillingCountry] = useState('');
        // const [billingAptNum, setBillingAptNum] = useState('');
        // const [billingCity, setBillingCity] = useState('');
        // const [billingState, setBillingState] = useState('');
        // const [billingZip, setBillingZip] = useState('');
        const dispatch = useDispatch();


/* --------------- use later for setting this info if supplied -------------- */

//     useEffect(() => {
//             if(userInfo){
//                     props.history.push(redirect)
//             }
//         return ()=> {
            
//         };
//     }, [userInfo]);

   const submitHandler = (e) => {
           e.preventDefault();
           dispatch(saveShipping({address, city, country, postalCode}));
           props.history.push('payment')
   }

    return  (
            <div>  
                    
                <CheckoutSteps step1 step2 ></CheckoutSteps>
                   
                    <div className="form">
                            <form onSubmit={submitHandler}>
                                    <ul className="form-container">
                                            <h2>Shipping</h2>
                                            <li>
                                                    <label htmlFor="address">
                                                            Address
                                                    </label>
                                                    <input required={true} type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="country">
                                                            Country
                                                    </label>
                                                    <input required={true} type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)}>
                                                    </input>
                                            </li>
                                            {/* <li>
                                                    <label htmlFor="aptNum">
                                                            Apt. #
                                                    </label>
                                                    <input type="text" name="aptNum" id="aptNum" onChange={(e) => setAptNum(e.target.value)}>
                                                    </input>
                                            </li> */}
                                            <li>
                                                    <label htmlFor="city">
                                                            City
                                                    </label>
                                                    <input required={true} type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)}>
                                                    </input>
                                            </li>
                                            {/* <li>
                                                    <label htmlFor="state">
                                                            State
                                                    </label>
                                                    <input required={true} type="text" id="state" name="state" onChange={(e) => setState(e.target.value)}>
                                                    </input>
                                                </li> */}
                                                <li>
                                                        <label htmlFor="postalCode">
                                                                Postal Code
                                                        </label>
                                                        <input required={true} type="number" id="postalCode" name="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
                                                        </input>
                                                </li>
                                                <li>
                                                        <button type="submit" className="button primary">Proceed to Payment</button>
                                                </li>
                                    </ul>
                            </form>
                    </div>
                    {/* <div className="form">
                            <form onSubmit={submitHandler}>
                                    <ul className="form-container">
                                            <h2>Billing</h2>
                                            <li>
                                                    <label htmlFor="billing-address">
                                                            Address
                                                    </label>
                                                    <input required={true} type="text" name="billing-address" id="billing-address" onChange={(e) => setBillingAddress(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="billing-country">
                                                            Country
                                                    </label>
                                                    <input required={true} type="text" id="billing-country" name="billing-country" onChange={(e) => setBillingCountry(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="billing-billing-aptNum">
                                                            Apt. #
                                                    </label>
                                                    <input type="text" name="billing-billing-aptNum" id="billing-billing-aptNum" onChange={(e) => setBillingAptNum(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="billing-city">
                                                            City
                                                    </label>
                                                    <input required={true} type="text" id="billing-city" name="billing-city" onChange={(e) => setBillingCity(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="billing-state">
                                                            State
                                                    </label>
                                                    <input required={true} type="text" id="billing-state" name="billing-state" onChange={(e) => setBillingState(e.target.value)}>
                                                    </input>
                                                </li>
                                                <li>
                                                        <label htmlFor="billing-zip">
                                                                Zip Code
                                                        </label>
                                                        <input required={true} type="text" id="billing-zip" name="billing-zip" onChange={(e) => setBillingZip(e.target.value)}>
                                                        </input>
                                                </li>
                                            
                                    </ul>
                            </form>
                    </div> */}

                    {/* <Link to="/payments" type="submit" className="button primary">Proceed to Payment</Link> */}

            </div>
    )
    
}

export default ShippingScreen


