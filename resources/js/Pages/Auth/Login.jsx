import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

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
                        autoComplete="username"
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
                        autoComplete="current-password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="label-text font-label text-xs tracking-wide uppercase">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="link link-primary text-sm"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <button type="submit" className="btn btn-primary ms-4" disabled={processing}>
                        Log in
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
