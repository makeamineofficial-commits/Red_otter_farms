import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: { publicId: string };
}) {
  const { publicId } = await params;
  redirect(`/admin/dashboard/recipe/${publicId}/update`);
}
