"use client";

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({
  label = "Print / Save as PDF",
  className = "px-5 py-2.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors",
}: PrintButtonProps) {
  return (
    <button onClick={() => window.print()} className={className}>
      {label}
    </button>
  );
}
