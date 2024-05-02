import React from "react";
import "./cart.css";
const Cart = () => {
  return (
    <div className="container mb-5 shadow-lg">
      <div className="group checkoutitems ">
        <table>
          <tr>
            <td className="item-img">
              <img
                src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/cf669aef-c9cd-443e-946f-54e1802a79f0/in-season-tr-13-workout-shoes-BDTlPf.png"
                alt="Item"
                className="rounded-lg"
              />
            </td>
            <td className="item-details">
              <span className="item-title">Men's Casual Shoes</span>
              <span className="item-size">Size: UK 7</span>
              <span className="item-qty">Quantity: 1</span>
            </td>
            <td className="item-price">₹899.00</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Cart;
