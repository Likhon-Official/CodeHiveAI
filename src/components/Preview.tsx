import React, { useEffect, useRef, useState } from 'react';
import { Play, RefreshCw, Maximize2, Minimize2, Smartphone, Monitor } from 'lucide-react';

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

export default function Preview({ html, css, js }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileDevice(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const refreshPreview = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
    updateIframe();
  };

  const updateIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            ${css}
            ${(isMobileView || isMobileDevice) ? `
              html {
                max-width: 100%;
                margin: 0;
                background: transparent;
                height: 100%;
              }
              body {
                margin: 0;
                min-height: 100vh;
                overflow-x: hidden;
              }
            ` : ''}
          </style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('Error in JavaScript:', error);
            }
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    iframe.onload = () => URL.revokeObjectURL(url);
  };

  useEffect(() => {
    updateIframe();
  }, [html, css, js, isMobileView, isMobileDevice]);

  // For mobile devices, show a full-screen preview without the editor-pane styling
  if (isMobileDevice) {
    return (
      <div className="fixed inset-0 bg-gray-900">
        <div className="h-12 bg-gray-900/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-green-400" />
            <span className="text-sm font-medium text-gray-200">Preview</span>
          </div>
          <button
            onClick={refreshPreview}
            className={`p-1.5 rounded-lg transition-colors ${
              isRefreshing ? 'animate-spin text-accent-primary' : 'text-gray-400'
            }`}
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <iframe
          ref={iframeRef}
          className="w-full h-[calc(100%-3rem)] bg-white dark:bg-gray-900"
          sandbox="allow-scripts allow-modals"
          title="preview"
        />
      </div>
    );
  }

  // Desktop version remains unchanged
  return (
    <div className={`editor-pane glow group ${isFullscreen ? 'fixed inset-2 z-50' : 'h-[calc(100vh-5rem)]'}`}>
      <div className="editor-header">
        <div className="flex items-center gap-1.5">
          <Play className="w-3.5 h-3.5 text-green-400" />
          <span className="text-sm font-medium text-gray-200">Live Preview</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsMobileView(!isMobileView)}
            className={`p-1 hover:bg-white/5 rounded-lg transition-colors ${isMobileView ? 'text-accent-primary' : 'text-gray-400'}`}
            title={isMobileView ? 'Switch to desktop view' : 'Switch to mobile view'}
          >
            {isMobileView ? (
              <Monitor className="w-3.5 h-3.5" />
            ) : (
              <Smartphone className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={refreshPreview}
            className={`p-1 hover:bg-white/5 rounded-lg transition-colors ${
              isRefreshing ? 'animate-spin text-accent-primary' : 'text-gray-400'
            }`}
            title="Refresh preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-1 hover:bg-white/5 rounded-lg transition-colors ${isFullscreen ? 'text-accent-primary' : 'text-gray-400'}`}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className="flex-1 w-full bg-white dark:bg-gray-900 rounded-b-xl"
        sandbox="allow-scripts allow-modals"
        title="preview"
      />
    </div>
  );
}