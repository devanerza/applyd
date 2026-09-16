import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Briefcase,
    TrendingUp,
    Plus,
    LogOut,
} from 'lucide-react';
import { useState } from 'react';
import AddApplicationModal from './AddApplicationModal';

export function AppSidebar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const menuItems = [
        { href: route('dashboard'), label: 'Dashboard', icon: LayoutDashboard },
        { href: route('applications.index'), label: 'Applications', icon: Briefcase },
        { href: route('insights.index'), label: 'Insights', icon: TrendingUp },
    ];

    const isActive = (href) => {
        const path = new URL(href, window.location.origin).pathname;
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <>
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-neutral bg-base-100 px-4 py-6 overflow-hidden">
            <div className="mb-8 flex items-center gap-2 px-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Briefcase className="h-5 w-5 text-primary-content" />
                </div>
                <div>
                    <p className="font-headline text-lg font-bold leading-tight text-primary">
                        JobTracker
                    </p>
                    <p className="font-label text-xs text-base-content/50 tracking-wide uppercase">
                        Stay organized
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mb-6 flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-headline text-sm font-semibold text-primary-content hover:bg-primary/80 transition-colors w-full"
            >
                <Plus className="h-4 w-4" />
                Add Application
            </button>

            <nav className="space-y-1">
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-full px-4 py-3 font-body text-sm transition-colors ${
                                active
                                    ? 'bg-secondary text-secondary-content font-semibold'
                                    : 'text-base-content/60 hover:bg-secondary/30'
                            }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile card */}
            <div className="mt-auto border-t border-neutral pt-4">
                <div className="flex items-center gap-3 rounded-2xl bg-base-200 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-base-content">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-base-content/50">
                            {user.email}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => router.post(route('logout'))}
                        className="shrink-0 rounded-full p-2 text-base-content/40 transition-colors hover:bg-error/10 hover:text-error"
                        title="Logout"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>

        {/* Rendered outside the <aside> on purpose: a fixed-position aside creates its own
            stacking context, which would trap the modal's z-index inside it and let page
            content paint over the modal. As a sibling, the modal joins the root stacking
            context and its z-[9999] works as intended. */}
        <AddApplicationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    );
}
