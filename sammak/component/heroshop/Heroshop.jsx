import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import style from "./Heroshop.module.css";
import "../../main.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  //paginaton
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
        setdata(res.data.result);
        setproductinfo(res.data.result);
        localStorage.setItem("products", JSON.stringify(res.data.result));
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
    navigate("/shop");
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      axios
        .post(
          `${import.meta.env.VITE_URL}/cart/addToCart/${localStorage.getItem(
            "id"
          )}/${localStorage.getItem("userid")}/1/Cleaning Method 1`,
          {},
          config
        )
        .then((res) => {
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
    if (data.length / itemsPerPage > currentPage) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(Math.floor(data.length / itemsPerPage));
      console.log(currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
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

      {/* page content static container */}
      <div className="page-content mb-10 shop-page shop-horizontal">
        <div className="container">
          <CRow xs={{ cols: 1 }} className="g-4">
            {/* Product 1 */}
            {data.length === 0 && (
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
            {data.length > 0 && Array.isArray(data) ? (
              data
                .map((field, index) => (
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
                        <CCardImage
                          src={
                            field.images.length > 0
                              ? field.images[0].imageUrl
                              : ""
                          }
                        />
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
                              handleAddcart();
                            }}
                          >
                            Add To Cart
                          </a>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))
                .slice(indexOfFirstItem, indexOfLastItem)
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
        <div>
          <button
            onClick={() => {
              handleNextPage();
            }}
          >
            Next
          </button>
          <p>{currentPage}</p>
          <button
            onClick={() => {
              handlePreviousPage();
            }}
          >
            Previous
          </button>
        </div>
      </div>
      {/* ends */}

      {cart ? <Herocart /> : ""}
    </main>
  );
}

export default Heroshop;
