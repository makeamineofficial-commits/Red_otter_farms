import { Address, AddressProps } from "@/types/account";
import axios from "axios";

export const createAddress = async ({
  customerId,
  phone,
  address,
}: {
  phone: string;
  customerId: string;
  address: AddressProps & { state: string; country: string };
}) => {
  try {
    const {
      customLabel,
      label,
      tag,
      stateCode: state_code,
      countryCode: country_code,
      street: street2,
      zip: zip_code,
      ...rest
    } = address;

    const res = await axios.post(
      `https://automation.redotterfarms.com/webhook/9da662fb-adc1-482e-850f-0b69c588ef85`,
      {
        address: {
          mobile: phone,
          street2,
          zip_code,
          ...rest,
        },
      },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
        params: { customer_id: customerId },
      },
    );
    return { success: true, addressId: res.data[0].address_id as string };
  } catch (err) {
    console.warn("Failed to sync address with backend");
    return { success: false, addressId: null };
  }
};

export const updateAddress = async ({
  customerId,
  phone,
  address,
}: {
  phone: string;
  customerId: string;
  address: AddressProps & { state: string; country: string; addressId: string };
}) => {
  try {
    const {
      customLabel,
      label,
      tag,
      stateCode: state_code,
      countryCode: country_code,
      street: street2,
      zip: zip_code,
      ...rest
    } = address;

    const res = await axios.post(
      `https://automation.redotterfarms.com/webhook/cf21ea68-477f-4e50-9d20-d122a299bb21`,
      {
        address: {
          mobile: phone,
          street2,
          zip_code,
          ...rest,
        },
      },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
        params: { customer_id: customerId, address_id: address.addressId },
      },
    );

    return { success: true, addressId: res.data[0].address_id };
  } catch (err) {
    console.warn("Failed to sync address with backend");
    return { success: false, addressId: null };
  }
};

export const delAddress = async ({
  customerId,
  addressId,
}: {
  customerId: string;
  addressId: string;
}) => {
  try {
    const res = await axios.delete(
      `https://automation.redotterfarms.com/webhook/e1dc62a4-5233-4a63-b460-8b3a120794ea`,
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
        params: { customer_id: customerId, address_id: addressId },
      },
    );

    return { success: true, addressId: res.data[0].address_id };
  } catch (err) {
    console.warn("Failed to sync address with backend");
    return { success: false, addressId: null };
  }
};
