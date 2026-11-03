import type { ReactNode } from "react";
export function ButtonLink({ href, children, variant = "primary", download, external }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost"; download?: boolean; external?: boolean }) {
  return <a className={`btn btn-${variant}`} href={href} download={download} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
}
