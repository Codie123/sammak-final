import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import { Provider } from "./Context/Context";
import Herocart from "../component/herocart/Herocart";
import Viewcart from "../component/Viewcart/Viewcart";
import Checkout from "../component/Checkout/Checkout";
import ResetPassword from "../pages/home/ResetPassword/ResetPassword";
import Shopview from "../component/Shopview/Shopview";
import OrderComplete from "../component/OrderComplete/OrderComplete";
import CheckoutMain from "../component/Main/CheckoutMain";
import Aboutview from "../component/Aboutview/Aboutview";
import Contactview from "../component/Contactview/Contactview";
import Password from "../component/Forgotpassword/password";
import Payment from "../component/PaymentComplete/PaymentComplete";
import Paymentfailed from "../component/Paymentfailed/PaymentFailedPage";
import Paymentcanceled from "../component/PaymentCanceled/PaymentCanceled";
import Activated from "../component/Activated/Activated";
import Timeout from "../component/Timeout/Timeout";



function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Herocart />} />
          <Route path="/about" element={<Aboutview />} />
          <Route path="/viewcart" element={<Viewcart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/shopview" element={<Shopview />} />
          <Route path="/contact" element={<Contactview />} />
          <Route path="/orderComplete" element={<OrderComplete />} />
          <Route path="/paymentcomplete" element={<Payment/>} />
          <Route path="/paymentfailed" element={<Paymentfailed/>} />
          <Route path="/paymentcanceled" element={<Paymentcanceled/>} />
          <Route path="/registrationsuccess" element={<Activated/>} />
          <Route path="/timeout" element={<Timeout/>} />
          <Route path="/setting" element={<CheckoutMain />} />
          <Route path="/forgotpassword" element={<Password />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
