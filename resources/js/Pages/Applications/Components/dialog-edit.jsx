import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function EditApplicationDialog({ application }) {
    const [open, setOpen] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        company_name: application?.company_name || '',
        role_title: application?.role_title || '',
        job_url: application?.job_url || '',
        applied_at: application?.applied_at || new Date().toISOString().split('T')[0],
        status: application?.status || 'applied',
        location: application?.location || '',
        employment_type: application?.employment_type || '',
        salary_range: application?.salary_range || '',
        source: application?.source || '',
        resume_version: application?.resume_version || '',
        cover_letter_version: application?.cover_letter_version || '',
        notes: application?.notes || '',
        recruiter_name: application?.recruiter_name || '',
        recruiter_email: application?.recruiter_email || '',
        recruiter_phone: application?.recruiter_phone || '',
        recruiter_linkedin: application?.recruiter_linkedin || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('applications.update', application.id), {
            preserveState: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <>
            <button
                className="btn btn-sm btn-outline"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
            >
                Edit
            </button>

            {open && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit}>
                            <h3 className="font-headline font-bold text-lg">Edit application details</h3>

                            <div className="space-y-4 py-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Company Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="e.g Microsoft"
                                    />
                                    {errors.company_name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Role Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.role_title}
                                        onChange={(e) => setData('role_title', e.target.value)}
                                        placeholder="e.g Software Engineer"
                                    />
                                    {errors.role_title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.role_title}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Job URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        className="input input-bordered"
                                        value={data.job_url}
                                        onChange={(e) => setData('job_url', e.target.value)}
                                        placeholder="e.g https://linkedin.com/..."
                                    />
                                    {errors.job_url && (
                                        <p className="text-red-500 text-xs mt-1">{errors.job_url}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Date Applied</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-bordered"
                                        value={data.applied_at}
                                        onChange={(e) => setData('applied_at', e.target.value)}
                                    />
                                </div>

                                {/* Application Details Section */}
                                <div className="divider mt-6 mb-4">
                                    <span className="text-xs font-semibold text-gray-500 uppercase">Application Details</span>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Location</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="e.g Remote / New York"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Employment Type</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={data.employment_type}
                                        onChange={(e) => setData('employment_type', e.target.value)}
                                    >
                                        <option value="">Select type</option>
                                        <option value="full_time">Full-time</option>
                                        <option value="part_time">Part-time</option>
                                        <option value="internship">Internship</option>
                                        <option value="contract">Contract</option>
                                        <option value="freelance">Freelance</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Salary Range</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.salary_range}
                                        onChange={(e) => setData('salary_range', e.target.value)}
                                        placeholder="e.g $80k-$100k"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Source</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={data.source}
                                        onChange={(e) => setData('source', e.target.value)}
                                    >
                                        <option value="">Select source</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="company_website">Company Website</option>
                                        <option value="job_board">Job Board</option>
                                        <option value="referral">Referral</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Resume Version</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.resume_version}
                                        onChange={(e) => setData('resume_version', e.target.value)}
                                        placeholder="e.g Resume v3"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Cover Letter Version</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.cover_letter_version}
                                        onChange={(e) => setData('cover_letter_version', e.target.value)}
                                        placeholder="e.g Cover letter v1"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Notes</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Any notes..."
                                    />
                                </div>

                                {/* Recruiter Contact Section */}
                                <div className="divider mt-6 mb-4">
                                    <span className="text-xs font-semibold text-gray-500 uppercase">Recruiter Contact (Optional)</span>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Recruiter Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={data.recruiter_name}
                                        onChange={(e) => setData('recruiter_name', e.target.value)}
                                        placeholder="e.g John Smith"
                                    />
                                    {errors.recruiter_name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.recruiter_name}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Recruiter Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input input-bordered"
                                        value={data.recruiter_email}
                                        onChange={(e) => setData('recruiter_email', e.target.value)}
                                        placeholder="e.g john@company.com"
                                    />
                                    {errors.recruiter_email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.recruiter_email}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Recruiter Phone</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="input input-bordered"
                                        value={data.recruiter_phone}
                                        onChange={(e) => setData('recruiter_phone', e.target.value)}
                                        placeholder="e.g +1-555-0123"
                                    />
                                    {errors.recruiter_phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.recruiter_phone}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-label text-xs tracking-wide uppercase">Recruiter LinkedIn</span>
                                    </label>
                                    <input
                                        type="url"
                                        className="input input-bordered"
                                        value={data.recruiter_linkedin}
                                        onChange={(e) => setData('recruiter_linkedin', e.target.value)}
                                        placeholder="e.g https://linkedin.com/in/johnsmith"
                                    />
                                    {errors.recruiter_linkedin && (
                                        <p className="text-red-500 text-xs mt-1">{errors.recruiter_linkedin}</p>
                                    )}
                                </div>
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setOpen(false)}>close</button>
                    </form>
                </dialog>
            )}
        </>
    );
}
