import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function CreateApplicationDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        role_title: '',
        job_url: '',
        applied_at: new Date().toISOString().split('T')[0],
        status: 'applied',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('applications.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <>
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
                Add new
            </button>

            {open && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit}>
                            <h3 className="font-bold text-lg">Fill your application details</h3>

                            <div className="space-y-4 py-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Company Name</span>
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
                                        <span className="label-text">Role Title</span>
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
                                        <span className="label-text">Job URL</span>
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
                                        <span className="label-text">Date Applied</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-bordered"
                                        value={data.applied_at}
                                        onChange={(e) => setData('applied_at', e.target.value)}
                                    />
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
                                    {processing ? 'Adding...' : 'Add'}
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
