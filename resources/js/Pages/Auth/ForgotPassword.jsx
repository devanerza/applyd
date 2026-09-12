import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-base-content/70">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
            </div>

            {status && (
                <div className="alert alert-success mb-4">
                    <span>{status}</span>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-label text-xs tracking-wide uppercase">Email</span>
                    </label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoFocus
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
