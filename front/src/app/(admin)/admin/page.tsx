import { redirect } from "next/navigation";

const AdminPage = () => {
  redirect("/admin/add-product");
};

export default AdminPage;
