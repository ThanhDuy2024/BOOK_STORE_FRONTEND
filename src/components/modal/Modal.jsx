import React from "react";

export const Modal = ({ open, onClose, title, children, width = "max-w-lg" }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className={`modal-box relative w-full ${width}`}>
                {/* Button Close */}
                <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-3 top-3"
                >
                    ✕
                </button>

                {/* Title */}
                <h3 className="font-bold text-2xl text-primary mb-5">
                    {title}
                </h3>

                {/* Content */}
                {children}
            </div>
        </div>
    );
};