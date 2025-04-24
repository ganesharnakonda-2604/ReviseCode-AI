// src/App.js
import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import ReviewResults from './components/ReviewResults';
import LoadingIndicator from './components/LoadingIndicator';
import { reviewCode } from './services/api';
function App() {
  const [reviewResults, setReviewResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleCodeReview = async (code, language) => {
    setIsLoading(true);
    setError(null);
    setCurrentLanguage(language);
    
    try {
      const response = await reviewCode(code, language);
      
      // Process the AI response
      const formattedResponse = processAIResponse(response);
      setReviewResults(formattedResponse);
    } catch (err) {
      console.error('Error reviewing code:', err);
      setError('Failed to review code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const processAIResponse = (response) => {
    // This is a simplified processor - in reality you'd need to parse
    // the Gemini AI output and structure it appropriately
    
    // For demo purposes, let's assume we get structured data back
    // You'll need to adjust this based on how Gemini actually returns data
    const text = response.candidates[0].content.parts[0].text;
    
    // Basic parsing logic (you'd need to enhance this)
    const sections = {
      summary: 'Code review completed.',
      bugs: [],
      performance: [],
      bestPractices: [],
      suggestions: []
    };
    
    // Very simple parsing - you'd need more sophisticated parsing in reality
    const lines = text.split('\n');
    let currentSection = 'summary';
    
    for (const line of lines) {
      if (line.toLowerCase().includes('bug') || line.toLowerCase().includes('issue')) {
        currentSection = 'bugs';
        sections.bugs.push(line);
      } else if (line.toLowerCase().includes('performance')) {
        currentSection = 'performance';
        sections.performance.push(line);
      } else if (line.toLowerCase().includes('practice')) {
        currentSection = 'bestPractices';
        sections.bestPractices.push(line);
      } else if (line.toLowerCase().includes('suggest') || line.toLowerCase().includes('improve')) {
        currentSection = 'suggestions';
        sections.suggestions.push(line);
      } else if (line.trim() && currentSection === 'summary') {
        sections.summary = line;
      } else if (line.trim()) {
        sections[currentSection].push(line);
      }
    }
    
    return sections;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <div className="logo">
          <h1>ReviseCode AI</h1>
          <p>AI-Powered Code Reviewer</p>
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main className="app-main">
        <CodeEditor onSubmit={handleCodeReview} />
        
        {isLoading && <LoadingIndicator />}
        
        {error && <div className="error-message">{error}</div>}
        
        {reviewResults && !isLoading && (
          <ReviewResults results={reviewResults} language={currentLanguage} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          ReviseCode AI © {new Date().getFullYear()} | Powered by Gemini AI
        </p>
      </footer>
    </div>
  );
}

export default App;