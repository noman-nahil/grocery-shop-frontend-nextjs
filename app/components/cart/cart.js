import React, { useState } from "react";
import Modal from "react-modal";

const Cart = (props) => {
  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [numberOfCartItems, setNumberOfCartItems] = useState(
    parseInt(localStorage.getItem("numberOfCartItems  ") || 0)
  );
  const totalValue = cartItem.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.count;
  }, 0);

  const increment = (item) => {
    item.count = item.count + 1;
    const updatedArray = [...cartItem];
    setCartItem(updatedArray);
    localStorage.setItem("cartItems", JSON.stringify(updatedArray));
  };

  const decrement = (item) => {
    if (item.count > 1) {
      item.count = item.count - 1;
      const updatedArray = [...cartItem];
      setCartItem(updatedArray);
      localStorage.setItem("cartItems", JSON.stringify(updatedArray));
    }
  };
  const deleteItem = (item) => {
    const updatedList = cartItem.filter((i) => i.id !== item.id);
    setCartItem(updatedList);
    localStorage.setItem("cartItems", JSON.stringify(updatedList));
    props.removeItem();
  };
  // console.log(props);
  return (
    <Modal
      isOpen={props.toggleCart}
      onRequestClose={props.toggleCart}
      className="fixed bottom-0 right-0 inset-y-1/4  w-full  md:w-full   px-1 md:px-16 lg:px-36"
    >
      <div className=" modal-content bg-white p-6 rounded-lg shadow-lg border border-2 ">
        {/* <h2 className="text-xl font-semibold mb-4">{item.name}</h2> */}
        <div className="flex">
          <button
            className=" bg-white text-lg text-black font-bold py-2 px-4 rounded ml-auto"
            onClick={props.toggleCart}
          >
            X
          </button>
        </div>
        {cartItem.length !== 0 ? (
          <table className="w-full text-sm text-center text-gray-900 ">
            {/* <thead className="text-xs text-gray-900 uppercase bg-white "> */}
            <tr>
              <th scope="col" className="md:px-6 md:py-3">
                item name
              </th>
              <th scope="col" className="md:px-6 py-3">
                item count
              </th>

              <th scope="col" className="md:px-6 py-3">
                Price
              </th>
              <th scope="col" className="md:px-6 py-3">
                Amount
              </th>
            </tr>
            {/* </thead> */}
            {cartItem.map((item) => (
              <tr key={item.id}>
                <td scope="col" className=" md:px-6">
                  {item.name}
                </td>
                <td scope="col" className="md:px-6 flex ">
                  <button
                    className="bg-blue-700 px-2 md:px-4 mx-2 rounded-lg text-lg text-white"
                    onClick={() => decrement(item)}
                  >
                    -
                  </button>
                  <span className="py-2 w-4">{item.count}</span>
                  <button
                    className="bg-blue-700 px-2 md:px-4 mx-2 rounded-lg text-lg text-white"
                    onClick={() => increment(item)}
                  >
                    +
                  </button>
                </td>
                <td scope="col" className=" md:px-6">
                  {item.price}
                </td>
                <td scope="col" className=" px-2 md:px-6 ">
                  {item.price * item.count}
                </td>
                <td scope="col" className="md:px-6 ">
                  <button
                    className="bg-red-800 text-white px-4 rounded-lg"
                    onClick={() => deleteItem(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* <thead className="text-xs text-gray-900 uppercase bg-white "> */}
            <tr>
              <th scope="col" className="md:px-6 py-3"></th>
              <th scope="col" className="md:px-6 py-3"></th>

              <th scope="col" className="md:px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-1 md:px-6 py-3">
                {totalValue}
              </th>
            </tr>
            {/* </thead> */}
          </table>
        ) : (
          <p className="text-center ">There is no items in cart</p>
        )}

        <div className="flex">
          {cartItem.length !== 0 ? (
            <button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-auto"
              onClick={props.placeOrder}
            >
              Place order
            </button>
          ) : (
            <></>
          )}

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={props.toggleCart}
          >
            Close Modal
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
