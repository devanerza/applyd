import { useForm } from '@inertiajs/react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function InterviewModal({ isOpen, onClose, applicationId, interview = null }) {
    const isEdit = !!interview;

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        type: interview?.type || 'technical',
        title: interview?.title || '',
        interviewer_name: interview?.interviewer_name || '',
        interviewer_email: interview?.interviewer_email || '',
        scheduled_at: interview?.scheduled_at
            ? new Date(interview.scheduled_at).toISOString().slice(0, 16)
            : '',
        duration_minutes: interview?.duration_minutes || 60,
        meeting_url: interview?.meeting_url || '',
        notes: interview?.notes || '',
        preparation_checklist: interview?.preparation_checklist || [],
    });

    const [newCheckItem, setNewCheckItem] = useState('');

    useEffect(() => {
        if (isOpen && interview) {
            setData({
                type: interview.type || 'technical',
                title: interview.title || '',
                interviewer_name: interview.interviewer_name || '',
                interviewer_email: interview.interviewer_email || '',
                scheduled_at: interview.scheduled_at
                    ? new Date(interview.scheduled_at).toISOString().slice(0, 16)
                    : '',
                duration_minutes: interview.duration_minutes || 60,
                meeting_url: interview.meeting_url || '',
                notes: interview.notes || '',
                preparation_checklist: interview.preparation_checklist || [],
            });
        }
        if (isOpen && !interview) {
            reset();
            setNewCheckItem('');
        }
        if (!isOpen) {
            reset();
            setNewCheckItem('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? route('applications.interviews.update', [applicationId, interview.id])
            : route('applications.interviews.store', applicationId);

        const method = isEdit ? patch : post;

        method(url, {
            preserveState: true,
            onSuccess: () => {
                reset();
                setNewCheckItem('');
                onClose();
            },
        });
    };

    const addCheckItem = () => {
        if (newCheckItem.trim()) {
            setData('preparation_checklist', [
                ...data.preparation_checklist,
                { item: newCheckItem.trim(), checked: false },
            ]);
            setNewCheckItem('');
        }
    };

    const removeCheckItem = (index) => {
        setData(
            'preparation_checklist',
            data.preparation_checklist.filter((_, i) => i !== index)
        );
    };

    const toggleCheckItem = (index) => {
        const updated = [...data.preparation_checklist];
        updated[index].checked = !updated[index].checked;
        setData('preparation_checklist', updated);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[9998] bg-black/50" onClick={onClose} />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto bg-base-100 relative shadow-2xl rounded-2xl pointer-events-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-base-content">
                            {isEdit ? 'Edit Interview' : 'Schedule Interview'}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Interview Type *</span>
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="technical">Technical</option>
                                    <option value="behavioral">Behavioral</option>
                                    <option value="screening">Screening</option>
                                    <option value="system_design">System Design</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.type && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.type}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Round 2 - System Design"
                                    className="input input-bordered w-full"
                                />
                                {errors.title && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.title}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Interviewer Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.interviewer_name}
                                    onChange={(e) => setData('interviewer_name', e.target.value)}
                                    placeholder="e.g. John Smith"
                                    className="input input-bordered w-full"
                                />
                                {errors.interviewer_name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.interviewer_name}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Interviewer Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.interviewer_email}
                                    onChange={(e) => setData('interviewer_email', e.target.value)}
                                    placeholder="e.g. john@company.com"
                                    className="input input-bordered w-full"
                                />
                                {errors.interviewer_email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.interviewer_email}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date & Time *</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.scheduled_at}
                                    onChange={(e) => setData('scheduled_at', e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                                {errors.scheduled_at && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.scheduled_at}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Duration (minutes)</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.duration_minutes}
                                    onChange={(e) => setData('duration_minutes', parseInt(e.target.value) || '')}
                                    min="15"
                                    max="480"
                                    placeholder="60"
                                    className="input input-bordered w-full"
                                />
                                {errors.duration_minutes && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.duration_minutes}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meeting URL</span>
                            </label>
                            <input
                                type="url"
                                value={data.meeting_url}
                                onChange={(e) => setData('meeting_url', e.target.value)}
                                placeholder="https://meet.google.com/..."
                                className="input input-bordered w-full"
                            />
                            {errors.meeting_url && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.meeting_url}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Notes</span>
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Preparation notes, things to review..."
                                className="textarea textarea-bordered w-full"
                                rows="3"
                            />
                            {errors.notes && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.notes}</span>
                                </label>
                            )}
                        </div>

                        {/* Preparation Checklist */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Preparation Checklist</span>
                            </label>
                            <div className="space-y-2">
                                {data.preparation_checklist.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleCheckItem(index)}
                                            className="checkbox checkbox-sm checkbox-primary"
                                        />
                                        <span className={`flex-1 text-sm ${item.checked ? 'line-through text-base-content/50' : 'text-base-content'}`}>
                                            {item.item}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeCheckItem(index)}
                                            className="btn btn-ghost btn-xs text-error"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCheckItem}
                                        onChange={(e) => setNewCheckItem(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCheckItem())}
                                        placeholder="Add checklist item..."
                                        className="input input-bordered input-sm flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={addCheckItem}
                                        className="btn btn-sm btn-primary btn-outline"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-ghost"
                                disabled={processing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={processing}
                            >
                                {processing
                                    ? (isEdit ? 'Saving...' : 'Scheduling...')
                                    : (isEdit ? 'Save Changes' : 'Schedule Interview')
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
