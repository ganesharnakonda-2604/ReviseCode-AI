// src/components/CodeEditor.js
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeEditor = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(code, language);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const supportedLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
  ];

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <h2>Code Editor</h2>
        <div className="language-selector">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="editor-area">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write or paste your code here..."
          className="code-textarea"
        />
        <div className="preview-area">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={true}
          >
            {code || '// Code preview will appear here'}
          </SyntaxHighlighter>
        </div>
      </div>

      <button
        className="review-button"
        onClick={handleSubmit}
        disabled={isLoading || !code.trim()}
      >
        {isLoading ? 'Reviewing...' : 'Review Code'}
      </button>
    </div>
  );
};

export default CodeEditor;