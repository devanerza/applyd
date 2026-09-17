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
    ArrowRight,
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
            bg: 'bg-primary',
            iconBg: 'bg-primary-content',
            iconColor: 'text-primary',
            labelColor: 'text-primary-content/70',
            valueColor: 'text-primary-content',
        },
        {
            label: 'Waiting for response',
            value: summary?.waiting ?? 0,
            icon: MessageCircle,
            bg: 'bg-secondary',
            iconBg: 'bg-secondary-content',
            iconColor: 'text-secondary',
            labelColor: 'text-secondary-content/70',
            valueColor: 'text-secondary-content',
        },
        {
            label: 'Likely ghosted',
            value: summary?.ghosted ?? 0,
            icon: AlertTriangle,
            bg: 'bg-accent',
            iconBg: 'bg-white',
            iconColor: 'text-accent',
            labelColor: 'text-white/80',
            valueColor: 'text-white',
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
                                className={`flex items-center gap-4 rounded-3xl ${stat.bg} p-6`}
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg}`}
                                >
                                    <Icon className={`h-6 w-6 ${stat.iconColor ?? 'text-white'}`} />
                                </div>
                                <div>
                                    <p
                                        className={`font-body text-sm ${stat.labelColor ?? 'text-base-content/60'}`}
                                    >
                                        {stat.label}
                                    </p>
                                    <p className={`font-headline text-3xl font-bold ${stat.valueColor ?? 'text-base-content'}`}>
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
                        <div className="rounded-3xl border border-base-300 bg-base-200 p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-lg font-bold text-base-content">
                                    <AlertTriangle className="h-5 w-5 text-warning" />
                                    Needs attention
                                    <span className="ml-1 text-sm font-normal text-base-content/50">({visible.length})</span>
                                </div>
                                <Link
                                    href={route('applications.index')}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    View all
                                </Link>
                            </div>

                            {visible.length === 0 ? (
                                <div className="rounded-3xl border-2 border-dashed border-base-300 p-8 text-center">
                                    <p className="mb-2 text-lg font-bold text-base-content/80">No applications need attention</p>
                                    <Link
                                        href={route('applications.create')}
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-content hover:bg-primary/90"
                                    >
                                        Create application
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="border-b border-base-300">
                                                <th className="font-body text-left text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                                    Role / Company
                                                </th>
                                                <th className="font-body text-left text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                                    Status
                                                </th>
                                                <th className="font-body text-left text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                                    Last Activity
                                                </th>
                                                <th className="font-body text-right text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                                   
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visible.map((app) => (
                                                <tr key={app.id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                                                    <td className="py-3">
                                                        <p className="font-headline text-sm font-bold text-base-content">{app.role_title}</p>
                                                        <p className="font-label text-xs tracking-wide uppercase text-base-content/50">{app.company_name}</p>
                                                    </td>
                                                    <td className="py-3">
                                                        <StatusDropdown
                                                            applicationId={app.id}
                                                            currentStatus={app.status}
                                                            size="sm"
                                                        />
                                                    </td>
                                                    <td className="py-3">
                                                        <span className="text-sm text-base-content/60">
                                                            {app.last_activity_at
                                                                ? new Date(app.last_activity_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                                : '—'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {(app.recruiter_name || app.recruiter_email) ? (
                                                                <Link
                                                                    href={route('applications.show', app.id)}
                                                                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                                                                >
                                                                    Follow up
                                                                </Link>
                                                            ) : (
                                                                <button
                                                                    disabled
                                                                    title="Add recruiter contact to enable follow-ups"
                                                                    className="inline-flex items-center gap-1.5 rounded-full bg-base-300 px-3 py-1.5 text-xs font-semibold text-base-content/40 cursor-not-allowed opacity-50"
                                                                >
                                                                    Follow up
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleIgnore(app.id)}
                                                                className="inline-flex items-center gap-1.5 rounded-full bg-base-300/50 px-3 py-1.5 text-xs font-semibold text-base-content/50 hover:bg-base-300 transition-colors"
                                                            >
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming — placeholder until Interview model exists */}
                    <div>
                        <div className="rounded-3xl border border-base-300 bg-base-200 p-6">
                            <div className="flex items-center gap-2 text-lg font-bold text-base-content">
                                <CalendarClock className="h-5 w-5 text-primary" />
                                Upcoming
                            </div>

                            <div className="mt-4 rounded-2xl bg-secondary/20 p-5">
                                <span className="font-label rounded-full bg-secondary/30 px-2 py-1 text-[10px] text-secondary font-bold tracking-wide uppercase">
                                    INTERVIEW
                                </span>

                                <p className="font-headline mt-3 font-bold text-base-content">
                                    No upcoming interviews
                                </p>
                                <p className="text-sm text-base-content/50">
                                    Add interviews to see them here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
