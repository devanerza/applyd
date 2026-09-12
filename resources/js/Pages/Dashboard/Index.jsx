import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Search,
    CheckCircle2,
    MessageCircle,
    AlertTriangle,
    ArrowRight,
    Building2,
    CalendarClock,
} from 'lucide-react';

export default function Dashboard() {
    // Hardcoded placeholder data — replace with real props from controller later
    const user = {
        name: 'Devan',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    };

    const stats = [
        {
            label: 'Active Applications',
            value: 12,
            icon: CheckCircle2,
            bg: 'bg-secondary',
            iconBg: 'bg-secondary-content',
            labelColor: 'text-secondary-content'
        },
        {
            label: 'Waiting for response',
            value: 4,
            icon: MessageCircle,
            bg: 'bg-neutral',
            iconBg: 'bg-neutral-content',
        },
        {
            label: 'Likely ghosted',
            value: 1,
            icon: AlertTriangle,
            bg: 'bg-warning',
            iconBg: 'bg-warning-content',
            labelColor: 'text-warning-content',
        },
    ];

    const needsAttention = [
        {
            id: 1,
            role: 'Backend Developer',
            company: 'Acme Corp',
            status: 'Applied',
            recruiter_name: 'John Smith',
        },
        {
            id: 2,
            role: 'Backend Developer',
            company: 'Acme Corp',
            status: 'Applied',
            recruiter_name: null,
            recruiter_email: null,
        },
    ];

    const upcoming = {
        type: 'INTERVIEW',
        company: 'Kirana Tech',
        role: 'Frontend Developer (React)',
        eventTitle: 'Technical Screening',
        eventTime: 'Tomorrow at 2:00 PM',
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="px-10 py-8">
                {/* Top bar */}
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        {/* Greeting */}
                        <h1 className="font-headline text-2xl font-bold text-gray-900">
                            Good morning, {user.name}
                        </h1>
                        <p className="mt-1 font-body text-sm text-gray-500">
                            Here is an overview of your job search activities
                            today.
                        </p>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
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
                                        className={`font-headline text-sm font-bold tracking-wide uppercase ${stat.labelColor ??
                                            'text-gray-700'
                                            }`}
                                    >
                                        {stat.label}
                                    </p>
                                    <p className="font-body text-md text-gray-900">
                                        {String(stat.value).padStart(
                                            2,
                                            '0',
                                        )}
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
                            {needsAttention.map((app) => (
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
                                        {app.role}
                                    </p>
                                    <p className="text-sm text-indigo-800/80">
                                        {app.company}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('applications.show', app.id)}
                                                className={`font-body rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                                                    app.recruiter_name || app.recruiter_email
                                                        ? 'bg-primary text-primary-content hover:bg-primary/80'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                                }`}
                                                title={
                                                    app.recruiter_name || app.recruiter_email
                                                        ? ''
                                                        : 'Add recruiter contact to enable follow-ups'
                                                }
                                            >
                                                Follow up
                                            </Link>
                                            <button className="font-body rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">
                                                Ignore
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming */}
                    <div>
                        <h2 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <CalendarClock className="h-4 w-4 text-indigo-600" />
                            Upcoming
                        </h2>

                        <div className="rounded-3xl bg-secondary p-5 text-secondary-content">
                            <span className="font-label rounded-full bg-secondary-content/20 px-2 py-1 text-[10px] text-secondary-content font-bold tracking-wide uppercase">
                                {upcoming.type}
                            </span>

                            <p className="font-headline mt-3 font-bold">
                                {upcoming.company}
                            </p>
                            <p className="text-sm text-emerald-950/80">
                                {upcoming.role}
                            </p>

                            <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/90 p-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500">
                                    <CalendarClock className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-headline text-sm font-semibold text-gray-900">
                                        {upcoming.eventTitle}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {upcoming.eventTime}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route(
                                    'applications.show',
                                    1,
                                )}
                                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-secondary-content py-2 text-white font-headline text-sm font-semibold hover:bg-secondary-content/50"
                            >
                                View application
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
