import { Head, Link } from '@inertiajs/react';
import { 
    Clock, 
    LineChart, 
    Bell, 
    ArrowRight,
    CheckCircle2,
    Calendar,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Welcome({ auth }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (cardsRef.current) {
            observer.observe(cardsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: Clock,
            name: 'Timeline',
            description: 'Every application, interview, and follow-up in one chronological view.',
        },
        {
            icon: Bell,
            name: 'Follow-ups',
            description: 'Never miss a check-in. Automatic reminders based on your activity.',
        },
        {
            icon: LineChart,
            name: 'Analytics',
            description: 'See which sources, roles, and strategies actually get responses.',
        },
    ];

    const mockCards = [
        { company: 'Stripe', role: 'Senior Engineer', status: 'interviewing', date: '3d ago' },
        { company: 'Vercel', role: 'Frontend Lead', status: 'applied', date: '1w ago' },
        { company: 'Linear', role: 'Product Engineer', status: 'offer', date: '2d ago' },
    ];

    return (
        <>
            <Head title="applyd — Job application tracker" />
            
            <div className="min-h-screen bg-base-100">
                <nav className="border-b border-base-300">
                    <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="font-headline text-2xl font-bold text-base-content">
                            applyd
                        </Link>
                        <div className="flex items-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="btn btn-sm btn-primary rounded-full"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="btn btn-sm btn-ghost rounded-full"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="btn btn-sm btn-primary rounded-full"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <section className="mx-auto max-w-7xl px-6 pt-20 pb-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="font-headline text-5xl sm:text-6xl font-bold text-base-content leading-tight">
                                Stop losing track.
                                <br />
                                <span className="text-primary">Start landing offers.</span>
                            </h1>
                            <p className="mt-6 text-lg text-base-content/70 font-body max-w-lg">
                                Track every application, interview, and follow-up in one place. 
                                Get reminders when it's time to check in. See what's working.
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="btn btn-primary btn-lg rounded-full gap-2"
                                >
                                    Try it free
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <p className="text-sm text-base-content/50 font-body">
                                    No credit card required
                                </p>
                            </div>
                        </div>

                        <div 
                            ref={cardsRef}
                            className="relative h-96 hidden lg:block"
                        >
                            {mockCards.map((card, idx) => (
                                <div
                                    key={card.company}
                                    className={`absolute w-full bg-base-200 border border-base-300 rounded-3xl p-6 shadow-lg transition-all duration-700 ease-out ${
                                        isVisible
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                    style={{
                                        transform: isVisible
                                            ? `translateY(${idx * 110}px) rotate(0deg)`
                                            : `translateY(${40 + idx * 20}px) rotate(${-8 + idx * 4}deg)`,
                                        zIndex: 10 - idx,
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <span className="font-headline text-sm font-bold text-primary">
                                                        {card.company[0]}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="font-headline font-bold text-base-content">
                                                        {card.company}
                                                    </h3>
                                                    <p className="text-sm text-base-content/60 font-body">
                                                        {card.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`badge badge-sm font-label ${
                                            card.status === 'offer' ? 'badge-success' :
                                            card.status === 'interviewing' ? 'badge-secondary' :
                                            'badge-ghost'
                                        }`}>
                                            {card.status}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-base-content/50 font-label">
                                        <Calendar className="h-3 w-3" />
                                        {card.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-base-200 border-y border-base-300">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid md:grid-cols-3 gap-12">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={feature.name}>
                                        <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="font-headline text-xl font-bold text-base-content mb-2">
                                            {feature.name}
                                        </h3>
                                        <p className="text-base-content/70 font-body">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-4xl px-6 py-24">
                    <div className="bg-base-200 border border-base-300 rounded-3xl p-8 sm:p-12">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <CheckCircle2 className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-lg text-base-content font-body leading-relaxed">
                                    "I applied to 40 companies before using applyd. Lost track of half of them, 
                                    forgot to follow up on the rest. Now I know exactly where everything stands 
                                    and when to reach out. Landed three offers in two months."
                                </p>
                                <div className="mt-4">
                                    <p className="font-headline font-bold text-base-content">
                                        Sarah Chen
                                    </p>
                                    <p className="text-sm text-base-content/60 font-body">
                                        Software Engineer at Vercel
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-24">
                    <div className="text-center">
                        <h2 className="font-headline text-4xl font-bold text-base-content mb-6">
                            Ready to organize your search?
                        </h2>
                        <Link
                            href={route('register')}
                            className="btn btn-primary btn-lg rounded-full gap-2"
                        >
                            Get started free
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </section>

                <footer className="border-t border-base-300">
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-base-content/50 font-body">
                                © 2026 applyd. Track smarter, land faster.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link href="#" className="text-sm text-base-content/60 hover:text-base-content font-body">
                                    Privacy
                                </Link>
                                <Link href="#" className="text-sm text-base-content/60 hover:text-base-content font-body">
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
