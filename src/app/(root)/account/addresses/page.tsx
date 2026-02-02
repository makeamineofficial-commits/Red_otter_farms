import AccountBreadcrumb from "@/components/account/breadcrumb";
import AddressGrid from "@/components/account/addresses/grid";
export default function page() {
  return (
    <>
      <div>
        <AccountBreadcrumb>Addresses</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Your Addresses</h1>
      </div>

      <AddressGrid></AddressGrid>
    </>
  );
}
