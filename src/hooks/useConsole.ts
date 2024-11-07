import { useState, useCallback, useRef } from 'react';

interface ConsoleLog {
  type: 'log' | 'error' | 'warn';
  content: string;
  timestamp: number;
}

export function useConsole() {
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const originalConsole = useRef<typeof console>();

  const initConsole = useCallback(() => {
    if (!originalConsole.current) {
      originalConsole.current = { ...console };
    }

    const addLog = (type: ConsoleLog['type'], content: string) => {
      setLogs(prev => [...prev, { type, content: String(content), timestamp: Date.now() }]);
    };

    console.log = (...args) => {
      originalConsole.current?.log(...args);
      addLog('log', args.join(' '));
    };

    console.error = (...args) => {
      originalConsole.current?.error(...args);
      addLog('error', args.join(' '));
    };

    console.warn = (...args) => {
      originalConsole.current?.warn(...args);
      addLog('warn', args.join(' '));
    };
  }, []);

  const clearLogs = () => setLogs([]);

  return { logs, initConsole, clearLogs };
}