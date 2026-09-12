import { router } from "@inertiajs/react";
import { ExternalLink, TrashIcon } from "lucide-react";

const ActionCell = ({ application }) => {
    return (
        <div className="w-21 flex justify-end">
            <a
                href={route('applications.edit', application.id)}
                className="btn btn-sm btn-outline"
            >
                Edit
            </a>
            <button
                className="btn btn-sm btn-outline btn-error ml-1"
                onClick={() => {
                    if (confirm('Delete?')) router.delete(route('applications.destroy', application.id));
                }}
            >
                <TrashIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

export const columns = [
    {
        accessorKey: "company_name",
        header: "Jobs",
        cell: ({ row }) => {
            const application = row.original;
            return (
                <div className="py-3">
                    <h2 className="font-headline text-lg font-bold">{application.role_title}</h2>
                    <p className="font-label text-xs tracking-wide uppercase text-gray-500">{application.company_name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "job_url",
        header: "URL",
        cell: ({ row }) => {
            const application = row.original;
            if (application.job_url == null) return <p className="opacity-30">No Link Provided</p>;
            return (
                <a
                    href={application.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium flex"
                >
                    View Post <ExternalLink className="ml-1 size-4" />
                </a>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const application = row.original;
            const handleStatusChange = (newStatus) => {
                router.patch(route('applications.statusUpdate', application.id), {
                    status: newStatus,
                });
            };
            return (
                <select
                    value={application.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="select select-bordered select-sm"
                >
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="ghosted">Ghosted</option>
                </select>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionCell application={row.original} />,
    },
];
