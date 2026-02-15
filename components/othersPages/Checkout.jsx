// 'use client';
// import { useContextElement } from '@/context/Context';
// import Image from 'next/image';
// import Link from 'next/link';
// export default function Checkout() {
//   const { cartProducts, setCartProducts, totalPrice } = useContextElement();
//   return (
//     <section className="flat-spacing-11">
//       <div className="container">
//         <div className="tf-page-cart-wrap layout-2">
//           <div className="tf-page-cart-item">
//             <h5 className="fw-5 mb_20">Billing details</h5>
//             <form onSubmit={(e) => e.preventDefault()} className="form-checkout">
//               <div className="box grid-2">
//                 <fieldset className="fieldset">
//                   <label htmlFor="first-name">First Name</label>
//                   <input required type="text" id="first-name" placeholder="Themesflat" />
//                 </fieldset>
//                 <fieldset className="fieldset">
//                   <label htmlFor="last-name">Last Name</label>
//                   <input required type="text" id="last-name" />
//                 </fieldset>
//               </div>
//               <fieldset className="box fieldset">
//                 <label htmlFor="country">Country/Region</label>
//                 <div className="select-custom">
//                   <select required className="tf-select w-100" id="country" name="address[country]" data-default="">
//                     <option value="---" data-provinces="[]">
//                       ---
//                     </option>
//                     <option
//                       value="Australia"
//                       data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]">
//                       Australia
//                     </option>
//                     <option value="Austria" data-provinces="[]">
//                       Austria
//                     </option>
//                     <option value="Belgium" data-provinces="[]">
//                       Belgium
//                     </option>
//                     <option
//                       value="Canada"
//                       data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]">
//                       Canada
//                     </option>
//                     <option
//                       value="United Kingdom"
//                       data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]">
//                       United Kingdom
//                     </option>
//                     <option
//                       value="United States"
//                       data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]">
//                       United States
//                     </option>
//                     <option value="Vietnam" data-provinces="[]">
//                       Vietnam
//                     </option>
//                   </select>
//                 </div>
//               </fieldset>
//               <fieldset className="box fieldset">
//                 <label htmlFor="city">Town/City</label>
//                 <input required type="text" id="city" />
//               </fieldset>
//               <fieldset className="box fieldset">
//                 <label htmlFor="address">Address</label>
//                 <input required type="text" id="address" />
//               </fieldset>
//               <fieldset className="box fieldset">
//                 <label htmlFor="phone">Phone Number</label>
//                 <input required type="number" id="phone" />
//               </fieldset>
//               <fieldset className="box fieldset">
//                 <label htmlFor="email">Email</label>
//                 <input required type="email" autoComplete="abc@xyz.com" id="email" />
//               </fieldset>
//               <fieldset className="box fieldset">
//                 <label htmlFor="note">Order notes (optional)</label>
//                 <textarea name="note" id="note" defaultValue={''} />
//               </fieldset>
//             </form>
//           </div>
//           <div className="tf-page-cart-footer">
//             <div className="tf-cart-footer-inner">
//               <h5 className="fw-5 mb_20">Your order</h5>
//               <form onSubmit={(e) => e.preventDefault()} className="tf-page-cart-checkout widget-wrap-checkout">
//                 <ul className="wrap-checkout-product">
//                   {cartProducts.map((elm, i) => (
//                     <li key={i} className="checkout-product-item">
//                       <figure className="img-product">
//                         <Image alt="product" src={elm.imgSrc} width={720} height={1005} />
//                         <span className="quantity">{elm.quantity}</span>
//                       </figure>
//                       <div className="content">
//                         <div className="info">
//                           <p className="name">{elm.title}</p>
//                           <span className="variant">Brown / M</span>
//                         </div>
//                         <span className="price">${(elm.price * elm.quantity).toFixed(2)}</span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 {!cartProducts.length && (
//                   <div className="container">
//                     <div className="row align-items-center mt-5 mb-5">
//                       <div className="col-12 fs-18">Your shop cart is empty</div>
//                       <div className="col-12 mt-3">
//                         <Link
//                           href={`/shop-default`}
//                           className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                           style={{ width: 'fit-content' }}>
//                           Explore Products!
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div className="coupon-box">
//                   <input required type="text" placeholder="Discount code" />
//                   <a href="#" className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">
//                     Apply
//                   </a>
//                 </div>
//                 <div className="d-flex justify-content-between line pb_20">
//                   <h6 className="fw-5">Total</h6>
//                   <h6 className="total fw-5">$122.00</h6>
//                 </div>
//                 <div className="wd-check-payment">
//                   <div className="fieldset-radio mb_20">
//                     <input required type="radio" name="payment" id="bank" className="tf-check" defaultChecked />
//                     <label htmlFor="bank">Card Payments</label>
//                   </div>
//                   <div className="fieldset-radio mb_20">
//                     <input required type="radio" name="payment" id="delivery" className="tf-check" />
//                     <label htmlFor="delivery">Cash on delivery</label>
//                   </div>
//                   <p className="text_black-2 mb_20">
//                     Your personal data will be used to process your order, support your experience throughout this
//                     website, and for other purposes described in our
//                     <Link href={`/privacy-policy`} className="text-decoration-underline">
//                       privacy policy
//                     </Link>
//                     .
//                   </p>
//                   <div className="box-checkbox fieldset-radio mb_20">
//                     <input required type="checkbox" id="check-agree" className="tf-check" />
//                     <label htmlFor="check-agree" className="text_black-2">
//                       I have read and agree to the website
//                       <Link href={`/terms-conditions`} className="text-decoration-underline">
//                         terms and conditions
//                       </Link>
//                       .
//                     </label>
//                   </div>
//                 </div>
//                 <button className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center">
//                   Place order
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// 'use client';

