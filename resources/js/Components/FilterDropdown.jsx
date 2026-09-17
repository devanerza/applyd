import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { router } from '@inertiajs/react';
import { ChevronDown, Check } from 'lucide-react';

export default function FilterDropdown({ label, options, currentValue, paramName, className = '' }) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handle = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                triggerRef.current && !triggerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    const handleOpen = () => {
        if (!open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setMenuPos({
                top: rect.bottom + 4,
                left: rect.left,
            });
        }
        setOpen(!open);
    };

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
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={handleOpen}
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

            {open && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed z-[9999] w-48 rounded-2xl border border-base-300 bg-base-200 py-2 shadow-lg"
                    style={{ top: menuPos.top, left: menuPos.left }}
                >
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
                </div>,
                document.body
            )}
        </>
    );
}
