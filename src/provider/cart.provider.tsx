"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCart } from "@/actions/user/cart/get.action";
import { updateCart } from "@/actions/user/cart/update.action";
import { Cart, CartProduct } from "@/types/cart";

type ContextType = {
  isOpen: boolean;
  toggle: () => void;
  update: (args: { product: CartProduct; quantity: number }) => Promise<void>;
  remove: (args: { productPublicId: string }) => Promise<void>;
  cart: Cart | null;
  isUpdating: boolean;
  isLoading: boolean;
};

const Context = createContext<ContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const cart = await getCart();
        setCart(cart);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);

  const remove = async ({ productPublicId }: { productPublicId: string }) => {
    if (!cart) return;

    const previousCart = cart;
    const updatedCart: Cart = {
      ...cart,
      products: cart.products.filter((p) => p.publicId !== productPublicId),
    };
    setCart(updatedCart);
    try {
      setUpdating(true);
      await updateCart({
        productPublicId,
        quantity: 0,
      });
    } catch (err) {
      setCart(previousCart);
    } finally {
      setUpdating(false);
    }
  };

  const update = async ({
    product,
    quantity,
  }: {
    product: CartProduct;
    quantity: number;
  }) => {
    if (!cart) return;

    const previousCart = cart;

    const exists = cart.products.some((p) => p.publicId === product.publicId);

    const updatedProducts = exists
      ? cart.products.map((p) =>
          p.publicId === product.publicId ? { ...p, quantity } : p,
        )
      : [
          ...cart.products,
          {
            ...product,
            quantity,
          },
        ];

    const updatedCart: Cart = {
      ...cart,
      products: updatedProducts,
    };

    setCart(updatedCart);
    setIsOpen(true);
    try {
      setUpdating(true);
      await updateCart({
        productPublicId: product.publicId,
        quantity,
      });
    } catch (err) {
      // rollback on failure
      setCart(previousCart);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Context.Provider
      value={{
        isOpen,
        toggle,
        update,
        remove,
        isUpdating,
        isLoading,
        cart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCart = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
