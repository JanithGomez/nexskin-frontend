'use client';
import { useContextElement } from '@/context/Context';
import Image from 'next/image';
import Link from 'next/link';
export default function Checkout() {
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Billing details</h5>
            <form onSubmit={(e) => e.preventDefault()} className="form-checkout">
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="first-name">First Name</label>
                  <input required type="text" id="first-name" placeholder="Themesflat" />
                </fieldset>
                <fieldset className="fieldset">
                  <label htmlFor="last-name">Last Name</label>
                  <input required type="text" id="last-name" />
                </fieldset>
              </div>
              <fieldset className="box fieldset">
                <label htmlFor="country">Country/Region</label>
                <div className="select-custom">
                  <select required className="tf-select w-100" id="country" name="address[country]" data-default="">
                    <option value="---" data-provinces="[]">
                      ---
                    </option>
                    <option
                      value="Australia"
                      data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]">
                      Australia
                    </option>
                    <option value="Austria" data-provinces="[]">
                      Austria
                    </option>
                    <option value="Belgium" data-provinces="[]">
                      Belgium
                    </option>
                    <option
                      value="Canada"
                      data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]">
                      Canada
                    </option>
                    <option
                      value="United Kingdom"
                      data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]">
                      United Kingdom
                    </option>
                    <option
                      value="United States"
                      data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]">
                      United States
                    </option>
                    <option value="Vietnam" data-provinces="[]">
                      Vietnam
                    </option>
                  </select>
                </div>
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="city">Town/City</label>
                <input required type="text" id="city" />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="address">Address</label>
                <input required type="text" id="address" />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="phone">Phone Number</label>
                <input required type="number" id="phone" />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="email">Email</label>
                <input required type="email" autoComplete="abc@xyz.com" id="email" />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="note">Order notes (optional)</label>
                <textarea name="note" id="note" defaultValue={''} />
              </fieldset>
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Your order</h5>
              <form onSubmit={(e) => e.preventDefault()} className="tf-page-cart-checkout widget-wrap-checkout">
                <ul className="wrap-checkout-product">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image alt="product" src={elm.imgSrc} width={720} height={1005} />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.title}</p>
                          <span className="variant">Brown / M</span>
                        </div>
                        <span className="price">${(elm.price * elm.quantity).toFixed(2)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {!cartProducts.length && (
                  <div className="container">
                    <div className="row align-items-center mt-5 mb-5">
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
                <div className="coupon-box">
                  <input required type="text" placeholder="Discount code" />
                  <a href="#" className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">
                    Apply
                  </a>
                </div>
                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Total</h6>
                  <h6 className="total fw-5">$122.00</h6>
                </div>
                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input required type="radio" name="payment" id="bank" className="tf-check" defaultChecked />
                    <label htmlFor="bank">Card Payments</label>
                  </div>
                  <div className="fieldset-radio mb_20">
                    <input required type="radio" name="payment" id="delivery" className="tf-check" />
                    <label htmlFor="delivery">Cash on delivery</label>
                  </div>
                  <p className="text_black-2 mb_20">
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and for other purposes described in our
                    <Link href={`/privacy-policy`} className="text-decoration-underline">
                      privacy policy
                    </Link>
                    .
                  </p>
                  <div className="box-checkbox fieldset-radio mb_20">
                    <input required type="checkbox" id="check-agree" className="tf-check" />
                    <label htmlFor="check-agree" className="text_black-2">
                      I have read and agree to the website
                      <Link href={`/terms-conditions`} className="text-decoration-underline">
                        terms and conditions
                      </Link>
                      .
                    </label>
                  </div>
                </div>
                <button className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center">
                  Place order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
