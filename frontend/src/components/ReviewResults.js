// src/components/ReviewResults.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReviewResults = ({ results, language }) => {
  if (!results) return null;

  // Extract sections from the AI response (assuming it's structured)
  const sections = {
    summary: results.summary || 'Code review completed.',
    bugs: results.bugs || [],
    performance: results.performance || [],
    bestPractices: results.bestPractices || [],
    suggestions: results.suggestions || []
  };

  return (
    <div className="review-results">
      <h2>Code Review Results</h2>
      
      <div className="review-section">
        <h3>Summary</h3>
        <ReactMarkdown>{sections.summary}</ReactMarkdown>
      </div>

      {sections.bugs.length > 0 && (
        <div className="review-section">
          <h3>Potential Issues</h3>
          <ul className="issue-list">
            {sections.bugs.map((bug, index) => (
              <li key={`bug-${index}`} className="issue-item">
                <span className="issue-icon">⚠️</span>
                <ReactMarkdown>{bug}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sections.performance.length > 0 && (
        <div className="review-section">
          <h3>Performance Considerations</h3>
          <ul className="issue-list">
            {sections.performance.map((item, index) => (
              <li key={`perf-${index}`} className="issue-item">
                <span className="issue-icon">⚡</span>
                <ReactMarkdown>{item}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sections.bestPractices.length > 0 && (
        <div className="review-section">
          <h3>Best Practices</h3>
          <ul className="issue-list">
            {sections.bestPractices.map((practice, index) => (
              <li key={`practice-${index}`} className="issue-item">
                <span className="issue-icon">✅</span>
                <ReactMarkdown>{practice}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sections.suggestions.length > 0 && (
        <div className="review-section">
          <h3>Suggestions for Improvement</h3>
          <ul className="issue-list">
            {sections.suggestions.map((suggestion, index) => (
              <li key={`suggestion-${index}`} className="issue-item">
                <span className="issue-icon">💡</span>
                <ReactMarkdown>{suggestion}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewResults;