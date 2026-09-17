import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusDropdown from '@/Components/StatusDropdown';
import FilterDropdown from '@/Components/FilterDropdown';
import PageHeader from '@/Components/PageHeader';
import {
    SlidersHorizontal,
    Briefcase,
    ExternalLink,
    ArrowRight,
    Building2,
    CheckCircle2,
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

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Applications" />

            <div className="px-10 py-8">
                <PageHeader
                    title="Your Applications"
                    subtitle="Manage and track your job search progress."
                    searchValue={search}
                    onSearchChange={setSearch}
                    onSearchSubmit={handleSearch}
                    searchPlaceholder="Search applications..."
                />

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <SlidersHorizontal className="h-4 w-4 text-base-content/40" />
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
                                ? 'border-primary/40 bg-primary/20 text-primary'
                                : 'border-base-300 bg-base-200 text-base-content/70 hover:bg-base-300'
                            }`}
                    >
                        {followUpDue && <CheckCircle2 className="h-3.5 w-3.5" />}
                        Follow-up Due
                    </button>
                </div>

                {/* Table card */}
                <div className="mt-6 rounded-3xl border border-base-300 bg-base-200 p-6">
                    <div className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                        <Briefcase className="h-5 w-5 text-primary" />
                        All Applications
                        <span className="ml-1 text-sm font-normal text-base-content/50">({items.length})</span>
                    </div>

                    {items.length === 0 ? (
                        <div className="rounded-3xl border-2 border-dashed border-base-300 p-12 text-center">
                            <Building2 className="mx-auto mb-4 h-12 w-12 text-base-content/30" />
                            <p className="mb-2 text-lg font-bold text-base-content/80">No applications found</p>
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
                                            Source
                                        </th>
                                        <th className="font-body text-left text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                            Applied
                                        </th>
                                        <th className="font-body text-right text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((app) => (
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
                                                <span className="text-sm text-base-content/60 capitalize">
                                                    {app.source ? app.source.replace('_', ' ') : '—'}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <span className="text-sm text-base-content/60">
                                                    {formatDate(app.applied_at)}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right">
                                                <Link
                                                    href={route('applications.show', app.id)}
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                                                >
                                                    View
                                                    <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {!Array.isArray(applications) && applications.links && (
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                        {applications.links.map((link, index) => (
                            <Link
                                key={`page-${index}`}
                                href={link.url ?? '#'}
                                className={`rounded-full px-4 py-1 text-sm ${link.active
                                        ? 'bg-primary text-primary-content'
                                        : 'border border-base-300 bg-base-200 text-base-content/70 hover:bg-base-300'
                                    }`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
