import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-js-loader";
import style from "./Heroshop.module.css";
import "../../main.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import {
  CCard,
  CCardBody,
  CCardImage,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
function Heroshop() {
  const [data, setdata] = useState("");
  const [addCartLogin, setaddCartLogin] = useState(false);
  const [quantity, setquantity] = useState(1);
  //location
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = params.get("page");

  if (page === null) {
    page = 1;
  }

  //paginaton
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(page);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [Allproduct, setallproduct] = useState(
    JSON.parse(localStorage.getItem("products"))
  );

  //pagination ends
  const {
    id,
    isloggedin,
    setid,
    cart,
    setcart,
    productinfo,
    setproductinfo,
    search,
    setsearch,
    setcartdata,
  } = useContext(AllContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //location

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    },
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/Product/post`)
      .then((res) => {
        setproductinfo(res.data.result);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let newdata =
      productinfo.length > 0 &&
      productinfo.filter((info) => {
        return info.productName.toLowerCase().includes(search.toLowerCase());
      });

    setdata(newdata);
  }, [search, productinfo]);

  const onCart = () => {
    window.location.href = "/shop";
  };
  const handleAddcart = () => {
    if (!isloggedin) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.error("Please Login to Add cart", {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-center",
      });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_URL}/cart/addToCart/${localStorage.getItem(
            "id"
          )}/${localStorage.getItem("userid")}/1/Cleaning Method 1`,
          {},
          config
        )
        .then((res) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          toast.success(" Item Added to cart", {
            autoClose: 1000,
            closeOnClick: true,
            position: "bottom-center",
          });
          axios
            .get(
              `${
                import.meta.env.VITE_URL
              }/CartMaster/getAll/${localStorage.getItem("userid")}`,
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
        })
        .catch((err) => {
          toast.error("Ops something went wrong!", {
            autoClose: 1500,
            closeOnClick: true,
            position: "top-center",
          });
        });
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (Allproduct.length / itemsPerPage > nextPage) {
      setCurrentPage(nextPage);
      navigate(`/shopview/?page=${nextPage}`);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setCurrentPage(prevPage);
      navigate(`/shopview/?page=${prevPage}`);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const lowtohigh = () => {
    let sort =
      Allproduct.length > 0 &&
      [...Allproduct].sort((a, b) => a.sellingPrice - b.sellingPrice);
    setallproduct(sort);
    console.log(sort);
  };

  const hightolow = () => {
    let sort =
      Allproduct.length > 0 &&
      [...Allproduct].sort((a, b) => b.sellingPrice - a.sellingPrice);
    setallproduct(sort);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setCurrentPage(1);
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Perform actions based on the selected option
    if (selectedValue === "highToLow") {
      hightolow();
    } else if (selectedValue === "lowToHigh") {
      lowtohigh();
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, update quantity
      updateQuantity(product.id, existingProduct.quantity + quantity);
      toast.success("Product added", {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      // If the product is not in the cart, add it
      setcart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem(
        "cartinfo",
        JSON.stringify([...cart, { ...product, quantity: quantity }])
      );
      toast.success("Product added", {
        autoClose: 3000,
        position: "top-right",
        icon: "👏",
      });
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (cart) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      setcart(updatedCart);
      localStorage.setItem("cartinfo", JSON.stringify(updatedCart));
    }
  };

  return (
    <main className="main">
      {/* page Header */}
      <div className="page-header shop-hero cph-header pl-4 pr-4">
        <h1 className="page-title font-weight-light text-capitalize">
          Sammak Shop
        </h1>
        {/* Category container */}
      </div>
      {/* ends */}

      {/* breadcrumps  */}
      <nav className="breadcrumb-nav has-border">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Shop</li>
          </ul>
        </div>
      </nav>
      {/* ends */}
      <div className={style.dropdown}>
        <select
          className={style.select}
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="" disabled>
            Sort by
          </option>
          <option className={style.option} value="highToLow">
            High to Low
          </option>
          <option className={style.option} value="lowToHigh">
            Low to High
          </option>
        </select>
      </div>

      {/* page content static container */}
      <div className="page-content mb-10 shop-page shop-horizontal">
        <div className="container">
          <CRow xs={{ cols: 1 }} className="g-4">
            {/* Product 1 */}
            {Allproduct.length === 0 && (
              <div className={style.beforeload}>
                {" "}
                <div className={style.loader_content}>
                  {" "}
                  <Loader
                    type="bubble-scale"
                    bgColor={"#163b4d"}
                    color={"blue"}
                    size={50}
                  />
                </div>
              </div>
            )}
            {Allproduct.length > 0 && Array.isArray(Allproduct) ? (
              Allproduct.map((field, index) => (
                <CCol className="col  col-md-6 col-lg-4 col-xl-3" key={index}>
                  <CCard className="">
                    <div
                      className="card-img-container"
                      onClick={() => {
                        setid(field.id);
                        localStorage.setItem("id", field.id);
                        onCart();
                      }}
                    >
                      <div className="card-img-container">
                        <LazyLoadImage
                          alt="product"
                          className="card-img"
                          effect="blur"
                          src={
                            field.images.length > 0
                              ? field.images[0].imageUrl
                              : "~"
                          }
                        />
                      </div>
                    </div>

                    <CCardBody>
                      <div className="ratings-container">
                        <div className="d-flex align-items-center">
                          <div className="ratings-full">
                            <span
                              className="ratings"
                              style={{ width: "60%" }}
                            ></span>
                            <span className="tooltiptext tooltip-top">
                              3.00
                            </span>
                          </div>
                          <a className="rating-reviews">
                            ({Math.floor(Math.random() * 20 + 5)})
                          </a>
                        </div>
                        <span className="product-price">
                          <del className="old-price">
                            SAR {field.originalPrice}
                          </del>
                          <ins
                            className="new-price"
                            style={{ fontWeight: "bold" }}
                          >
                            SAR {field.sellingPrice}
                          </ins>
                        </span>
                      </div>
                      <CCardTitle>{field.productName}</CCardTitle>
                      <div className="btn-cnt">
                        <a
                          className="buy-btn"
                          onClick={() => {
                            localStorage.setItem("id", field.id);
                            addToCart(field);
                          }}
                        >
                          Add To Cart
                        </a>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              )).slice(indexOfFirstItem, indexOfLastItem)
            ) : (
              <div className={style.loader_content}>
                {" "}
                <Loader
                  type="bubble-scale"
                  bgColor={"#163b4d"}
                  color={"blue"}
                  size={50}
                />
              </div>
            )}
          </CRow>
        </div>
        {Allproduct.length <= itemsPerPage ? (
          ""
        ) : (
          <div className="d-flex align-items-center justify-content-end gap-2 cuz-pag-btn mr-4">
            <button
              className="btn"
              onClick={() => {
                handlePreviousPage();
              }}
            >
              Previous
            </button>
            <p className="page-value">{currentPage}</p>

            <button
              className="btn"
              onClick={() => {
                handleNextPage();
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* ends */}
      <Toaster />
    </main>
  );
}

export default Heroshop;
