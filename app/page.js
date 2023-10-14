"use client";
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Nav from "./components/nav";
import {
  totalNumberOfItem,
  getFromLocalStorage,
} from "./components/ProductHandler";
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [numberOfCartItems, setNumberOfCartItems] = useState(
    totalNumberOfItem()
  );
  const [cartItem, setCartItem] = useState(getFromLocalStorage());

  useEffect(() => {
    setIsClient(true);
  }, []);
  const updateCart = () => {
    setNumberOfCartItems(numberOfCartItems + 1);
    localStorage.setItem("numberOfCartItems  ", numberOfCartItems + 1);
    setCartItem(JSON.parse(window.localStorage.getItem("cartItems")));
  };

  const removeCart = () => {
    setNumberOfCartItems(0);
  };
  const removeItem = () => {
    setNumberOfCartItems(numberOfCartItems - 1);
    localStorage.setItem("numberOfCartItems  ", numberOfCartItems - 1);
    setCartItem(JSON.parse(window.localStorage.getItem("cartItems")));
  };

  //console.log(totalNumberOfItem());
  return (
    <>
      {isClient ? (
        <>
          <Nav
            numberOfCartItems={numberOfCartItems}
            removeCart={removeCart}
            removeItem={removeItem}
            updateCart={updateCart}
            cartItem={cartItem}
          />
          <ProductList
            updateCart={updateCart}
            numberOfCartItems={numberOfCartItems}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
