import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusDropdown from '@/Components/StatusDropdown';
import PageHeader from '@/Components/PageHeader';
import {
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
                <PageHeader
                    title={`Good morning, ${user.name}`}
                    subtitle="Here is an overview of your job search activities today."
                    searchValue={search}
                    onSearchChange={setSearch}
                    onSearchSubmit={() => router.get(route('applications.index'), { search }, { preserveState: true, preserveScroll: true })}
                    searchPlaceholder="Search applications..."
                />

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
                                            <StatusDropdown 
                                                applicationId={app.id}
                                                currentStatus={app.status}
                                                size="sm"
                                            />
                                        </div>

                                        <p className="font-headline mt-4 font-bold text-indigo-900">
                                            {app.role_title}
                                        </p>
                                        <p className="text-sm text-indigo-800/80">
                                            {app.company_name}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {(app.recruiter_name || app.recruiter_email) ? (
                                                    <Link
                                                        href={route('applications.show', app.id)}
                                                        className="font-body rounded-full px-4 py-2 text-xs font-semibold bg-primary text-primary-content hover:bg-primary/80 transition-colors"
                                                    >
                                                        Follow up
                                                    </Link>
                                                ) : (
                                                    <button
                                                        disabled
                                                        title="Add recruiter contact to enable follow-ups"
                                                        className="font-body rounded-full px-4 py-2 text-xs font-semibold bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                                                    >
                                                        Follow up
                                                    </button>
                                                )}
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
