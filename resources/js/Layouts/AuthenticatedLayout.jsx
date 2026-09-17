import { Link, usePage } from '@inertiajs/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { AppSidebar } from '@/Pages/Applications/Components/app-sidebar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-base-100">
            <AppSidebar />
            <div className="ml-64 min-h-screen bg-base-100" style={{ backgroundImage: 'radial-gradient(ellipse at 10% 0%, color-mix(in srgb, var(--p) 20%, transparent) 0%, transparent 60%)' }}>
                {children}
            </div>
        </div>
    );
}
