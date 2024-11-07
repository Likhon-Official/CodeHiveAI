import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_HTML = `<div class="container">
  <h1>Hello World</h1>
  <p>Welcome to WebCode Editor</p>
</div>`;

const DEFAULT_CSS = `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #1e1b4b);
  color: white;
  font-family: system-ui, -apple-system, sans-serif;
}

.container {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
  margin: 0 0 1rem;
  background: linear-gradient(to right, #818cf8, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
}

p {
  margin: 0;
  color: #94a3b8;
}`;

const DEFAULT_JS = `// Add any JavaScript functionality here`;

export function useCodeState() {
  const [html, setHtml] = useLocalStorage('editor_html', DEFAULT_HTML);
  const [css, setCss] = useLocalStorage('editor_css', DEFAULT_CSS);
  const [js, setJs] = useLocalStorage('editor_js', DEFAULT_JS);

  const updateCode = useCallback((type: 'html' | 'css' | 'javascript', value: string) => {
    switch (type) {
      case 'html':
        setHtml(value);
        break;
      case 'css':
        setCss(value);
        break;
      case 'javascript':
        setJs(value);
        break;
    }
  }, [setHtml, setCss, setJs]);

  const resetToDefault = useCallback(() => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
  }, [setHtml, setCss, setJs]);

  return { html, css, js, updateCode, resetToDefault };
}