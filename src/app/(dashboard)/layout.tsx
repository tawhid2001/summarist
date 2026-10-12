import DashboardContent from "@/components/app/DashboardContent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContent>
      {children}
    </DashboardContent>
  );
}