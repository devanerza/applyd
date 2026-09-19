import { Link, usePage } from '@inertiajs/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { AppSidebar } from '@/Pages/Applications/Components/app-sidebar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen">
            <AppSidebar />
            <div className="ml-64 min-h-screen relative">
                <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 10% 0%, rgba(84, 37, 212, 0.25) 0%, transparent 60%)' }} />
                {children}
            </div>
        </div>
    );
}
