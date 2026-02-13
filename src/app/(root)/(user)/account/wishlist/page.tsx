import AccountBreadcrumb from "@/components/account/breadcrumb";
import Wishlist from "@/components/account/wishlist";

export default function page() {
  return (
    <>
      <div>
        <AccountBreadcrumb>Wishlist</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Wishlist</h1>
        <p className="text-muted-foreground">
          Your farming journey at a glance
        </p>
      </div>
      <Wishlist></Wishlist>
    </>
  );
}
