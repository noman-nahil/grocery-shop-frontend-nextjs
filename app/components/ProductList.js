"use client";
import React, { useEffect, useState } from "react";
import { addToLocalStorage, totalNumberOfItem } from "./ProductHandler.js";
import Modal from "react-modal";

const ProductList = ({ updateCart, numberOfCartItems }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [islLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState([]);
  const [cartConfirmation, setCartConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://192.168.0.109:3000/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        //console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        //console.error("Error fetching data:", error.message);
      });
  }, []);
  const searchHandle = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setItem([]);
    setCartConfirmation(false);
  };

  const modalHandle = (product) => {
    const selectedItem = product;
    setIsOpen(true);
    setItem(selectedItem);
  };

  const productOrder = () => {
    setIsOpen(false);
    setCartConfirmation(true);
    setTimeout(() => {
      setCartConfirmation(false);
    }, 1500);
    const type = addToLocalStorage(updateCart, item);
    setMessage(type);

    /*const cartList = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isInList = cartList.find((p) => p.id === item.id);
    if (isInList) {
      setMessage("Item is already in the cart");
      //console.log("Item is already in the cart");
      console.log(cartList);
    } else {
      item.count = 1;
      cartList.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cartList));
      setMessage("Item added to the cart.");
      updateCart();
    }*/
  };
  const productModalHide = () => {
    setCartConfirmation(false);
    setItem([]);
  };

  return (
    <div className="mx-4 my-4md:mx-16 md:my-10">
      <input
        type="text"
        id="search-navbar"
        className="block  lg:w-1/3 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg mb-5 mx-auto mt-4"
        placeholder="Search..."
        onChange={searchHandle}
      />
      <div>
        {islLoading !== true ? (
          error === "" ? (
            filteredProducts.length !== 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    className="max-w-sm  rounded overflow-hidden shadow-lg border border-2"
                    key={product.id}
                  >
                    <div className="h-fit">
                      <img
                        className="h-44 md:h-48 lg:h-52 xl:h-56  mx-auto"
                        src={product.link}
                      />
                    </div>
                    <div className="pr-2 md:px-6 pt-4 pb-2  ">
                      <div className="flex">
                        <p className="font-bold w-1/2 p-2">{product.name}</p>
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm ml-auto  p-2  "
                          onClick={() => modalHandle(product)}
                        >
                          See more
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" text-center md:text-xl font-bold  py-10 md:p-10">
                Unfortunately, we currently don't have any products available at
                the moment"
              </div>
            )
          ) : (
            <div className=" text-center md:text-xl font-bold  py-10 md:p-10">
              {error}
            </div>
          )
        ) : (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      {cartConfirmation && (
        <div className="fixed bottom-0 right-0 inset-y-1/4 md:inset-1/4 w-full h-fit md:w-2/4  p-8 md:p-0">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg border border-2 ">
            <div className="flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 rounded-lg">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <h2 className="text-xl font-semibold mb-4">{message}</h2>
              {/* <button
                className=" bg-white text-lg text-black font-bold py-2 px-4 rounded ml-auto"
                onClick={cartMessageHide}
              >
                X
              </button> */}
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 inline-flex items-center justify-center h-8 w-8 "
                data-dismiss-target="#toast-success"
                aria-label="Close"
                onClick={productModalHide}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokewidth-="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          ariaHideApp={false}
          className="fixed bottom-0 right-0 inset-y-1/4 md:inset-1/4 w-full  md:w-2/4   p-8 md:p-0"
        >
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg border border-2 ">
            {/* <h2 className="text-xl font-semibold mb-4">{item.name}</h2> */}
            <div className="flex">
              <button
                onClick={toggleModal}
                className=" bg-white text-lg text-black font-bold py-2 px-4 rounded ml-auto"
              >
                X
              </button>
            </div>
            <img
              className="h-44 md:h-48 lg:h-52 xl:h-56  mx-auto"
              src={item.link}
            />
            <div className="px-6 pt-4 pb-2  ">
              <div className="flex">
                <p className="font-bold w-1/2">{item.name}</p>
                <p className="text-sm    font-medium rounded-lg text-sm ml-auto  p-2 ">
                  Price : {item.price} $
                </p>
              </div>
            </div>
            <span className="">{item.description}</span>
            <div className="flex">
              <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-auto"
                onClick={productOrder}
              >
                Place in Cart
              </button>
              <button
                onClick={toggleModal}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
              >
                Close Modal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
