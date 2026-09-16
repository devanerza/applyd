import { Link, usePage } from '@inertiajs/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { AppSidebar } from '@/Pages/Applications/Components/app-sidebar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-base-100">
            <AppSidebar />
            <div className="ml-64">
                {children}
            </div>
        </div>
    );
}
