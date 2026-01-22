import { Grid } from "@/components/user/recipe/grid";
import { Header } from "@/components/user/recipe/header";
export default function page() {
  return (
    <>
      <section className="pt-45 px-4 md:px-12 lg:px-18 pb-5">
        <Header></Header>
        <Grid></Grid>
      </section>
    </>
  );
}
