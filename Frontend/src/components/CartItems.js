import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, removeAll, selectTotal } from "../store/cartSlice";
import { removeCustomer } from "../store/customerSlice";
import { add } from "../store/placedOrderSlice";
import { addAllCustomer } from "../store/allCustomerSlice";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "react-avatar";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QRCodeCanvas } from "qrcode.react";
import Invoice from "./Invoice";

const CartItems = () => {
  const dispatch = useDispatch();
  const [invoiceShow, setInvoiceShow] = useState(false);
  const customer = useSelector((state) => state.customer);
  const [orderId, setOrderId] = useState("Cash-Payment");
  const [paymentId, setPaymentId] = useState("Cash-Payment");
  const [payment, setPayment] = useState(false);
  const cart = useSelector((state) => state.cart);
  const total = useSelector(selectTotal);
  const tax = (5.25 / 100) * total;
  const [paymentMode, setPaymentMode] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const subTotal = total + tax;

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(remove(id));
  };

  const showInvoice = () => {
    setInvoiceShow(true);
  };

  const closeInvoice = () => {
    setInvoiceShow(false);
  };

  const placeOrder = async () => {
    if (payment) {
      const newData = {
        name: customer[0]?.name,
        table: customer[0]?.tableNum,
        items: cart.length,
        time: new Date().toLocaleTimeString(),
        order: orderId,
        payment: paymentId,
      };
      setPayment(false);
      dispatch(add(newData));
      dispatch(removeAll());
      dispatch(removeCustomer());
      const custDetails = {
        name: customer[0]?.name,
        phone: customer[0]?.phone,
        items: cart.length,
        date: new Date().toLocaleDateString(),
        order: orderId,
        payment: paymentId,
      };
      dispatch(addAllCustomer(custDetails));

      try {
        const res = await axios.post("http://localhost:8000/api/add-customer", {
          name: customer[0]?.name,
          phone: customer[0]?.phone,
          paymentId,
          orderId,
          date: new Date().toLocaleDateString(),
          items: cart,
        });
        console.log(res.data);
        toast.success("Order placed successfully!", {
          position: "top-center",
          autoClose: 4000,
        });
      } catch (error) {
        console.error("Error placing order:", error);
       
      }
    } else {
      toast.info("Payment not done!", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  const handleUPIClick = () => {
    setPaymentMode("UPI");
    setPayment(true);
    setShowQR(true); // Show QR code on UPI click
  };

  return (
    <div>
      <ToastContainer />
      <ScrollableFeed>
        <div className="flex flex-col justify-between text-white">
          <motion.div
            transition={{ duration: 0.5 }}
            exit={{ y: "50%", opacity: 0 }}
            className="flex flex-col px-4 py-4 space-y-1 h-[55vh] overflow-y-scroll scrollbar-hide"
          >
            {cart.length > 0 ? (
              <>
                <div>
                  <ul role="list" className="divide-y divide-black">
                    <AnimatePresence>
                      {cart.map((curr, index) => (
                        <motion.li
                          initial={{ x: 100 }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.2 }}
                          exit={{ y: "50%", opacity: 0, scale: 0.5 }}
                          key={index}
                        >
                          <a href="#" className="block hover:rounded-md">
                            <div className="px-4 py-2">
                              <div className="flex items-center justify-between">
                                <p className="truncate text-xs font-medium text-white">
                                  {index + 1}. &nbsp;{curr.title} &nbsp;{" "}
                                
                                </p>
                                <div className="ml-2 flex flex-shrink-0">
                                  <p className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-white">
                                    ₹{curr.price}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p
                                    className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                                    onClick={(e) => handleRemove(e, curr.id)}
                                  >
                                    Remove
                                  </p>
                                </div>
                              </div>
                            </div>
                          </a>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-24">
                <p className="text-gray-500">No items.</p>
              </div>
            )}
          </motion.div>
          <div className="flex flex-col w-full">
            <div>
              <div className="grid grid-cols-2 gap-0">
              <div
  onClick={() => {
    if (cart.length > 0) {
      setPaymentMode("cash");
      setPayment(true);
      toast.success("Cash received!", {
        position: "top-center",
        autoClose: 4000,
      });
    } else {
      toast.info("Add items to the cart first!", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  }}
  className={`bg-[#151a34] text-center p-2 text-sm font-semibold hover:bg-[#1f2544] cursor-pointer border border-black`}
>
  <button>Cash</button>
</div>

                <div className="bg-[#151a34] text-center p-2 text-sm font-semibold hover:bg-[#1f2544] cursor-pointer border border-black">
                  <button onClick={handleUPIClick}>UPI</button>
                </div>
              </div>

              {showQR && (
                <div className="flex justify-center my-4">
                  <QRCodeCanvas
                    value={`upi://pay?pa=your-vpa@upi&pn=Your Name&mc=&tid=&tr=&tn=Payment for Order&am=${subTotal}&cu=INR`}
                    size={128}
                  />
                </div>
              )}

              <div className="flex flex-col pl-8 pr-8 py-2 space-y-2">
                {payment && (
                  <p className="text-center text-xs font-semibold text-green-500">
                    Payment done.{" "}
                    <small className="font-normal text-white">
                      Now you can place order.
                    </small>{" "}
                  </p>
                )}
                <div className="flex flex-row items-center justify-between text-xs font-semibold text-white">
                  <p>Tax 5.25%</p>
                  <p>₹{tax.toFixed(2)}</p>
                </div>
                <div className="flex flex-row items-center justify-between text-xs font-semibold text-white">
                  <p>Subtotal</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
                <div className="flex flex-row items-center justify-between text-sm font-bold">
                  <p>Total</p>
                  <p>₹{subTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-0 pt-2 text-center absolute bottom-0 w-full">
            <div
              onClick={showInvoice}
              className={
                cart.length > 0
                  ? `bg-[#3441d4]`
                  : `bg-gray-500 border-r border-gray-700`
              }
            >
              <button
                className={
                  cart.length > 0
                    ? " py-4 text-center pt-2"
                    : " py-4 text-center pt-2 cursor-not-allowed"
                }
              >
                Invoice
              </button>
            </div>
            <div
              onClick={placeOrder}
              className={cart.length > 0 ? `bg-[#5b45b0]` : `bg-gray-500`}
            >
              <button
                className={
                  cart.length > 0
                    ? " py-4 text-center pt-2"
                    : " py-4 text-center pt-2 cursor-not-allowed"
                }
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </ScrollableFeed>
      {invoiceShow && <Invoice close={closeInvoice} />}
    </div>
  );
};

export default CartItems;
