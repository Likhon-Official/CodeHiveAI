import React from 'react';
import { Terminal, Trash2 } from 'lucide-react';

interface ConsoleProps {
  logs: Array<{ type: 'log' | 'error' | 'warn'; content: string; timestamp: number }>;
  onClear: () => void;
}

export default function Console({ logs, onClear }: ConsoleProps) {
  const consoleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="editor-pane glow">
      <div className="editor-header">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-gray-200">Console</span>
        </div>
        <button
          onClick={onClear}
          className="p-1 hover:bg-white/5 rounded transition-colors"
          title="Clear console"
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div
        ref={consoleRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm space-y-2"
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className={`${
              log.type === 'error'
                ? 'text-red-400'
                : log.type === 'warn'
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            <span className="text-gray-500 text-xs">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className="ml-2">{log.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}