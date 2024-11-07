import React, { useCallback, useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

interface CodePaneProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CodePane({ language, value, onChange }: CodePaneProps) {
  const [copied, setCopied] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  const highlight = useCallback((code: string) => {
    let lang = 'javascript';
    switch (language) {
      case 'html':
        lang = 'markup';
        break;
      case 'css':
        lang = 'css';
        break;
      case 'javascript':
        lang = 'javascript';
        break;
    }
    return Prism.highlight(code, Prism.languages[lang], lang);
  }, [language]);

  return (
    <div className="relative h-full group">
      <button
        onClick={handleCopy}
        className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors z-10
                   ${isMobile ? 'bg-gray-800/80 opacity-100' : 'hover:bg-white/5 opacity-0 group-hover:opacity-100'}`}
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={highlight}
        padding={16}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: isMobile ? '13px' : '14px',
          backgroundColor: 'transparent',
          height: '100%',
          overflow: 'auto',
        }}
        className="w-full h-full bg-gray-900/60 text-gray-100 resize-none
                  focus:outline-none focus:ring-1 focus:ring-accent-primary/20
                  scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
        textareaClassName="focus:outline-none caret-accent-primary"
        preClassName="language-javascript"
      />
    </div>
  );
}