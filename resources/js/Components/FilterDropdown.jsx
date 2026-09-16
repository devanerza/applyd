import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { ChevronDown, Check } from 'lucide-react';

export default function FilterDropdown({ label, options, currentValue, paramName, className = '' }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handle = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    const handleSelect = (value) => {
        setOpen(false);
        const params = new URLSearchParams(window.location.search);
        
        if (value === null) {
            params.delete(paramName);
        } else {
            params.set(paramName, value);
        }

        router.get(route('applications.index') + '?' + params.toString(), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const isActive = currentValue !== null && currentValue !== undefined;

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                        ? 'border-primary/40 bg-primary/20 text-primary'
                        : 'border-base-300 bg-base-200 text-base-content/70 hover:bg-base-300'
                } ${className}`}
            >
                {isActive && <Check className="h-3.5 w-3.5" />}
                {label}
                <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {open && (
                <div className="absolute left-0 z-50 mt-1 w-48 rounded-2xl border border-base-300 bg-base-200 py-2 shadow-lg">
                    <button
                        onClick={() => handleSelect(null)}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-base-300 text-base-content"
                    >
                        <span>All</span>
                        {!isActive && <Check className="h-4 w-4 text-primary" />}
                    </button>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-base-300 capitalize text-base-content"
                        >
                            <span>{option.label}</span>
                            {currentValue === option.value && <Check className="h-4 w-4 text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