// import { useMemo, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';

// import { useContextElement } from '@/context/Context';
// import { placeOrder } from '@/src/lib/api';
// import { cldCard, productPlaceholder } from '@/src/lib/cloudinary';

// export default function Checkout() {
//   const router = useRouter();
//   const { user, cartProducts, totalPrice } = useContextElement();

//   const isGuest = !user;

//   // -------------------------
//   // Form state (NO guestInfo section)
//   // -------------------------
//   const [billing, setBilling] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address_line: '',
//     city: '',
//     state: '',
//     postal_code: '',
//     country: 'Sri Lanka',
//   });

//   const [shippingSame, setShippingSame] = useState(true);

//   const [shipping, setShipping] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address_line: '',
//     city: '',
//     state: '',
//     postal_code: '',
//     country: 'Sri Lanka',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [agree, setAgree] = useState(false);
//   const [notes, setNotes] = useState('');

//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   // Prefill for logged user
//   useEffect(() => {
//     if (user) {
//       setBilling((p) => ({
//         ...p,
//         name: user?.name || p.name,
//         email: user?.email || p.email,
//       }));
//     }
//   }, [user?.id]);

//   const canSubmit = useMemo(() => {
//     if (!cartProducts.length) return false;
//     if (!agree) return false;

//     // billing required
//     if (!billing.name || !billing.address_line || !billing.city || !billing.postal_code || !billing.country)
//       return false;

//     // for guests, make email required (matches backend rule)
//     if (isGuest && !billing.email) return false;

//     // shipping required only if not same
//     if (!shippingSame) {
//       if (!shipping.name || !shipping.address_line || !shipping.city || !shipping.postal_code || !shipping.country)
//         return false;
//     }

//     return true;
//   }, [cartProducts.length, agree, billing, shippingSame, shipping, isGuest]);

//   const onPlaceOrder = async () => {
//     setErrorMsg('');

//     if (!canSubmit) {
//       setErrorMsg('Please fill required fields and accept terms.');
//       return;
//     }

//     const payload = {
//       payment_method: paymentMethod,
//       notes: notes || null,
//       shipping_same: shippingSame,

//       billing: {
//         name: billing.name,
//         email: billing.email || null,
//         phone: billing.phone || null,
//         address_line: billing.address_line,
//         city: billing.city,
//         state: billing.state || null,
//         postal_code: billing.postal_code,
//         country: billing.country,
//       },

//       ...(shippingSame
//         ? {}
//         : {
//             shipping: {
//               name: shipping.name,
//               email: shipping.email || null,
//               phone: shipping.phone || null,
//               address_line: shipping.address_line,
//               city: shipping.city,
//               state: shipping.state || null,
//               postal_code: shipping.postal_code,
//               country: shipping.country,
//             },
//           }),
//     };

//     try {
//       setSubmitting(true);
//       const res = await placeOrder(payload);

//       alert(`Order placed: ${res?.order?.order_number}`);
//       router.push('/');
//     } catch (e) {
//       setErrorMsg(e?.message || 'Checkout failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="flat-spacing-11">
//       <div className="container">
//         <div className="tf-page-cart-wrap layout-2">
//           {/* LEFT */}
//           <div className="tf-page-cart-item">
//             <h5 className="fw-5 mb_20">Billing details</h5>

//             {!!errorMsg && (
//               <div className="alert alert-danger" style={{ marginBottom: 16 }}>
//                 {errorMsg}
//               </div>
//             )}

//             <form onSubmit={(e) => e.preventDefault()} className="form-checkout">
//               {/* Billing */}
//               <fieldset className="box fieldset">
//                 <label>Full Name *</label>
//                 <input
//                   value={billing.name}
//                   onChange={(e) => setBilling((p) => ({ ...p, name: e.target.value }))}
//                   required
//                   type="text"
//                   placeholder="Your name"
//                 />
//               </fieldset>

