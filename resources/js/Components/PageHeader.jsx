import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function PageHeader({
    title,
    subtitle,
    searchValue = '',
    onSearchChange,
    onSearchSubmit,
    searchPlaceholder = 'Search...',
    rightSlot,
    enableLiveSearch = false,
}) {
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!enableLiveSearch || searchValue.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get(route('applications.search'), {
                    params: { q: searchValue }
                });
                setResults(response.data);
                setShowDropdown(response.data.length > 0);
            } catch (error) {
                console.error('Search failed:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue, enableLiveSearch]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const statusColors = {
        applied: 'badge-primary',
        screening: 'badge-info',
        interviewing: 'badge-secondary',
        offer: 'badge-success',
        rejected: 'badge-error',
        withdrawn: 'badge-ghost',
        ghosted: 'badge-warning',
    };

    return (
        <div className="mb-8 flex justify-between items-center gap-4">
            <div>
                <h1 className="font-headline text-2xl font-bold text-base-content">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 font-body text-sm text-base-content/60">
                        {subtitle}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-end gap-4">
                {rightSlot}
                {onSearchChange && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSearchSubmit?.(e);
                        }}
                        className="flex items-center"
                    >
                        <div className="relative w-72" ref={dropdownRef}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40 z-10" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onFocus={() => {
                                    if (results.length > 0) setShowDropdown(true);
                                }}
                                placeholder={searchPlaceholder}
                                className="w-full rounded-2xl border border-base-300 bg-base-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-primary text-base-content placeholder:text-base-content/40"
                            />
                            {enableLiveSearch && showDropdown && (
                                <div className="absolute top-full mt-2 w-full bg-base-100 border border-base-300 rounded-2xl shadow-lg max-h-96 overflow-y-auto z-50">
                                    {loading ? (
                                        <div className="p-4 text-center text-sm text-base-content/60">
                                            Searching...
                                        </div>
                                    ) : results.length > 0 ? (
                                        <ul className="py-2">
                                            {results.map((app) => (
                                                <li key={app.id}>
                                                    <Link
                                                        href={route('applications.show', app.id)}
                                                        className="flex items-start justify-between px-4 py-3 hover:bg-base-200 transition-colors"
                                                        onClick={() => {
                                                            setShowDropdown(false);
                                                            onSearchChange('');
                                                        }}
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-semibold text-sm text-base-content truncate">
                                                                {app.company_name}
                                                            </div>
                                                            <div className="text-xs text-base-content/70 truncate">
                                                                {app.role_title}
                                                            </div>
                                                            {app.location && (
                                                                <div className="text-xs text-base-content/50 truncate mt-0.5">
                                                                    {app.location}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className={`badge badge-sm ml-3 ${statusColors[app.status] || 'badge-ghost'}`}>
                                                            {app.status}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
