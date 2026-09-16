import { Link, usePage } from '@inertiajs/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { AppSidebar } from '@/Pages/Applications/Components/app-sidebar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-base-100">
            <AppSidebar />
            <div className="ml-64 min-h-screen" style={{ background: 'linear-gradient(165deg, color-mix(in srgb, var(--p) 15%, var(--b1)) 0%, var(--b1) 50%, color-mix(in srgb, var(--p) 8%, var(--b1)) 100%)' }}>
                {children}
            </div>
        </div>
    );
}
