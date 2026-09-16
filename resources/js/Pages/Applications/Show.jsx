import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FollowUpModal from './Components/FollowUpModal';
import EditApplicationModal from './Components/dialog-edit';
import StatusDropdown from '@/Components/StatusDropdown';
import {
    Building2,
    Calendar,
    MapPin,
    DollarSign,
    Briefcase,
    User,
    Mail,
    Phone,
    Linkedin,
    Clock,
    Plus,
    Edit,
    FileText,
    Download,
} from 'lucide-react';
import { useState } from 'react';

export default function Show({ application, nextAction }) {
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const hasRecruiterContact =
        application.recruiter_name || application.recruiter_email;

    const getStatusColor = (status) => {
        const colors = {
            applied: 'bg-base-300 text-base-content',
            screening: 'bg-blue-500/20 text-blue-400',
            interviewing: 'bg-purple-500/20 text-purple-400',
            offer: 'bg-success/20 text-success',
            rejected: 'bg-error/20 text-error',
            withdrawn: 'bg-base-300 text-base-content/50',
            ghosted: 'bg-warning/20 text-warning',
        };
        return colors[status] || colors.applied;
    };

    const getHealthColor = (health) => {
        const colors = {
            healthy: 'bg-success/20 text-success',
            needs_attention: 'bg-warning/20 text-warning',
            stale: 'bg-error/20 text-error',
            ghosted: 'bg-error text-error-content',
        };
        return colors[health] || colors.healthy;
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${application.company_name} - ${application.role_title}`} />

            <FollowUpModal
                application={application}
                show={showFollowUpModal}
                onClose={() => setShowFollowUpModal(false)}
            />

            <EditApplicationModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                application={application}
            />

            <div className="px-10 py-8">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-base-content/50">
                    <Link href={route('applications.index')} className="hover:text-primary">
                        Applications
                    </Link>
                    <span>›</span>
                    <span className="text-base-content">{application.company_name}</span>
                </div>

                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                            <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-base-content">
                                {application.company_name}
                            </h1>
                            <p className="mt-1 text-xl text-base-content/70">
                                {application.role_title}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <StatusDropdown 
                                    applicationId={application.id}
                                    currentStatus={application.status}
                                    size="md"
                                />
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${getHealthColor(
                                        'needs_attention'
                                    )}`}
                                >
                                    Needs Attention
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-medium text-base-content hover:bg-base-300"
                        >
                            <Edit className="h-4 w-4" />
                            Edit
                        </button>
                        <button
                            onClick={() => setShowFollowUpModal(true)}
                            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-content hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Add activity
                        </button>
                        <button
                            onClick={() => {
                                if (confirm(`Delete ${application.company_name}? This can't be undone.`)) {
                                    router.delete(route('applications.destroy', application.id));
                                }
                            }}
                            className="flex items-center gap-2 rounded-full border border-error/30 bg-base-200 px-4 py-2 text-sm font-medium text-error hover:bg-error/10"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* Next Action Bar */}
                <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-primary p-8 text-white shadow-lg">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/80">
                        <Clock className="h-4 w-4" />
                        Next Action
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">{nextAction?.title ?? 'Nothing to do'}</h2>
                    <p className="mb-4 text-white/90">
                        {nextAction?.description ?? 'This application needs no action right now.'}
                    </p>
                    <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary hover:bg-white/90">
                        <Mail className="h-4 w-4" />
                        Draft Email
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Details + Recruiter */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Application Details Card */}
                        <div className="rounded-3xl border border-base-300 bg-base-200 p-6">
                            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-base-content">
                                <FileText className="h-5 w-5 text-primary" />
                                Details
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="mb-1 text-sm text-base-content/50">Applied Date</p>
                                    <p className="flex items-center gap-2 text-base-content">
                                        <Calendar className="h-4 w-4 text-base-content/40" />
                                        {new Date(application.applied_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                {application.source && (
                                    <div>
                                        <p className="mb-1 text-sm text-base-content/50">Source</p>
                                        <p className="flex items-center gap-2 text-base-content">
                                            <Linkedin className="h-4 w-4 text-primary" />
                                            {application.source}
                                        </p>
                                    </div>
                                )}
                                {application.location && (
                                    <div>
                                        <p className="mb-1 text-sm text-base-content/50">Location</p>
                                        <p className="flex items-center gap-2 text-base-content">
                                            <MapPin className="h-4 w-4 text-base-content/40" />
                                            {application.location}
                                        </p>
                                    </div>
                                )}
                                {application.salary_range && (
                                    <div>
                                        <p className="mb-1 text-sm text-base-content/50">Salary Expectation</p>
                                        <p className="flex items-center gap-2 text-base-content">
                                            <DollarSign className="h-4 w-4 text-base-content/40" />
                                            {application.salary_range}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recruiter Contact Card */}
                        {hasRecruiterContact ? (
                            <div className="rounded-3xl border border-base-300 bg-base-200 p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-lg font-bold text-base-content">
                                        <User className="h-5 w-5 text-primary" />
                                        Recruiter Contact
                                    </div>
                                    <button className="text-sm text-primary hover:underline">
                                        Edit
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {application.recruiter_name && (
                                        <div className="flex items-center gap-3">
                                            <User className="h-4 w-4 text-base-content/40" />
                                            <span className="text-base-content">
                                                {application.recruiter_name}
                                            </span>
                                        </div>
                                    )}
                                    {application.recruiter_email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-base-content/40" />
                                            <a
                                                href={`mailto:${application.recruiter_email}`}
                                                className="text-primary hover:underline"
                                            >
                                                {application.recruiter_email}
                                            </a>
                                        </div>
                                    )}
                                    {application.recruiter_phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-base-content/40" />
                                            <a
                                                href={`tel:${application.recruiter_phone}`}
                                                className="text-base-content"
                                            >
                                                {application.recruiter_phone}
                                            </a>
                                        </div>
                                    )}
                                    {application.recruiter_linkedin && (
                                        <div className="flex items-center gap-3">
                                            <Linkedin className="h-4 w-4 text-base-content/40" />
                                            <a
                                                href={application.recruiter_linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                {application.recruiter_linkedin.replace(
                                                    'https://',
                                                    ''
                                                )}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <button
                                        onClick={() => setShowFollowUpModal(true)}
                                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-content hover:bg-primary/90"
                                    >
                                        Follow up
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-dashed border-base-300 bg-base-300/30 p-6 text-center">
                                <User className="mx-auto mb-3 h-8 w-8 text-base-content/40" />
                                <p className="mb-3 text-sm text-base-content/60">
                                    No recruiter contact yet
                                </p>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-medium text-base-content hover:bg-base-300"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add contact
                                </button>
                            </div>
                        )}

                        {/* Interviews Card - Placeholder for Phase 3 */}
                    </div>

                    {/* Right Column - Activity Timeline */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-3xl bg-primary/10 p-6">
                            <div className="mb-6 flex items-center gap-2 text-lg font-bold text-base-content">
                                <Clock className="h-5 w-5 text-primary" />
                                Activity Timeline
                            </div>

                            {application.activities && application.activities.length > 0 ? (
                                <div className="space-y-6">
                                    {application.activities.map((activity, index) => (
                                        <div key={activity.id} className="relative">
                                            {index < application.activities.length - 1 && (
                                                <div className="absolute left-2 top-8 h-full w-0.5 bg-primary/20"></div>
                                            )}
                                            <div className="flex gap-4">
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                                                    <div className="h-2 w-2 rounded-full bg-primary-content"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-base-content/50">
                                                        {new Date(
                                                            activity.activity_date
                                                        ).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </p>
                                                    <div className="mt-2 rounded-2xl bg-base-200 p-4">
                                                        <p className="font-semibold text-base-content">
                                                            {activity.title}
                                                        </p>
                                                        {activity.description && (
                                                            <p className="mt-1 text-sm text-base-content/70">
                                                                {activity.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Clock className="mx-auto mb-3 h-12 w-12 text-base-content/30" />
                                    <p className="text-sm text-base-content/50">No activities yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
