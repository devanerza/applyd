import { Head, Link, usePage, router } from '@inertiajs/react';
import { AppSidebar } from './Components/app-sidebar';
import StatusDropdown from '@/Components/StatusDropdown';
import FilterDropdown from '@/Components/FilterDropdown';
import PageHeader from '@/Components/PageHeader';
import {
    SlidersHorizontal,
    CheckCircle2,
    AlertTriangle,
    Ban,
    ArrowRight,
    Building2,
} from 'lucide-react';
import { useState } from 'react';

export default function ApplicationsIndex({ applications, filters }) {
    const user = usePage().props.auth.user;
    const [search, setSearch] = useState('');

    const urlParams = new URLSearchParams(window.location.search);
    const currentStatus = urlParams.get('status');
    const currentSource = urlParams.get('source');
    const followUpDue = urlParams.get('follow_up_due');

    const items = Array.isArray(applications)
        ? applications
        : (applications?.data ?? []);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('applications.index'), { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleFollowUpDue = () => {
        const params = new URLSearchParams(window.location.search);
        if (followUpDue) {
            params.delete('follow_up_due');
        } else {
            params.set('follow_up_due', '1');
        }
        router.get(route('applications.index') + '?' + params.toString(), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const statusOptions = [
        { value: 'applied', label: 'Applied' },
        { value: 'screening', label: 'Screening' },
        { value: 'interviewing', label: 'Interviewing' },
        { value: 'offer', label: 'Offer' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'withdrawn', label: 'Withdrawn' },
        { value: 'ghosted', label: 'Ghosted' },
    ];

    const sourceOptions = [
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'company_website', label: 'Company Website' },
        { value: 'job_board', label: 'Job Board' },
        { value: 'referral', label: 'Referral' },
        { value: 'other', label: 'Other' },
    ];

    const healthStyles = {
        needs_attention: {
            card: 'bg-warning/20',
            iconWrap: 'bg-warning',
            iconColor: 'text-warning-content',
            badge: 'bg-neutral/10 text-neutral-content',
            title: 'text-neutral-content',
            subtitle: 'text-neutral-content/70',
            label: 'text-warning',
            labelIcon: AlertTriangle,
            labelText: 'Needs Attention',
            action: 'bg-warning hover:bg-warning/80 text-warning-content',
        },
        healthy: {
            card: 'bg-success/10',
            iconWrap: 'bg-success',
            iconColor: 'text-success-content',
            badge: 'bg-neutral/10 text-neutral-content',
            title: 'text-neutral-content',
            subtitle: 'text-neutral-content/70',
            label: 'text-success',
            labelIcon: CheckCircle2,
            labelText: 'Healthy',
            action: 'bg-success hover:bg-success/80 text-success-content',
        },
        stale: {
            card: 'bg-error/10',
            iconWrap: 'bg-error/50',
            iconColor: 'text-error-content',
            badge: 'bg-neutral/10 text-neutral-content',
            title: 'text-neutral-content',
            subtitle: 'text-neutral-content/70',
            label: 'text-error/70',
            labelIcon: AlertTriangle,
            labelText: 'Stale',
            action: 'bg-error/50 hover:bg-error/60 text-error-content',
        },
        ghosted: {
            card: 'bg-error/20',
            iconWrap: 'bg-error',
            iconColor: 'text-error-content',
            badge: 'bg-neutral/10 text-neutral-content',
            title: 'text-neutral-content',
            subtitle: 'text-neutral-content/70',
            label: 'text-error',
            labelIcon: Ban,
            labelText: 'Likely Ghosted',
            action: 'bg-error hover:bg-error/80 text-error-content',
        },
    };

    return (
        <>
            <Head title="Applications" />

            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />

                <main className="ml-64 flex-1 px-10 py-8">
                    <PageHeader
                        title="Your Applications"
                        subtitle="Manage and track your job search progress."
                        searchValue={search}
                        onSearchChange={setSearch}
                        onSearchSubmit={handleSearch}
                        searchPlaceholder="Search applications..."
                    />

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                        <FilterDropdown
                            label="Status"
                            options={statusOptions}
                            currentValue={currentStatus}
                            paramName="status"
                        />
                        <FilterDropdown
                            label="Source"
                            options={sourceOptions}
                            currentValue={currentSource}
                            paramName="source"
                        />
                        <button
                            type="button"
                            onClick={toggleFollowUpDue}
                            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${followUpDue
                                    ? 'border-emerald-400 bg-emerald-400/20 text-emerald-700'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {followUpDue && <CheckCircle2 className="h-3.5 w-3.5" />}
                            Follow-up Due
                        </button>
                    </div>

                    {items.length === 0 ? (
                        <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-300 p-12 text-center">
                            <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="mb-2 text-lg font-bold text-gray-700">No applications found</p>
                            <Link
                                href={route('applications.create')}
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                            >
                                Create application
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((app) => {
                                const health = app.health || 'healthy';
                                const style = healthStyles[health];
                                const LabelIcon = style.labelIcon;

                                return (
                                    <div
                                        key={app.id}
                                        className={`rounded-2xl ${style.card} p-5 relative`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-full ${style.iconWrap}`}
                                            >
                                                <Building2
                                                    className={`h-5 w-5 ${style.iconColor}`}
                                                />
                                            </div>
                                            <StatusDropdown
                                                applicationId={app.id}
                                                currentStatus={app.status}
                                                size="md"
                                            />
                                        </div>

                                        <p
                                            className={`mt-4 truncate font-bold ${style.title}`}
                                            title={app.role_title}
                                        >
                                            {app.role_title}
                                        </p>
                                        <p
                                            className={`text-sm ${style.subtitle}`}
                                        >
                                            {app.company_name}
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
                                                    app.id
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
                    )}

                    {!Array.isArray(applications) && applications.links && (
                        <div className="mt-8 flex flex-wrap items-center gap-2">
                            {applications.links.map((link, index) => (
                                <Link
                                    key={`page-${index}`}
                                    href={link.url ?? '#'}
                                    className={`rounded-full px-4 py-1 text-sm ${link.active
                                            ? 'bg-primary text-white'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
