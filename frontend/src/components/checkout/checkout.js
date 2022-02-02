import React from "react";
import "./checkout.css";

const Checkout = () => {
  return (
    <div className="checkout-all">
      <h3 className="checkout-title">Checkout</h3>
      <div className="checkout-details">
        <div className="checkout-details-left">
          <div className="checkout-details-left-name-and-email">
            <p className="checkout-details-left-name">
              Ali Srour
              <span className="checkout-details-left-email">
                (srourali07@gmail.com)
              </span>
            </p>
            <p className="checkout-details-left-secure">
              You are securely logged in
            </p>
          </div>
          <div className="checkout-details-left-delivery-address">
            <div className="checkout-details-left-delivery-address-title">
              <p className="checkout-details-left-delivery-address-title-p">
                Delivery Address
              </p>
            </div>
            <input
              placeholder="Add address"
              className="checkout-details-left-delivery-address-add-new-text"
            />
          </div>
          <div className="checkout-details-left-payment-method">
            <p className="checkout-details-left-payment-method-title">
              Select Payment Method
            </p>
            <div className="checkout-details-left-payment-method-cash">
              <p className="checkout-details-left-payment-method-cash-title">
                Cash
              </p>
              <p className="checkout-details-left-payment-method-cash-note">
                Please keep exact change handy to help us serve you better
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="sc-fPbjcq dtbjvd">
            <h5 class="sc-1uh2q3e-0 sc-BOulX jdsOAb">Summary</h5>
            <div class="sc-hdNmWC cTkaPI">
              <div class="sc-fPEBxH nkFMw">
                <p class="sc-1hez2tp-0 sc-hAcydR bDsJTz">ORDER FROM</p>
                <p class="sc-1hez2tp-0 sc-eomEcv dZYLPU">SushiArt</p>
                <p class="sc-1hez2tp-0 sc-gcJTYu hhgbmz">
                  The Beach, Jumeirah Beach Residence, Dubai
                </p>
              </div>
              <div class="sc-fPEBxH sc-hBcjXN eaiRPV">
                <div class="sc-klSiHT sc-hkHFWD iyghkD">
                  <div
                    type="non-veg"
                    class="sc-1tx3445-0 kcsImg sc-feWbDf dCUqkh"
                  ></div>
                  <div class="sc-cBOTKl cHUCzi">
                    <div class="sc-klSiHT sc-iUVpnZ cXhFKO">
                      <div class="sc-bWFPNQ iKOZzr">
                        <p class="sc-1hez2tp-0 sc-emjYpo ciKGzg">
                          The Signature Box
                        </p>
                        <div class="sc-17hyc2s-3 jOoliK">
                          <span class="sc-17hyc2s-1 cCiQWA">AED145</span>
                        </div>
                        <p class="sc-1hez2tp-0 sc-goFBvh hWNuPP">
                          First Side : Cabbage Salad
                        </p>
                        <p class="sc-1hez2tp-0 sc-goFBvh hWNuPP">
                          Second Side : Cabbage Salad
                        </p>
                      </div>
                      <div>
                        <div class="sc-15orjsw-1 iuWdTE">
                          <div class="sc-15orjsw-10 HnpkZ">
                            <div class="sc-bke1zw-0 fIuLDK sc-15orjsw-3 bGDlrz">
                              <div class="sc-bke1zw-1 sc-15orjsw-4 fJLDSa"></div>
                              <div class="sc-bke1zw-1 sc-15orjsw-4 sc-15orjsw-9 hRUeFn">
                                <span class="sc-15orjsw-8 bXpcpY">1</span>
                              </div>
                              <div class="sc-bke1zw-1 sc-15orjsw-4 fJLDSa"></div>
                            </div>
                          </div>
                          <span class="sc-15orjsw-2 dXvFyH">customizable</span>
                        </div>
                        <p class="sc-1hez2tp-0 sc-iKiVwC cYlGXn">AED145.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sc-gIjDWZ cGAkA">
                  <div class="sc-fjNYmT hsgwiw">
                    <span role="button" tabindex="0" class="sc-hzOKmB dSiESF">
                      Add special cooking instructions
                    </span>
                  </div>
                </div>
              </div>
              <div class="sc-fPEBxH sc-hBcjXN eaiRPV">
                <div class="sc-eqGige sc-bCQtTp dNUxGT">
                  <div class="sc-eqGige RHgSf">
                    <div class="sc-fxMfqs jMnWZf">Apply Coupon</div>
                  </div>
                </div>
                <p color="#EF4F5F" class="sc-1hez2tp-0 sc-csuNZv bvYxTs">
                  Promo codes are not supported on Cash on Delivery
                </p>
              </div>
              <div class="sc-fPEBxH sc-fPCuyW vMTdh">
                <div class="sc-fdJbru iyhgDB">
                  <p class="sc-1hez2tp-0 sc-jTNJqp eNStwq">Subtotal</p>
                  <div class="sc-17hyc2s-3 jOoliK">
                    <span class="sc-17hyc2s-1 cCiQWA">AED145.00</span>
                  </div>
                </div>
                <div class="sc-dYcyhn gyRMfX">
                  <div class="sc-fAfrNB sc-MKjYC fwoqay">Delivery Charge</div>
                  <p class="sc-1hez2tp-0 sc-bQduHL iORCKP">AED6.00</p>
                </div>
                <div class="sc-hmyDHa kpTofA">
                  <p class="sc-1hez2tp-0 sc-gwZsXD kzqbAB">Grand Total</p>
                  <div class="sc-17hyc2s-3 jOoliK">
                    <span class="sc-17hyc2s-1 cCiQWA">AED151.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