//               <div className="box grid-2">
//                 <fieldset className="fieldset">
//                   <label>{isGuest ? 'Email *' : 'Email (optional)'}</label>
//                   <input
//                     value={billing.email}
//                     onChange={(e) => setBilling((p) => ({ ...p, email: e.target.value }))}
//                     type="email"
//                     placeholder="you@email.com"
//                     required={isGuest}
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <label>Phone (optional)</label>
//                   <input
//                     value={billing.phone}
//                     onChange={(e) => setBilling((p) => ({ ...p, phone: e.target.value }))}
//                     type="text"
//                     placeholder="+94..."
//                   />
//                 </fieldset>
//               </div>

//               <fieldset className="box fieldset">
//                 <label>Address *</label>
//                 <input
//                   value={billing.address_line}
//                   onChange={(e) => setBilling((p) => ({ ...p, address_line: e.target.value }))}
//                   required
//                   type="text"
//                   placeholder="No, Street, Area"
//                 />
//               </fieldset>

//               <div className="box grid-2">
//                 <fieldset className="fieldset">
//                   <label>Town/City *</label>
//                   <input
//                     value={billing.city}
//                     onChange={(e) => setBilling((p) => ({ ...p, city: e.target.value }))}
//                     required
//                     type="text"
//                     placeholder="Colombo"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <label>State (optional)</label>
//                   <input
//                     value={billing.state}
//                     onChange={(e) => setBilling((p) => ({ ...p, state: e.target.value }))}
//                     type="text"
//                     placeholder="Western"
//                   />
//                 </fieldset>
//               </div>

//               <div className="box grid-2">
//                 <fieldset className="fieldset">
//                   <label>Postal code *</label>
//                   <input
//                     value={billing.postal_code}
//                     onChange={(e) => setBilling((p) => ({ ...p, postal_code: e.target.value }))}
//                     required
//                     type="text"
//                     placeholder="10000"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset">
//                   <label>Country *</label>
//                   <input
//                     value={billing.country}
//                     onChange={(e) => setBilling((p) => ({ ...p, country: e.target.value }))}
//                     required
//                     type="text"
//                     placeholder="Sri Lanka"
//                   />
//                 </fieldset>
//               </div>

//               {/* Shipping toggle */}
//               <div className="box-checkbox fieldset-radio mb_20" style={{ marginTop: 10 }}>
//                 <input
//                   type="checkbox"
//                   id="ship-same"
//                   className="tf-check"
//                   checked={shippingSame}
//                   onChange={(e) => setShippingSame(e.target.checked)}
//                 />
//                 <label htmlFor="ship-same" className="text_black-2">
//                   Shipping address is same as billing
//                 </label>
//               </div>

//               {/* Shipping fields only if not same */}
//               {!shippingSame && (
//                 <>
//                   <h6 className="fw-5 mb_10">Shipping address</h6>

//                   <fieldset className="box fieldset">
//                     <label>Full Name *</label>
//                     <input
//                       value={shipping.name}
//                       onChange={(e) => setShipping((p) => ({ ...p, name: e.target.value }))}
//                       required
//                       type="text"
//                       placeholder="Receiver name"
//                     />
//                   </fieldset>

//                   <div className="box grid-2">
//                     <fieldset className="fieldset">
//                       <label>Email (optional)</label>
//                       <input
//                         value={shipping.email}
//                         onChange={(e) => setShipping((p) => ({ ...p, email: e.target.value }))}
//                         type="email"
//                         placeholder="receiver@email.com"
//                       />
//                     </fieldset>

//                     <fieldset className="fieldset">
//                       <label>Phone (optional)</label>
//                       <input
//                         value={shipping.phone}
//                         onChange={(e) => setShipping((p) => ({ ...p, phone: e.target.value }))}
//                         type="text"
//                         placeholder="+94..."
//                       />
//                     </fieldset>
//                   </div>

//                   <fieldset className="box fieldset">
//                     <label>Address *</label>
//                     <input
//                       value={shipping.address_line}
//                       onChange={(e) => setShipping((p) => ({ ...p, address_line: e.target.value }))}
//                       required
//                       type="text"
//                       placeholder="No, Street, Area"
//                     />
//                   </fieldset>

//                   <div className="box grid-2">
//                     <fieldset className="fieldset">
//                       <label>Town/City *</label>
//                       <input
//                         value={shipping.city}
//                         onChange={(e) => setShipping((p) => ({ ...p, city: e.target.value }))}
//                         required
//                         type="text"
//                         placeholder="Colombo"
//                       />
//                     </fieldset>

