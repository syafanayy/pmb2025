// app/dashboard/layout.js
import AdminLayout from '../../components/AdminLayout';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your store',
};

export default function DashboardLayout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}