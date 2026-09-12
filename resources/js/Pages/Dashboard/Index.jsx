import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Search,
    CheckCircle2,
    MessageCircle,
    AlertTriangle,
    Building2,
    CalendarClock,
} from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ summary, needsAttention }) {
    const user = usePage().props.auth.user;

    const [search, setSearch] = useState('');
    const [ignoredIds, setIgnoredIds] = useState([]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('applications.index'), { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleIgnore = (id) => {
        setIgnoredIds((prev) => [...prev, id]);
    };

    const visible = (needsAttention ?? []).filter(
        (app) => !ignoredIds.includes(app.id)
    );

    const stats = [
        {
            label: 'Active Applications',
            value: summary?.active ?? 0,
            icon: CheckCircle2,
            bg: 'bg-secondary',
            iconBg: 'bg-secondary-content',
            labelColor: 'text-secondary-content',
        },
        {
            label: 'Waiting for response',
            value: summary?.waiting ?? 0,
            icon: MessageCircle,
            bg: 'bg-neutral',
            iconBg: 'bg-neutral-content',
        },
        {
            label: 'Likely ghosted',
            value: summary?.ghosted ?? 0,
            icon: AlertTriangle,
            bg: 'bg-warning',
            iconBg: 'bg-warning-content',
            labelColor: 'text-warning-content',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="px-10 py-8">
                {/* Top bar */}
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="font-headline text-2xl font-bold text-gray-900">
                            Good morning, {user.name}
                        </h1>
                        <p className="mt-1 font-body text-sm text-gray-500">
                            Here is an overview of your job search activities
                            today.
                        </p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                                placeholder="Search applications..."
                                className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-indigo-400"
                            />
                        </div>
                        <img
                            src={user.avatarUrl ?? `https://i.pravatar.cc/40?img=${user.id ?? 5}`}
                            alt={user.name}
                            className="h-10 w-10 rounded-full ring-2 ring-primary"
                        />
                    </div>
                </div>

                {/* Stat cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className={`flex items-center gap-4 rounded-3xl ${stat.bg} px-6 py-5`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.iconBg}`}
                                >
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p
                                        className={`font-headline text-sm font-bold tracking-wide uppercase ${stat.labelColor ?? 'text-gray-700'}`}
                                    >
                                        {stat.label}
                                    </p>
                                    <p className="font-body text-md text-gray-900">
                                        {String(stat.value).padStart(2, '0')}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Needs attention + Upcoming */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Needs attention */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-headline flex items-center gap-2 text-lg font-bold text-gray-900">
                                <AlertTriangle className="h-4 w-4 text-indigo-600" />
                                Needs attention
                            </h2>
                            <Link
                                href={route('applications.index')}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                View all
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {visible.length === 0 ? (
                                <div className="col-span-2 rounded-3xl border-2 border-dashed border-gray-300 p-8 text-center">
                                    <p className="mb-2 text-lg font-bold text-gray-700">No applications need attention</p>
                                    <Link
                                        href={route('applications.create')}
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                                    >
                                        Create application
                                    </Link>
                                </div>
                            ) : (
                                visible.map((app) => (
                                    <div
                                        key={app.id}
                                        className="rounded-3xl bg-accent p-5"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                                <Building2 className="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="rounded-full bg-primary/20 px-3 py-1 font-label font-bold text-[10px] tracking-wide uppercase text-primary">
                                                {app.status}
                                            </span>
                                        </div>

                                        <p className="font-headline mt-4 font-bold text-indigo-900">
                                            {app.role_title}
                                        </p>
                                        <p className="text-sm text-indigo-800/80">
                                            {app.company_name}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('applications.show', app.id)}
                                                    className={`font-body rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                                                        app.recruiter_name ||
                                                        app.recruiter_email
                                                            ? 'bg-primary text-primary-content hover:bg-primary/80'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                                    }`}
                                                    title={
                                                        app.recruiter_name ||
                                                        app.recruiter_email
                                                            ? ''
                                                            : 'Add recruiter contact to enable follow-ups'
                                                    }
                                                >
                                                    Follow up
                                                </Link>
                                                <button
                                                    onClick={() => handleIgnore(app.id)}
                                                    className="font-body rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                                                >
                                                    Ignore
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Upcoming — placeholder until Interview model exists */}
                    <div>
                        <h2 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <CalendarClock className="h-4 w-4 text-indigo-600" />
                            Upcoming
                        </h2>

                        <div className="rounded-3xl bg-secondary p-5 text-secondary-content">
                            <span className="font-label rounded-full bg-secondary-content/20 px-2 py-1 text-[10px] text-secondary-content font-bold tracking-wide uppercase">
                                INTERVIEW
                            </span>

                            <p className="font-headline mt-3 font-bold">
                                No upcoming interviews
                            </p>
                            <p className="text-sm text-emerald-950/80">
                                Add interviews to see them here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
