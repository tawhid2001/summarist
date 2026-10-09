import Sidebar from "@/components/app/Sidebar";
import SearchBar from "@/components/app/SearchBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <SearchBar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
