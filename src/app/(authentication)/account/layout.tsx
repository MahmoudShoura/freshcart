import AccountSidebar from "@/features/auth/components/account/AccountSidebar";
import type { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
        <AccountSidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
