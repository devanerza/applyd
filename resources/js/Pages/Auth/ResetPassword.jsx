import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-label text-xs tracking-wide uppercase">Password</span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-label text-xs tracking-wide uppercase">Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        Reset Password
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
