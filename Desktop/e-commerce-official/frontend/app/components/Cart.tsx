import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const Cart = () => {
  const { auth } = useAuth();
  const cartIds = auth?.user.cart.map((c) => c.productId);
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = Promise.all(
        cartIds.map(async (id) => {
          const res = await fetch(`/api/products/${id}`);
          return res.json();
        })
      );
      const data = await res;
      setProducts(data);
    };
); 
   
   []);
  return <div></div>;
};

export default Cart;
