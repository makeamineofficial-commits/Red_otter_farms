"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { getCart } from "@/actions/user/cart/get.action";
import { updateCart } from "@/actions/user/cart/update.action";
import { Cart, Item } from "@/types/cart";
import { useAccountStore } from "@/store/user/account.store";
import { loyaltyDiscount } from "@/types/product";

type ContextType = {
  isOpen: boolean;
  toggle: () => void;
  update: (args: {
    item: Item;
    quantity: number;
    toggle?: boolean;
  }) => Promise<void>;
  remove: (args: { variantId: string }) => Promise<void>;
  updateMany: (args: {
    items: { item: Item; quantity: number }[];
    toggle?: boolean;
  }) => Promise<void>;
  discount: number;
  cart: Cart | null;
  isUpdating: boolean;
  isLoading: boolean;

  lockCart: boolean;
  setLockCart: Dispatch<SetStateAction<boolean>>;
  refetch: Function;
};

const Context = createContext<ContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [lockCart, setLockCart] = useState(false);
  const { data: user, isLoading: userLoading, isFetching } = useAccountStore();
  const refetch = async () => {
    try {
      setLoading(true);
      const cart = await getCart();
      setCart(cart);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refetch();
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);

  const remove = async ({ variantId }: { variantId: string }) => {
    if (!cart || lockCart) return;

    const previousCart = cart;
    const updatedCart: Cart = {
      ...cart,
      items: cart.items.filter((p) => p.variant.publicId !== variantId),
    };
    setCart(updatedCart);
    try {
      setUpdating(true);
      await updateCart({
        variantId,
        quantity: 0,
      });
    } catch (err) {
      setCart(previousCart);
    } finally {
      setUpdating(false);
    }
  };

  const update = async ({
    item,
    quantity,
    toggle = true,
  }: {
    item: Item;
    quantity: number;
    toggle?: boolean;
  }) => {
    if (!cart || lockCart) return;

    const previousCart = cart;

    const exists = cart.items.some(
      (p) => p.variant.publicId === item.variant.publicId,
    );

    const updatedItems = exists
      ? cart.items.map((p) =>
          p.variant.publicId === item.variant.publicId ? { ...p, quantity } : p,
        )
      : [
          ...cart.items,
          {
            ...item,
            quantity,
          },
        ];

    const updatedCart: Cart = {
      ...cart,
      items: updatedItems,
    };

    setCart(updatedCart);

    if (toggle) setIsOpen(true);

    try {
      setUpdating(true);
      await updateCart({
        variantId: item.variant.publicId,
        quantity,
      });
    } catch (err) {
      setCart(previousCart);
    } finally {
      setUpdating(false);
    }
  };

  const updateMany = async ({
    items,
    toggle = true,
  }: {
    items: { item: Item; quantity: number }[];
    toggle?: boolean;
  }) => {
    if (!cart || lockCart) return;

    const previousCart = cart;

    const itemMap = new Map(
      cart.items.map((p) => [p.variant.publicId, { ...p }]),
    );

    for (const { item, quantity } of items) {
      const existing = itemMap.get(item.variant.publicId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        itemMap.set(item.variant.publicId, {
          ...item,
          quantity,
        });
      }
    }

    const updatedCart: Cart = {
      ...cart,
      items: Array.from(itemMap.values()),
    };

    setCart(updatedCart);

    if (toggle) setIsOpen(true);

    try {
      setUpdating(true);
      await Promise.all(
        items.map(({ item, quantity }) =>
          updateCart({
            variantId: item.variant.publicId,
            quantity:
              (previousCart.items.find(
                (p) => p.variant.publicId === item.variant.publicId,
              )?.quantity ?? 0) + quantity,
          }),
        ),
      );
    } catch (err) {
      setCart(previousCart);
    } finally {
      setUpdating(false);
    }
  };

  const discount = useMemo(() => {
    if (!user) return 1;
    const status = user.loyality_status?.toLowerCase().trim() ?? "none";
    return loyaltyDiscount[status] ?? 1;
  }, [user, isFetching, userLoading]);

  return (
    <Context.Provider
      value={{
        discount,
        isOpen,
        toggle,
        update,
        remove,
        isUpdating,
        isLoading,
        updateMany,
        cart,
        refetch,
        lockCart,
        setLockCart,
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
