export const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const itemList = JSON.parse(localStorage.getItem("cartItems")) || [];
    return itemList;
  }
};

export const addToLocalStorage = (updateCart, item) => {
  const list = getFromLocalStorage();
  if (list.length !== 0) {
    const isInList = list.find((p) => p.id === item.id);
    if (isInList) {
      return "Item is already in the cart";
    } else {
      item.count = 1;
      list.push(item);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(list));
        updateCart();
        return "Item added to the cart.";
      }
    }
  } else {
    item.count = 1;
    list.push(item);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(list));
      updateCart();
      //console.log(item);
      return "Item added to the cart.";
    }
  }
};
export const totalNumberOfItem = () => {
  if (typeof window !== "undefined") {
    const item = parseInt(localStorage.getItem("numberOfCartItems  ") || 0);
    return item;
  }
};
