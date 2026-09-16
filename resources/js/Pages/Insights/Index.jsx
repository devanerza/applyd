import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Briefcase,
    Target,
    Award,
} from 'lucide-react';
import { useState } from 'react';

export default function InsightsIndex({ funnel, responseRate, interviewConversion, sourceEffectiveness }) {
    const user = usePage().props.auth.user;
    const [search, setSearch] = useState('');

    const totalApplications = Object.values(funnel).reduce((sum, val) => sum + val, 0);

    const sourceLabels = {
        linkedin: 'LinkedIn',
        company_website: 'Company Website',
        job_board: 'Job Board',
        referral: 'Referral',
        other: 'Other',
    };

    const sortedSources = Object.entries(sourceEffectiveness)
        .sort(([, a], [, b]) => b.rate - a.rate);

    return (
        <AuthenticatedLayout>
            <Head title="Insights" />

            <div className="px-10 py-8">
                <PageHeader
                    title={`Insights`}
                    subtitle="Track your job search performance and identify what works."
                    searchValue={search}
                    onSearchChange={setSearch}
                    onSearchSubmit={() => router.get(route('applications.index'), { search }, { preserveState: true, preserveScroll: true })}
                    searchPlaceholder="Search applications..."
                />

                {/* Key Metrics */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl bg-primary p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-content">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-body text-sm text-primary-content/70">
                                    Response Rate
                                </p>
                                <p className="font-headline text-3xl font-bold text-primary-content">
                                    {responseRate}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-secondary p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-content">
                                <Award className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="font-body text-sm text-secondary-content/70">
                                    Interview Conversion
                                </p>
                                <p className="font-headline text-3xl font-bold text-secondary-content">
                                    {interviewConversion}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-accent p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                                <Briefcase className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <p className="font-body text-sm text-white/80">
                                    Total Applications
                                </p>
                                <p className="font-headline text-3xl font-bold text-white">
                                    {totalApplications}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Funnel + Source Breakdown */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Application Funnel */}
                    <div>
                        <h2 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Application Funnel
                        </h2>

                        <div className="rounded-3xl bg-white p-6 border border-gray-200">
                            {totalApplications === 0 ? (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500">No application data yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {[
                                        { key: 'applied', label: 'Applied', color: 'bg-gray-400' },
                                        { key: 'screening', label: 'Screening', color: 'bg-blue-500' },
                                        { key: 'interviewing', label: 'Interviewing', color: 'bg-indigo-600' },
                                        { key: 'offer', label: 'Offer', color: 'bg-green-500' },
                                    ].map((stage) => {
                                        const count = funnel[stage.key];
                                        const percentage = totalApplications > 0
                                            ? ((count / totalApplications) * 100).toFixed(1)
                                            : 0;

                                        return (
                                            <div key={stage.key}>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className="font-body text-sm font-semibold text-gray-700">
                                                        {stage.label}
                                                    </span>
                                                    <span className="font-body text-sm text-gray-500">
                                                        {count} ({percentage}%)
                                                    </span>
                                                </div>
                                                <div className="h-3 rounded-full bg-gray-100">
                                                    <div
                                                        className={`h-3 rounded-full ${stage.color} transition-all duration-500`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Source Effectiveness */}
                    <div>
                        <h2 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <Users className="h-5 w-5 text-primary" />
                            Source Effectiveness
                        </h2>

                        <div className="rounded-3xl bg-white p-6 border border-gray-200">
                            {sortedSources.length === 0 || sortedSources.every(([, data]) => data.total === 0) ? (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500">No source data yet</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="font-body text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                                                    Source
                                                </th>
                                                <th className="font-body text-center text-xs font-semibold uppercase tracking-wide text-gray-600">
                                                    Applications
                                                </th>
                                                <th className="font-body text-center text-xs font-semibold uppercase tracking-wide text-gray-600">
                                                    Interviews
                                                </th>
                                                <th className="font-body text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                                                    Rate
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedSources.map(([source, data]) => (
                                                <tr key={source} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="font-body py-3 text-sm font-medium text-gray-900">
                                                        {sourceLabels[source]}
                                                    </td>
                                                    <td className="font-body py-3 text-center text-sm text-gray-600">
                                                        {data.total}
                                                    </td>
                                                    <td className="font-body py-3 text-center text-sm text-gray-600">
                                                        {data.interviews}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <span className={`font-body text-sm font-semibold ${data.rate >= 50 ? 'text-green-600' :
                                                                    data.rate >= 25 ? 'text-yellow-600' :
                                                                        'text-gray-600'
                                                                }`}>
                                                                {data.rate}%
                                                            </span>
                                                            {data.rate >= 25 ? (
                                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                                            ) : (
                                                                <TrendingDown className="h-4 w-4 text-gray-400" />
                                                            )}
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
