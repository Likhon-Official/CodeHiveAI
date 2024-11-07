import React, { useState } from 'react';
import { Hexagon, Moon, Sun, Download, Share2, MoreVertical } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onHome?: () => void;
}

export default function Header({ onHome }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExport = () => {
    const files = {
      'index.html': document.querySelector('iframe')?.srcdoc || '',
    };

    const blob = new Blob([JSON.stringify(files, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codehive-project.json';
    a.click();
    URL.revokeObjectURL(url);
    if (isMobile) setIsMenuOpen(false);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Link copied to clipboard!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
      if (isMobile) setIsMenuOpen(false);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    if (isMobile) setIsMenuOpen(false);
  };

  const MobileMenu = () => (
    <div className="fixed inset-0 z-50 animate-fade-in" onClick={() => setIsMenuOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div 
        className="absolute right-2 top-16 w-48 glass-panel py-2 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleThemeToggle}
          className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
        <button
          onClick={handleExport}
          className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Project</span>
        </button>
        <button
          onClick={handleShare}
          className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Project</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="glass-panel m-2 px-4 py-2 flex items-center justify-between">
        <button 
          onClick={onHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
        >
          <div className="relative">
            <Hexagon className="w-6 h-6 text-accent-primary animate-pulse group-hover:animate-none" />
            <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h1 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold bg-gradient-to-r from-accent-primary via-purple-500 to-accent-secondary text-transparent bg-clip-text bg-300% animate-gradient`}>
            CodeHive AI
          </h1>
        </button>
        
        {isMobile ? (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn-ghost"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleExport}
              className="btn-ghost"
              title="Export project"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="text-sm">Export</span>
            </button>

            <button
              onClick={handleShare}
              className="btn-ghost"
              title="Share project"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        )}
      </header>
      {isMobile && isMenuOpen && <MobileMenu />}
    </>
  );
}