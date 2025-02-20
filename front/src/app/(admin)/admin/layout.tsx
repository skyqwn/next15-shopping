import { getUserInfo } from "@/utils/check-amdin-role";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await getUserInfo();

  if (!isAdmin) redirect("/");

  if (isAdmin.data.role === "USER") {
    redirect("/");
  }

  return <div>{children}</div>;
}
