import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Ramadhan Planner 1447H",
  description: "Aplikasi perencana ibadah Ramadhan — lacak shalat, puasa, Al-Quran, doa, dan jadwal imsakiyah.",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ramadhan",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen stars-bg">
        <Sidebar />
        {/* Main content area - offset for sidebar on desktop, bottom nav on mobile */}
        <main className="md:ml-64 min-h-screen pb-24 md:pb-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
