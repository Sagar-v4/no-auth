import { sso_url } from "@no-auth/next";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link href={sso_url.toString()}>Go to Single Sign On</Link>
      </div>
    </div>
  );
}
