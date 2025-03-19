import { usePathname } from "next/navigation";

import { USERS } from "@/registry/sidebar";

export function useURL() {
  const url = usePathname();
  const url_arr = url.valueOf().split("/");
  const user_type = url_arr.at(1) as USERS;
  const page_name = url_arr.at(2) as string;

  return { url, url_arr, user_type, page_name };
}
