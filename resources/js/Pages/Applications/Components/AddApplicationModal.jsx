import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function AddApplicationModal({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        role_title: '',
        job_url: '',
        location: '',
        employment_type: '',
        salary_range: '',
        source: '',
        resume_version: '',
        cover_letter_version: '',
        notes: '',
        applied_at: new Date().toISOString().split('T')[0],
        status: 'applied',
        recruiter_name: '',
        recruiter_email: '',
        recruiter_phone: '',
        recruiter_linkedin: '',
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('applications.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-100 bg-black/50" onClick={onClose} />
            <dialog open className="modal modal-open">
                <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Add Application</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Company Name *</span>
                            </label>
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            {errors.company_name && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.company_name}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role Title *</span>
                            </label>
                            <input
                                type="text"
                                value={data.role_title}
                                onChange={(e) => setData('role_title', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            {errors.role_title && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.role_title}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Job URL</span>
                            </label>
                            <input
                                type="url"
                                value={data.job_url}
                                onChange={(e) => setData('job_url', e.target.value)}
                                className="input input-bordered w-full"
                            />
                            {errors.job_url && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.job_url}</span>
                                </label>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {errors.location && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.location}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Employment Type</span>
                                </label>
                                <select
                                    value={data.employment_type}
                                    onChange={(e) => setData('employment_type', e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select type</option>
                                    <option value="full_time">Full Time</option>
                                    <option value="part_time">Part Time</option>
                                    <option value="internship">Internship</option>
                                    <option value="contract">Contract</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                                {errors.employment_type && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.employment_type}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Salary Range</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.salary_range}
                                    onChange={(e) => setData('salary_range', e.target.value)}
                                    placeholder="$80k-$100k"
                                    className="input input-bordered w-full"
                                />
                                {errors.salary_range && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.salary_range}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Source</span>
                                </label>
                                <select
                                    value={data.source}
                                    onChange={(e) => setData('source', e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select source</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="company_website">Company Website</option>
                                    <option value="job_board">Job Board</option>
                                    <option value="referral">Referral</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.source && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.source}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Application Date *</span>
                            </label>
                            <input
                                type="date"
                                value={data.applied_at}
                                onChange={(e) => setData('applied_at', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            {errors.applied_at && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.applied_at}</span>
                                </label>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Resume Version</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.resume_version}
                                    onChange={(e) => setData('resume_version', e.target.value)}
                                    placeholder="v3"
                                    className="input input-bordered w-full"
                                />
                                {errors.resume_version && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.resume_version}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Cover Letter Version</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.cover_letter_version}
                                    onChange={(e) => setData('cover_letter_version', e.target.value)}
                                    placeholder="v2"
                                    className="input input-bordered w-full"
                                />
                                {errors.cover_letter_version && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.cover_letter_version}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="divider">Recruiter Contact (Optional)</div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recruiter Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.recruiter_name}
                                    onChange={(e) => setData('recruiter_name', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {errors.recruiter_name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.recruiter_name}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recruiter Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.recruiter_email}
                                    onChange={(e) => setData('recruiter_email', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {errors.recruiter_email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.recruiter_email}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recruiter Phone</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.recruiter_phone}
                                    onChange={(e) => setData('recruiter_phone', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {errors.recruiter_phone && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.recruiter_phone}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recruiter LinkedIn</span>
                                </label>
                                <input
                                    type="url"
                                    value={data.recruiter_linkedin}
                                    onChange={(e) => setData('recruiter_linkedin', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {errors.recruiter_linkedin && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.recruiter_linkedin}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Notes</span>
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="textarea textarea-bordered w-full"
                                rows="3"
                            />
                            {errors.notes && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.notes}</span>
                                </label>
                            )}
                        </div>

                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-ghost"
                                disabled={processing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Add Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
