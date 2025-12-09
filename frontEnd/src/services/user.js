import { httpserviseObj } from "./httpServise";

export async function getUsers(token) {
  const response = await httpserviseObj.get("/api/users/", {
    headers: { "x-auth-token": token },
  });
  return response;
}
