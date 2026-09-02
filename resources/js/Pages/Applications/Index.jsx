import { Head, Link } from '@inertiajs/react';
import { AppSidebar } from './Components/app-sidebar';
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    CheckCircle2,
    AlertTriangle,
    Ban,
    ArrowRight,
    Building2,
} from 'lucide-react';

export default function ApplicationsIndex() {
    const user = {
        name: 'Devan',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    };

    const filters = [
        { label: 'Status', hasDropdown: true },
        { label: 'Source', hasDropdown: true },
        { label: 'Follow-up Due', active: true },
        { label: 'Ghosted' },
    ];

    const applications = [
        {
            id: 1,
            role: 'Backend Developer',
            company: 'Acme Corp',
            status: 'Applied',
            health: 'attention',
        },
        {
            id: 2,
            role: 'Full-Stack Engineer',
            company: 'Nimbus Labs',
            status: 'Screening',
            health: 'healthy',
        },
        {
            id: 3,
            role: 'Frontend Developer (React)',
            company: 'Kirana Tech',
            status: 'Interview',
            health: 'healthy',
            statusIcon: true,
        },
        {
            id: 4,
            role: 'Web Dev',
            company: 'Global Tech',
            status: 'Applied',
            health: 'ghosted',
        },
    ];

    const healthStyles = {
        attention: {
            card: 'bg-indigo-100/70',
            iconWrap: 'bg-white',
            iconColor: 'text-indigo-600',
            badge: 'bg-white/80 text-gray-600',
            title: 'text-indigo-900',
            subtitle: 'text-indigo-800/80',
            label: 'text-amber-700',
            labelIcon: AlertTriangle,
            labelText: 'Needs Attention',
            action: 'bg-indigo-600 hover:bg-indigo-700',
        },
        healthy: {
            card: 'bg-emerald-400',
            iconWrap: 'bg-white',
            iconColor: 'text-emerald-600',
            badge: 'bg-white/70 text-emerald-900',
            title: 'text-emerald-950',
            subtitle: 'text-emerald-950/70',
            label: 'text-emerald-950',
            labelIcon: CheckCircle2,
            labelText: 'Healthy',
            action: 'bg-emerald-600 hover:bg-emerald-700',
        },
        ghosted: {
            card: 'bg-red-100',
            iconWrap: 'bg-white',
            iconColor: 'text-red-600',
            badge: 'bg-white/70 text-red-800',
            title: 'text-red-900',
            subtitle: 'text-red-800/80',
            label: 'text-red-800',
            labelIcon: Ban,
            labelText: 'Likely Ghosted',
            action: 'bg-red-700 hover:bg-red-800',
        },
    };

    return (
        <>
            <Head title="Applications" />

            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />

                <main className="ml-64 flex-1 px-10 py-8">
                    <div className="mb-8 flex items-center justify-end gap-4">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-indigo-400"
                            />
                        </div>
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="h-10 w-10 rounded-full ring-2 ring-indigo-500"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Your Applications
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and track your job search progress.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                        {filters.map((filter) => (
                            <button
                                key={filter.label}
                                type="button"
                                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
                                    filter.active
                                        ? 'border-emerald-400 bg-emerald-400/20 text-emerald-700'
                                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {filter.active && (
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                )}
                                {filter.label}
                                {filter.hasDropdown && (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {applications.map((app) => {
                            const style = healthStyles[app.health];
                            const LabelIcon = style.labelIcon;

                            return (
                                <div
                                    key={app.id}
                                    className={`rounded-2xl ${style.card} p-5`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full ${style.iconWrap}`}
                                        >
                                            <Building2
                                                className={`h-5 w-5 ${style.iconColor}`}
                                            />
                                        </div>
                                        <span
                                            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
                                        >
                                            {app.status}
                                        </span>
                                    </div>

                                    <p
                                        className={`mt-4 truncate font-bold ${style.title}`}
                                        title={app.role}
                                    >
                                        {app.role}
                                    </p>
                                    <p
                                        className={`text-sm ${style.subtitle}`}
                                    >
                                        {app.company}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span
                                            className={`flex items-center gap-1 text-xs font-medium ${style.label}`}
                                        >
                                            <LabelIcon className="h-3.5 w-3.5" />
                                            {style.labelText}
                                        </span>
                                        <Link
                                            href={route(
                                                'applications.show',
                                                app.id,
                                            )}
                                            className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${style.action}`}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </>
    );
}
