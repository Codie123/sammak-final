import { createContext, useState, useEffect } from "react";
import axios from "axios";
const AllContext = createContext();

const Provider = ({ children }) => {
  const [loggedin, setloggedin] = useState(localStorage.getItem("token"));
  const userid = localStorage.getItem("userid");
  const [id, setid] = useState("");
  const [home, sethome] = useState(true);
  const [shop, setshop] = useState(false);
  const [about, setabout] = useState(false);
  const [contact, setcontact] = useState(false);
  const [cart, setcart] = useState(false);
  const [productinfo, setproductinfo] = useState("");
  const [isloggedin, setisloggedin] = useState(localStorage.getItem("token"));
  const [heroSilderData, setheroSliderData] = useState({});
  const [cartdata, setcartdata] = useState("");
  const [search, setsearch] = useState("");
  const [loginopen, setloginopen] = useState(false);
  const [data1, setdata1] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/HeroSlider/getAll`)
      .then((res) => {
        setheroSliderData(res.data.result);
      })
      .catch((err) => {});
  }, []);

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/CartMaster/getAll/${localStorage.getItem(
          "userid"
        )}`,
        config
      )
      .then((res) => {
        localStorage.setItem(
          "cart",
          JSON.stringify(res.data.result.cartItemResponseList)
        );
        setcartdata(res.data.result.cartItemResponseList);
      })
      .catch((err) => {});
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
    axios
      .get(
        `${
          import.meta.env.VITE_URL
        }/Address/getAddressByUserId/${localStorage.getItem("userid")}`,
        config
      )
      .then((res) => {})
      .catch((err) => {});
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
  };
  return (
    <AllContext.Provider value={valuetoshare}>{children}</AllContext.Provider>
  );
};

export { Provider };
export default AllContext;
