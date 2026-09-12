import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Briefcase,
    TrendingUp,
    Plus,
    FolderOpen,
    LogOutIcon,
    UserIcon,
} from 'lucide-react';

export function AppSidebar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

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

            <Link
                href={route('applications.create')}
                className="mb-6 flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-headline text-sm font-semibold text-primary-content hover:bg-primary/80 transition-colors"
            >
                <Plus className="h-4 w-4" />
                Add Application
            </Link>

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
                <Link
                    href={route('documents.index')}
                    className="flex items-center gap-3 rounded-full px-4 py-3 font-body text-sm text-base-content/60 hover:bg-secondary/30 transition-colors"
                >
                    <FolderOpen className="h-4 w-4" />
                    Documents
                </Link>
                <Link
                    href={route('profile.edit')}
                    className="flex items-center gap-3 rounded-full px-4 py-3 font-body text-sm text-base-content/60 hover:bg-secondary/30 transition-colors"
                >
                    <UserIcon className="h-4 w-4" />
                    Profile
                </Link>
                <button
                    type="button"
                    onClick={() => router.post(route('logout'))}
                    className="flex w-full items-center gap-3 rounded-full px-4 py-3 font-body text-sm text-base-content/60 hover:bg-secondary/30 transition-colors"
                >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                </button>
            </nav>
        </aside>
    );
}
