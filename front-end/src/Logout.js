import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  return redirect("/");
}
