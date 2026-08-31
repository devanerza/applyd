import { LayoutDashboardIcon, Table2Icon, Calendar1Icon } from "lucide-react";

export function AppSidebar() {
    return (
        <aside className="bg-base-200 w-64 min-h-screen p-4">
            <h1 className="font-bold text-2xl mb-6">Stride</h1>
            <ul className="menu w-full">
                <li>
                    <a href={route('dashboard')}>
                        <LayoutDashboardIcon className="w-4 h-4" />
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href={route('applications.index')}>
                        <Table2Icon className="w-4 h-4" />
                        Applications
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Calendar1Icon className="w-4 h-4" />
                        Follow-up
                    </a>
                </li>
            </ul>
        </aside>
    );
}
