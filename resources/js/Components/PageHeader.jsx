import { Search } from 'lucide-react';

export default function PageHeader({
    title,
    subtitle,
    searchValue = '',
    onSearchChange,
    onSearchSubmit,
    searchPlaceholder = 'Search...',
    rightSlot,
}) {
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
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full rounded-full border border-base-300 bg-base-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-primary text-base-content placeholder:text-base-content/40"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
