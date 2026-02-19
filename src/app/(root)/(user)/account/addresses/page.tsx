import AccountBreadcrumb from "@/components/account/breadcrumb";
import AddressGrid from "@/components/account/addresses/grid";
import CreateAddressForm from "@/components/account/addresses/create";
export default function page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <AccountBreadcrumb>Addresses</AccountBreadcrumb>
          <h1 className="text-[1.4rem] font-bold">Your Addresses</h1>
        </div>
        <CreateAddressForm></CreateAddressForm>
      </div>

      <AddressGrid></AddressGrid>
    </>
  );
}
