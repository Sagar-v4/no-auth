import { usePathname } from "next/navigation";

import { USERS } from "@/registry/sidebar";

export function useURL() {
  const user_type = usePathname().valueOf().split("/").at(1) as USERS;
  const page_name = usePathname().valueOf().split("/").at(2) as string;

  return { user_type, page_name };
}
