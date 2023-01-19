import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthCheck(props: any) {
  const { data: session } = useSession();
  return session ? props.children : props.fallback || <></>;
}
