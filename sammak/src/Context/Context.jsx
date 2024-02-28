import { createContext, useState, useEffect } from "react";
import axios from "axios";
const AllContext = createContext();

const Provider = ({ children }) => {
  const [loggedin, setloggedin] = useState(localStorage.getItem("token"));
  const userid = localStorage.getItem("userid");
  const [id, setid] = useState("");
  const [home, sethome] = useState(false);
  const [shop, setshop] = useState(false);
  const [about, setabout] = useState(false);
  const [contact, setcontact] = useState(false);
  const [cart, setcart] = useState([]);
  const [productinfo, setproductinfo] = useState("");
  const [isloggedin, setisloggedin] = useState(localStorage.getItem("token"));
  const [heroSilderData, setheroSliderData] = useState({});
  const [cartdata, setcartdata] = useState("");
  const [search, setsearch] = useState("");
  const [loginopen, setloginopen] = useState(false);
  const [data1, setdata1] = useState("");
  const [viewcart, setviewcart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartinfo")) || [];
    setcart(storedCart);
  }, []);

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    //orderapi
    axios
      .get(
        `${
          import.meta.env.VITE_URL
        }/orderMaster/getAllOrdersById/${localStorage.getItem("userid")}`,
        config
      )
      .then((res) => {
        localStorage.setItem("orders", JSON.stringify(res.data.result));
      })
      .catch((err) => {});
    //address api
  }, []);

  const valuetoshare = {
    loggedin,
    setloggedin,
    userid,
    id,
    setid,
    home,
    sethome,
    shop,
    setshop,
    about,
    setabout,
    contact,
    setcontact,
    cart,
    setcart,
    productinfo,
    setproductinfo,
    heroSilderData,
    setheroSliderData,
    isloggedin,
    search,
    setsearch,
    loginopen,
    setloginopen,
    setdata1,
    data1,
    cartdata,
    setcartdata,
    viewcart,
    setviewcart,
  };
  return (
    <AllContext.Provider value={valuetoshare}>{children}</AllContext.Provider>
  );
};

export { Provider };
export default AllContext;
