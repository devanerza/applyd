import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { ChevronDown, Check } from 'lucide-react';

const STATUSES = [
    { value: 'applied', label: 'Applied', color: 'bg-gray-100 text-gray-700' },
    { value: 'screening', label: 'Screening', color: 'bg-blue-100 text-blue-700' },
    { value: 'interviewing', label: 'Interviewing', color: 'bg-purple-100 text-purple-700' },
    { value: 'offer', label: 'Offer', color: 'bg-green-100 text-green-700' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700' },
    { value: 'withdrawn', label: 'Withdrawn', color: 'bg-gray-100 text-gray-500' },
    { value: 'ghosted', label: 'Ghosted', color: 'bg-orange-100 text-orange-700' },
];

export default function StatusDropdown({ applicationId, currentStatus, className = '', size = 'md' }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(currentStatus);
    const dropdownRef = useRef(null);

    const current = STATUSES.find(s => s.value === status) || STATUSES[0];

    useEffect(() => {
        const handle = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    const handleChange = (newStatus) => {
        setStatus(newStatus);
        setOpen(false);
        router.patch(route('applications.update-status', applicationId), 
            { status: newStatus },
            { preserveScroll: true }
        );
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-[10px]',
        md: 'px-3 py-1 text-xs',
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(!open);
                }}
                className={`flex items-center gap-1 rounded-full font-medium capitalize ${current.color} ${sizeClasses[size]} ${className}`}
            >
                {current.label}
                <ChevronDown className="h-3 w-3" />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-1 w-40 rounded-2xl border border-gray-200 bg-white py-2 shadow-lg">
                    {STATUSES.map((s) => (
                        <button
                            key={s.value}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleChange(s.value);
                            }}
                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-50"
                        >
                            <span className="capitalize">{s.label}</span>
                            {s.value === status && <Check className="h-4 w-4 text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
