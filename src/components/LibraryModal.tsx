import React from 'react';
import { X, PackagePlus } from 'lucide-react';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LibraryModal({ isOpen, onClose }: LibraryModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] ${isOpen ? 'animate-fade-in' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div 
          className={`glass-panel w-full max-w-md transform transition-all duration-200 relative
                     ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PackagePlus className="w-5 h-5 text-accent-primary" />
              <h2 className="text-lg font-semibold text-white">Add Library</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg
                       hover:bg-white/5"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-8 text-center relative">
            <div className="mb-6">
              <div className="absolute inset-x-8 top-4 h-24 bg-accent-primary/10 blur-2xl rounded-full" />
              <PackagePlus className="relative w-16 h-16 text-accent-primary mx-auto mb-4 
                                    animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 relative">
              Library Integration Coming Soon!
            </h3>
            <p className="text-gray-300 mb-2 relative">
              We're working on making your development experience even better.
            </p>
            <p className="text-sm text-gray-400 relative">
              Soon you'll be able to easily add and manage external libraries and frameworks 
              to enhance your projects directly from this modal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}