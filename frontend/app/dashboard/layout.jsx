import Sidebar from './components/Sidebar'
import Header from './components/Header'


export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pt-20 px-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
