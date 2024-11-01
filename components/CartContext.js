import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
    if (cartProducts.length > 0) {
      console.log("Saving cart to localStorage:", cartProducts);
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);
  
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      const storedCart = JSON.parse(ls.getItem('cart'));
      console.log("Loaded cart from localStorage:", storedCart);
      setCartProducts(storedCart || []);
    }
  }, [ls]); 

  const areOptionsEqual = (options1, options2) => {
    return Object.keys(options1).length === Object.keys(options2).length &&
      Object.keys(options1).every(key => options1[key] === options2[key]);
  };

  const addProduct = (productId, selectedOptions) => {
    console.log("Adding product:", productId, "with options:", selectedOptions);
    
    if (productId && typeof productId === "string") {
      setCartProducts(prev => {
        const existingProductIndex = prev.findIndex(item => 
          item.productId === productId && areOptionsEqual(item.selectedOptions, selectedOptions)
        );

        console.log("Existing product index:", existingProductIndex);

        if (existingProductIndex > -1) {
          console.log("Product found, incrementing quantity:", prev[existingProductIndex]);
          return prev.map((item, index) =>
            index === existingProductIndex
              ? {
                  ...item,
                  quantity: (item.quantity || 0) + 1 // Start from 0 if quantity is undefined
                }
              : item
          );
        } else {
          console.log("Product not found, adding new product");
          // Handle adding a new product to the cart
          return [...prev, { productId, selectedOptions, quantity: 1 }];
        }
      });
    } else {
      console.error("Invalid productId provided:", productId);
    }
  };

  const removeProduct = (productId, selectedOptions) => {
    console.log("Removing product:", productId, "with options:", selectedOptions);
    
    if (productId && typeof productId === "string") {
      setCartProducts(prev => {
        const existingProductIndex = prev.findIndex(item => 
          item.productId === productId && areOptionsEqual(item.selectedOptions, selectedOptions)
        );

        console.log("Existing product index for removal:", existingProductIndex);

        if (existingProductIndex > -1) {
          const currentItem = prev[existingProductIndex];
          if (currentItem.quantity > 1) {
            console.log("Decrementing quantity for product:", currentItem);
            return prev.map((item, index) =>
              index === existingProductIndex
                ? {
                    ...item,
                    quantity: currentItem.quantity - 1
                  }
                : item
            );
          } else {
            console.log("Removing product from cart:", currentItem);
            return prev.filter((item, index) => index !== existingProductIndex);
          }
        } else {
          console.error("Product not found in cart for productId:", productId);
          return prev; 
        }
      });
    } else {
      console.error("Invalid productId provided:", productId);
    }
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCartProducts([]);
    if (ls) {
      ls.removeItem('cart');
    }
  };

  return (
    <CartContext.Provider value={{ cartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
