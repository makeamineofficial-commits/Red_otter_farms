import { Cart } from "@/types/cart";
import { PaymentStatus } from "@/lib/db";

export function buildNormalItems(cart: Cart) {
  return cart.items.map((i) => ({
    Name: i.product.displayName,
    Price: i.variant.price / 100,
    Currency: "INR",
    Quantity: i.quantity,
    ProductRetailerId: i.variant.sku,
  }));
}

export function buildDrystoreItems(cart: Cart) {
  return cart.items.map((i) => ({
    name: i.product.displayName,
    description: i.product.summary ?? "",
    quantity: i.quantity,
    price_per_item: (i.variant.price / 100).toFixed(2),
    total: ((i.variant.price / 100) * i.quantity).toFixed(2),
    sku: i.variant.sku,
  }));
}

export function buildNormalAddress(addr: any) {
  return {
    fax: "",
    zip: addr.zip,
    city: addr.city,
    phone: (addr.phone as string).startsWith("+91")
      ? addr.phone
      : "+91" + addr.phone,
    state: addr.state,
    county: "",
    address: addr.address,
    country: "India",
    street2: addr.street,
    attention: addr.notes,
    state_code: addr.stateCode,
    country_code: "IN",
  };
}

export function buildDrystoreAddress(addr: any) {
  return {
    first_name: addr.firstName,
    last_name: addr.lastName,
    company: "",
    address_1: addr.address,
    address_2: addr.street,
    city: addr.city,
    state: addr.state,
    postcode: addr.zip,
    country: "India",
    phone: (addr.phone as string).startsWith("+91")
      ? addr.phone
      : "+91" + addr.phone,
  };
}

export function mapRazorpayStatus(status: string): PaymentStatus {
  switch (status) {
    case "captured":
      return PaymentStatus.VERIFIED;

    case "failed":
      return PaymentStatus.FAILED;

    default:
      return PaymentStatus.PENDING;
  }
}
