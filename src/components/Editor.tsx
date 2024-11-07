import React, { useState, useEffect } from 'react';
import Header from './Header';
import CodePane from './CodePane';
import Preview from './Preview';
import { useCodeState } from '../hooks/useCodeState';
import { Code2, FileJson, FileType2, Play } from 'lucide-react';

type Language = 'html' | 'css' | 'javascript' | 'preview';

interface EditorProps {
  onHome: () => void;
}

export default function Editor({ onHome }: EditorProps) {
  const { html, css, js, updateCode } = useCodeState();
  const [activeTab, setActiveTab] = useState<Language>('html');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'html' as const, label: 'HTML', icon: FileType2, value: html },
    { id: 'css' as const, label: 'CSS', icon: FileJson, value: css },
    { id: 'javascript' as const, label: 'JavaScript', icon: Code2, value: js },
    { id: 'preview' as const, label: 'Preview', icon: Play, value: '' },
  ];

  const renderMobileLayout = () => (
    <div className="h-[calc(100vh-5rem)] flex flex-col animate-fade-in">
      {/* Fixed-position tab bar */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center px-2 overflow-x-auto scrollbar-thin">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-[80px] px-3 py-3 flex items-center justify-center gap-1.5 transition-all ${
                activeTab === id
                  ? 'text-accent-primary border-b-2 border-accent-primary bg-white/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium text-sm whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content area with proper height calculation */}
      <div className="flex-1 h-[calc(100vh-9rem)] overflow-hidden">
        {activeTab === 'preview' ? (
          <Preview html={html} css={css} js={js} />
        ) : (
          <div className="h-full">
            <CodePane
              language={activeTab}
              value={tabs.find(t => t.id === activeTab)?.value || ''}
              onChange={(value) => updateCode(activeTab, value)}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderDesktopLayout = () => (
    <div className="h-[calc(100vh-5rem)] grid grid-cols-2 gap-2 animate-fade-in">
      <div className="editor-pane glow group">
        <div className="flex items-center gap-1 px-2 pt-1">
          {tabs.slice(0, 3).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-3 py-1.5 rounded-t-lg flex items-center gap-1.5 transition-all text-sm ${
                activeTab === id
                  ? 'bg-gray-900/60 text-accent-primary border-t-2 border-x-2 border-accent-primary/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
        
        <div className="editor-content">
          <CodePane
            language={activeTab}
            value={tabs.find(t => t.id === activeTab)?.value || ''}
            onChange={(value) => updateCode(activeTab, value)}
          />
        </div>
      </div>
      
      <Preview html={html} css={css} js={js} />
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      <Header onHome={onHome} />
      <main className="flex-1 overflow-hidden">
        {isMobile ? renderMobileLayout() : renderDesktopLayout()}
      </main>
    </div>
  );
}