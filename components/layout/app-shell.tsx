import { Header } from "./header";
import { Footer } from "./footer";
import { SidebarNav } from "./sidebar-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <aside className="sticky top-28 hidden h-fit w-64 shrink-0 lg:block">
          <SidebarNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