//                     <fieldset className="fieldset">
//                       <label>State (optional)</label>
//                       <input
//                         value={shipping.state}
//                         onChange={(e) => setShipping((p) => ({ ...p, state: e.target.value }))}
//                         type="text"
//                         placeholder="Western"
//                       />
//                     </fieldset>
//                   </div>

//                   <div className="box grid-2">
//                     <fieldset className="fieldset">
//                       <label>Postal code *</label>
//                       <input
//                         value={shipping.postal_code}
//                         onChange={(e) => setShipping((p) => ({ ...p, postal_code: e.target.value }))}
//                         required
//                         type="text"
//                         placeholder="10000"
//                       />
//                     </fieldset>

//                     <fieldset className="fieldset">
//                       <label>Country *</label>
//                       <input
//                         value={shipping.country}
//                         onChange={(e) => setShipping((p) => ({ ...p, country: e.target.value }))}
//                         required
//                         type="text"
//                         placeholder="Sri Lanka"
//                       />
//                     </fieldset>
//                   </div>

//                   <hr className="my-4" />
//                 </>
//               )}

//               <fieldset className="box fieldset">
//                 <label>Order notes (optional)</label>
//                 <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
//               </fieldset>
//             </form>
//           </div>

//           {/* RIGHT */}
//           <div className="tf-page-cart-footer">
//             <div className="tf-cart-footer-inner">
//               <h5 className="fw-5 mb_20">Your order</h5>

//               <div className="tf-page-cart-checkout widget-wrap-checkout">
//                 <ul className="wrap-checkout-product">
//                   {cartProducts.map((elm, i) => (
//                     <li key={i} className="checkout-product-item">
//                       <figure className="img-product">
//                         <Image
//                           alt="product"
//                           src={elm.imgSrc || (elm.imgPublicId ? cldCard(elm.imgPublicId) : productPlaceholder())}
//                           width={120}
//                           height={160}
//                         />
//                         <span className="quantity">{elm.quantity}</span>
//                       </figure>
//                       <div className="content">
//                         <div className="info">
//                           <p className="name">{elm.title}</p>
//                         </div>
//                         <span className="price">${(elm.price * elm.quantity).toFixed(2)}</span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>

//                 {!cartProducts.length && (
//                   <div className="container">
//                     <div className="row align-items-center mt-4 mb-4">
//                       <div className="col-12 fs-18">Your shop cart is empty</div>
//                       <div className="col-12 mt-3">
//                         <Link
//                           href={`/shop-default`}
//                           className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                           style={{ width: 'fit-content' }}>
//                           Explore Products!
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="d-flex justify-content-between line pb_20" style={{ marginTop: 10 }}>
//                   <h6 className="fw-5">Total</h6>
//                   <h6 className="total fw-5">${Number(totalPrice || 0).toFixed(2)}</h6>
//                 </div>

//                 <div className="wd-check-payment">
//                   <div className="fieldset-radio mb_20">
//                     <input
//                       type="radio"
//                       name="payment"
//                       id="cod"
//                       className="tf-check"
//                       checked={paymentMethod === 'cod'}
//                       onChange={() => setPaymentMethod('cod')}
//                     />
//                     <label htmlFor="cod">Cash on delivery</label>
//                   </div>

//                   <div className="fieldset-radio mb_20" style={{ opacity: 0.5 }}>
//                     <input type="radio" name="payment" id="stripe" className="tf-check" disabled />
//                     <label htmlFor="stripe">Card Payments (coming soon)</label>
//                   </div>

//                   <div className="fieldset-radio mb_20" style={{ opacity: 0.5 }}>
//                     <input type="radio" name="payment" id="paypal" className="tf-check" disabled />
//                     <label htmlFor="paypal">PayPal (coming soon)</label>
//                   </div>

//                   <p className="text_black-2 mb_20">
//                     Your personal data will be used to process your order and for other purposes described in our{' '}
//                     <Link href={`/privacy-policy`} className="text-decoration-underline">
//                       privacy policy
//                     </Link>
//                     .
//                   </p>

//                   <div className="box-checkbox fieldset-radio mb_20">
//                     <input
//                       type="checkbox"
//                       id="check-agree"
//                       className="tf-check"
//                       checked={agree}
//                       onChange={(e) => setAgree(e.target.checked)}
//                     />
//                     <label htmlFor="check-agree" className="text_black-2">
//                       I have read and agree to the website{' '}
//                       <Link href={`/terms-conditions`} className="text-decoration-underline">
//                         terms and conditions
//                       </Link>
//                       .
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   disabled={!canSubmit || submitting}
//                   onClick={onPlaceOrder}
//                   className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
//                   style={{ cursor: !canSubmit || submitting ? 'not-allowed' : 'pointer' }}>
//                   {submitting ? 'Placing...' : 'Place order'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { useContextElement } from '@/context/Context';
import { placeOrder, fetchSavedAddresses, createSavedAddress, deleteSavedAddress } from '@/src/lib/api';
import { cldCard, productPlaceholder } from '@/src/lib/cloudinary';

