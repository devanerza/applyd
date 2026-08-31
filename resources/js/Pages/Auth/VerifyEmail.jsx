import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <div className="mb-4 text-sm text-base-content/70">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
            </div>

            {status === 'verification-link-sent' && (
                <div className="alert alert-success mb-4">
                    <span>A new verification link has been sent to the email address you provided during registration.</span>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="flex items-center justify-between mt-4">
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        Resend Email
                    </button>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="link link-primary text-sm"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
