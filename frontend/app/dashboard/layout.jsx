import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function DashboardLayout({ children }) {
  return (
    <ReactQueryProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="pt-20 px-6 bg-gray-100 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </ReactQueryProvider>
  );
}