function normalizeAddr(a) {
  if (!a) return null;
  return {
    id: a.id,
    type: a.type, // billing|shipping
    name: a.name || '',
    email: a.email || '',
    phone: a.phone || '',
    address_line: a.address_line || '',
    city: a.city || '',
    state: a.state || '',
    postal_code: a.postal_code || '',
    country: a.country || 'Sri Lanka',
    is_default: !!a.is_default,
  };
}

export default function Checkout() {
  const router = useRouter();
  const { user, cartProducts, totalPrice } = useContextElement();

  const isGuest = !user;

  // -------------------------
  // Saved addresses (logged-in only)
  // -------------------------
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [selectedBillingId, setSelectedBillingId] = useState(''); // saved id
  const [selectedShippingId, setSelectedShippingId] = useState(''); // saved id

  // -------------------------
  // Form state
  // -------------------------
  const [billing, setBilling] = useState({
    name: '',
    email: '',
    phone: '',
    address_line: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Sri Lanka',
  });

  const [shippingSame, setShippingSame] = useState(true);

  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    phone: '',
    address_line: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Sri Lanka',
  });

  const [saveBilling, setSaveBilling] = useState(false);
  const [saveShipping, setSaveShipping] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [agree, setAgree] = useState(false);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Prefill basic for logged user
  useEffect(() => {
    if (user) {
      setBilling((p) => ({
        ...p,
        name: user?.name || p.name,
        email: user?.email || p.email,
      }));
    }
  }, [user?.id]);

  // Load saved addresses for logged-in users
  useEffect(() => {
    let cancelled = false;

    async function loadSaved() {
      if (!user) return;
      setLoadingSaved(true);
      try {
        const list = await fetchSavedAddresses(); // returns array
        if (cancelled) return;

        const normalized = Array.isArray(list) ? list.map(normalizeAddr).filter(Boolean) : [];
        setSavedAddresses(normalized);

        // auto-select defaults (if exist)
        const defBill = normalized.find((a) => a.type === 'billing' && a.is_default);
        const defShip = normalized.find((a) => a.type === 'shipping' && a.is_default);

        if (defBill) {
          setSelectedBillingId(String(defBill.id));
          applySavedToBilling(defBill);
        }
        if (defShip) {
          setSelectedShippingId(String(defShip.id));
          applySavedToShipping(defShip);
        }
      } catch (e) {
        // ignore
      } finally {
        if (!cancelled) setLoadingSaved(false);
      }
    }

    loadSaved();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const billingSavedOptions = useMemo(() => savedAddresses.filter((a) => a.type === 'billing'), [savedAddresses]);
  const shippingSavedOptions = useMemo(() => savedAddresses.filter((a) => a.type === 'shipping'), [savedAddresses]);

  function applySavedToBilling(addr) {
    const a = normalizeAddr(addr);
    if (!a) return;
    setBilling({
      name: a.name,
      email: a.email,
      phone: a.phone,
      address_line: a.address_line,
      city: a.city,
      state: a.state,
      postal_code: a.postal_code,
      country: a.country || 'Sri Lanka',
    });
  }

  function applySavedToShipping(addr) {
    const a = normalizeAddr(addr);
    if (!a) return;
    setShipping({
      name: a.name,
      email: a.email,
      phone: a.phone,
      address_line: a.address_line,
      city: a.city,
      state: a.state,
      postal_code: a.postal_code,
      country: a.country || 'Sri Lanka',
    });
  }

  const canSubmit = useMemo(() => {
    if (!cartProducts.length) return false;
    if (!agree) return false;

    // billing required
    if (!billing.name || !billing.address_line || !billing.city || !billing.postal_code || !billing.country)
      return false;

    // guests must provide email (your backend rule)
    if (isGuest && !billing.email) return false;

    if (!shippingSame) {
      if (!shipping.name || !shipping.address_line || !shipping.city || !shipping.postal_code || !shipping.country)
        return false;
    }

    return true;
  }, [cartProducts.length, agree, billing, shippingSame, shipping, isGuest]);

  const reloadSavedAddresses = async () => {
    if (!user) return;
    try {
      const list = await fetchSavedAddresses();
      const normalized = Array.isArray(list) ? list.map(normalizeAddr).filter(Boolean) : [];
      setSavedAddresses(normalized);
    } catch {}
  };

  const onDeleteSaved = async (id) => {
    setErrorMsg('');
    setInfoMsg('');
    try {
      await deleteSavedAddress(id);

      // if deleted selected, clear selection (and keep form values as-is)
      if (String(selectedBillingId) === String(id)) setSelectedBillingId('');
      if (String(selectedShippingId) === String(id)) setSelectedShippingId('');

      setInfoMsg('Saved address deleted.');
      await reloadSavedAddresses();
    } catch (e) {
      setErrorMsg(e?.message || 'Failed to delete address');
    }
  };

  const maybeSaveAddresses = async () => {
    // only logged-in users can save
    if (!user) return;

    // Save billing if checked
    if (saveBilling) {
      await createSavedAddress({
        type: 'billing',
        name: billing.name,
        email: billing.email || null,
        phone: billing.phone || null,
        address_line: billing.address_line,
        city: billing.city,
        state: billing.state || null,
        postal_code: billing.postal_code,
        country: billing.country,
        is_default: false,
      });
    }

    // Save shipping if checked and not same
    if (saveShipping && !shippingSame) {
      await createSavedAddress({
        type: 'shipping',
        name: shipping.name,
        email: shipping.email || null,
        phone: shipping.phone || null,
        address_line: shipping.address_line,
        city: shipping.city,
        state: shipping.state || null,
        postal_code: shipping.postal_code,
        country: shipping.country,
        is_default: false,
      });
    }
  };

  const onPlaceOrder = async () => {
    setErrorMsg('');
    setInfoMsg('');

    if (!canSubmit) {
      setErrorMsg('Please fill required fields and accept terms.');
      return;
    }

    const payload = {
      payment_method: paymentMethod, // "cod"
      notes: notes || null,
      shipping_same: shippingSame,

      billing: {
        name: billing.name,
        email: billing.email || null,
        phone: billing.phone || null,
        address_line: billing.address_line,
        city: billing.city,
        state: billing.state || null,
        postal_code: billing.postal_code,
        country: billing.country,
      },

      ...(shippingSame
        ? {}
        : {
            shipping: {
              name: shipping.name,
              email: shipping.email || null,
              phone: shipping.phone || null,
              address_line: shipping.address_line,
              city: shipping.city,
              state: shipping.state || null,
              postal_code: shipping.postal_code,
              country: shipping.country,
            },
          }),
    };

    try {
      setSubmitting(true);

      // ✅ save addresses first (optional)
      if (user && (saveBilling || (saveShipping && !shippingSame))) {
        await maybeSaveAddresses();
        await reloadSavedAddresses();
      }

      const res = await placeOrder(payload);

      alert(`Order placed: ${res?.order?.order_number}`);
      router.push('/');
    } catch (e) {
      setErrorMsg(e?.message || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          {/* LEFT */}
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Billing details</h5>

            {!!errorMsg && (
              <div className="alert alert-danger" style={{ marginBottom: 16 }}>
                {errorMsg}
              </div>
            )}

            {!!infoMsg && (
              <div className="alert alert-success" style={{ marginBottom: 16 }}>
                {infoMsg}
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="form-checkout">
              {/* ✅ Saved billing addresses */}
              {!!user && (
                <div style={{ marginBottom: 16 }}>
                  <label className="fw-5" style={{ display: 'block', marginBottom: 6 }}>
                    Saved billing address
                  </label>

                  <div className="box grid-2" style={{ alignItems: 'center' }}>
                    <fieldset className="fieldset" style={{ marginBottom: 0 }}>
                      <select
                        className="tf-select w-100"
                        value={selectedBillingId}
                        onChange={(e) => {
                          const id = e.target.value;
                          setSelectedBillingId(id);

                          const addr = billingSavedOptions.find((a) => String(a.id) === String(id));
                          if (addr) applySavedToBilling(addr);
                        }}
                        disabled={loadingSaved}>
                        <option value="">
                          {loadingSaved
                            ? 'Loading...'
                            : billingSavedOptions.length
                              ? 'Select saved billing address'
                              : 'No saved billing addresses'}
                        </option>
                        {billingSavedOptions.map((a) => (
                          <option key={a.id} value={String(a.id)}>
                            {a.name} — {a.address_line}, {a.city}
                            {a.is_default ? ' (Default)' : ''}
                          </option>
                        ))}
                      </select>
                    </fieldset>

                    <div className="d-flex" style={{ gap: 10, justifyContent: 'flex-end' }}>
                      {selectedBillingId && (
                        <button
                          type="button"
                          className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                          onClick={() => onDeleteSaved(selectedBillingId)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="box-checkbox fieldset-radio" style={{ marginTop: 10 }}>
                    <input
                      type="checkbox"
                      id="save-billing"
                      className="tf-check"
                      checked={saveBilling}
                      onChange={(e) => setSaveBilling(e.target.checked)}
                    />
                    <label htmlFor="save-billing" className="text_black-2">
                      Save this billing address to my account
                    </label>
                  </div>

                  <hr className="my-4" />
                </div>
              )}

              {/* Billing */}
              <fieldset className="box fieldset">
                <label>Full Name *</label>
                <input
                  value={billing.name}
                  onChange={(e) => setBilling((p) => ({ ...p, name: e.target.value }))}
                  required
                  type="text"
                  placeholder="Your name"
                />
              </fieldset>

              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label>{isGuest ? 'Email *' : 'Email (optional)'}</label>
                  <input
                    value={billing.email}
                    onChange={(e) => setBilling((p) => ({ ...p, email: e.target.value }))}
                    type="email"
                    placeholder="you@email.com"
                    required={isGuest}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label>Phone (optional)</label>
                  <input
                    value={billing.phone}
                    onChange={(e) => setBilling((p) => ({ ...p, phone: e.target.value }))}
                    type="text"
                    placeholder="+94..."
                  />
                </fieldset>
              </div>

              <fieldset className="box fieldset">
                <label>Address *</label>
                <input
                  value={billing.address_line}
                  onChange={(e) => setBilling((p) => ({ ...p, address_line: e.target.value }))}
                  required
                  type="text"
                  placeholder="No, Street, Area"
                />
              </fieldset>

              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label>Town/City *</label>
                  <input
                    value={billing.city}
                    onChange={(e) => setBilling((p) => ({ ...p, city: e.target.value }))}
                    required
                    type="text"
                    placeholder="Colombo"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label>State (optional)</label>
                  <input
                    value={billing.state}
                    onChange={(e) => setBilling((p) => ({ ...p, state: e.target.value }))}
                    type="text"
                    placeholder="Western"
                  />
                </fieldset>
              </div>

              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label>Postal code *</label>
                  <input
                    value={billing.postal_code}
                    onChange={(e) => setBilling((p) => ({ ...p, postal_code: e.target.value }))}
                    required
                    type="text"
                    placeholder="10000"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label>Country *</label>
                  <input
                    value={billing.country}
                    onChange={(e) => setBilling((p) => ({ ...p, country: e.target.value }))}
                    required
                    type="text"
                    placeholder="Sri Lanka"
                  />
                </fieldset>
              </div>

              {/* Shipping toggle */}
              <div className="box-checkbox fieldset-radio mb_20" style={{ marginTop: 10 }}>
                <input
                  type="checkbox"
                  id="ship-same"
                  className="tf-check"
                  checked={shippingSame}
                  onChange={(e) => setShippingSame(e.target.checked)}
                />
                <label htmlFor="ship-same" className="text_black-2">
                  Shipping address is same as billing
                </label>
              </div>

              {/* ✅ Saved shipping addresses (only if shipping different) */}
              {!!user && !shippingSame && (
                <div style={{ marginBottom: 16 }}>
                  <label className="fw-5" style={{ display: 'block', marginBottom: 6 }}>
                    Saved shipping address
                  </label>

                  <div className="box grid-2" style={{ alignItems: 'center' }}>
                    <fieldset className="fieldset" style={{ marginBottom: 0 }}>
                      <select
                        className="tf-select w-100"
                        value={selectedShippingId}
                        onChange={(e) => {
                          const id = e.target.value;
                          setSelectedShippingId(id);

                          const addr = shippingSavedOptions.find((a) => String(a.id) === String(id));
                          if (addr) applySavedToShipping(addr);
                        }}
                        disabled={loadingSaved}>
                        <option value="">
                          {loadingSaved
                            ? 'Loading...'
                            : shippingSavedOptions.length
                              ? 'Select saved shipping address'
                              : 'No saved shipping addresses'}
                        </option>
                        {shippingSavedOptions.map((a) => (
                          <option key={a.id} value={String(a.id)}>
                            {a.name} — {a.address_line}, {a.city}
                            {a.is_default ? ' (Default)' : ''}
                          </option>
                        ))}
                      </select>
                    </fieldset>

                    <div className="d-flex" style={{ gap: 10, justifyContent: 'flex-end' }}>
                      {selectedShippingId && (
                        <button
                          type="button"
                          className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                          onClick={() => onDeleteSaved(selectedShippingId)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="box-checkbox fieldset-radio" style={{ marginTop: 10 }}>
                    <input
                      type="checkbox"
                      id="save-shipping"
                      className="tf-check"
                      checked={saveShipping}
                      onChange={(e) => setSaveShipping(e.target.checked)}
                    />
                    <label htmlFor="save-shipping" className="text_black-2">
                      Save this shipping address to my account
                    </label>
                  </div>

                  <hr className="my-4" />
                </div>
              )}

              {/* Shipping fields only if not same */}
              {!shippingSame && (
                <>
                  <h6 className="fw-5 mb_10">Shipping address</h6>

                  <fieldset className="box fieldset">
                    <label>Full Name *</label>
                    <input
                      value={shipping.name}
                      onChange={(e) => setShipping((p) => ({ ...p, name: e.target.value }))}
                      required
                      type="text"
                      placeholder="Receiver name"
                    />
                  </fieldset>

                  <div className="box grid-2">
                    <fieldset className="fieldset">
                      <label>Email (optional)</label>
                      <input
                        value={shipping.email}
                        onChange={(e) => setShipping((p) => ({ ...p, email: e.target.value }))}
                        type="email"
                        placeholder="receiver@email.com"
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <label>Phone (optional)</label>
                      <input
                        value={shipping.phone}
                        onChange={(e) => setShipping((p) => ({ ...p, phone: e.target.value }))}
                        type="text"
                        placeholder="+94..."
                      />
                    </fieldset>
                  </div>

                  <fieldset className="box fieldset">
                    <label>Address *</label>
                    <input
                      value={shipping.address_line}
                      onChange={(e) => setShipping((p) => ({ ...p, address_line: e.target.value }))}
                      required
                      type="text"
                      placeholder="No, Street, Area"
                    />
                  </fieldset>

                  <div className="box grid-2">
                    <fieldset className="fieldset">
                      <label>Town/City *</label>
                      <input
                        value={shipping.city}
                        onChange={(e) => setShipping((p) => ({ ...p, city: e.target.value }))}
                        required
                        type="text"
                        placeholder="Colombo"
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <label>State (optional)</label>
                      <input
                        value={shipping.state}
                        onChange={(e) => setShipping((p) => ({ ...p, state: e.target.value }))}
                        type="text"
                        placeholder="Western"
                      />
                    </fieldset>
                  </div>

                  <div className="box grid-2">
                    <fieldset className="fieldset">
                      <label>Postal code *</label>
                      <input
                        value={shipping.postal_code}
                        onChange={(e) => setShipping((p) => ({ ...p, postal_code: e.target.value }))}
                        required
                        type="text"
                        placeholder="10000"
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <label>Country *</label>
                      <input
                        value={shipping.country}
                        onChange={(e) => setShipping((p) => ({ ...p, country: e.target.value }))}
                        required
                        type="text"
                        placeholder="Sri Lanka"
                      />
                    </fieldset>
                  </div>

                  <hr className="my-4" />
                </>
              )}

              <fieldset className="box fieldset">
                <label>Order notes (optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </fieldset>
            </form>
          </div>

          {/* RIGHT */}
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Your order</h5>

              <div className="tf-page-cart-checkout widget-wrap-checkout">
                <ul className="wrap-checkout-product">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image
                          alt="product"
                          src={elm.imgSrc || (elm.imgPublicId ? cldCard(elm.imgPublicId) : productPlaceholder())}
                          width={120}
                          height={160}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.title}</p>
                        </div>
                        <span className="price">${(elm.price * elm.quantity).toFixed(2)}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {!cartProducts.length && (
                  <div className="container">
                    <div className="row align-items-center mt-4 mb-4">
                      <div className="col-12 fs-18">Your shop cart is empty</div>
                      <div className="col-12 mt-3">
                        <Link
                          href={`/shop-default`}
                          className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                          style={{ width: 'fit-content' }}>
                          Explore Products!
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between line pb_20" style={{ marginTop: 10 }}>
                  <h6 className="fw-5">Total</h6>
                  <h6 className="total fw-5">${Number(totalPrice || 0).toFixed(2)}</h6>
                </div>

                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input
                      type="radio"
                      name="payment"
                      id="cod"
                      className="tf-check"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <label htmlFor="cod">Cash on delivery</label>
                  </div>

                  <div className="fieldset-radio mb_20" style={{ opacity: 0.5 }}>
                    <input type="radio" name="payment" id="stripe" className="tf-check" disabled />
                    <label htmlFor="stripe">Card Payments (coming soon)</label>
                  </div>

                  <div className="fieldset-radio mb_20" style={{ opacity: 0.5 }}>
                    <input type="radio" name="payment" id="paypal" className="tf-check" disabled />
                    <label htmlFor="paypal">PayPal (coming soon)</label>
                  </div>

                  <p className="text_black-2 mb_20">
                    Your personal data will be used to process your order and for other purposes described in our{' '}
                    <Link href={`/privacy-policy`} className="text-decoration-underline">
                      privacy policy
                    </Link>
                    .
                  </p>

                  <div className="box-checkbox fieldset-radio mb_20">
                    <input
                      type="checkbox"
                      id="check-agree"
                      className="tf-check"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label htmlFor="check-agree" className="text_black-2">
                      I have read and agree to the website{' '}
                      <Link href={`/terms-conditions`} className="text-decoration-underline">
                        terms and conditions
                      </Link>
                      .
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!canSubmit || submitting}
                  onClick={onPlaceOrder}
                  className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                  style={{ cursor: !canSubmit || submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? 'Placing...' : 'Place order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
