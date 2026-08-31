import { Link, usePage } from '@inertiajs/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { AppSidebar } from '@/Pages/Applications/Components/app-sidebar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="drawer lg:drawer-open">
            <input type="checkbox" className="drawer-toggle" id="sidebar-toggle" />
            <div className="drawer-content">
                <nav className="bg-base-100 sticky top-0 z-10 flex items-center justify-between py-3 px-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <label htmlFor="sidebar-toggle" className="btn btn-ghost btn-sm lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <div className="form-control">
                            <input type="text" placeholder="Search..." className="input input-bordered input-sm w-64" />
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-10">
                                <span className="text-sm">{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li className="px-4 py-2">
                                <span className="font-semibold">{user.name}</span>
                                <span className="text-xs opacity-60">{user.email}</span>
                            </li>
                            <div className="divider my-0"></div>
                            <li>
                                <Link href={route('profile.edit')}>
                                    <UserIcon className="w-4 h-4" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={route('logout')} method="post" as="button">
                                    <LogOutIcon className="w-4 h-4" />
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="p-6">
                    {children}
                </div>
            </div>
            <div className="drawer-side z-30">
                <label htmlFor="sidebar-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
                <AppSidebar />
            </div>
        </div>
    );
}
