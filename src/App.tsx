import { useState } from 'react';
import Editor from './components/Editor';
import Homepage from './components/Homepage';

export default function App() {
  const [showEditor, setShowEditor] = useState(false);

  if (showEditor) {
    return <Editor onHome={() => setShowEditor(false)} />;
  }

  return <Homepage onStart={() => setShowEditor(true)} />;
}