import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-base-content/70">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoFocus
                        autoComplete="current-password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        Confirm
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
