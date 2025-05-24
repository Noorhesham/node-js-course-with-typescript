import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeSnippetProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'javascript', filename }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-6 overflow-hidden font-shareTechMono">
      {/* Code header with filename and language */}
      <div className="bg-gray-900 px-4 py-2 text-sm border-[1.5px] border-dashed border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          {filename && (
            <span className="text-gray-300">{filename}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {language && (
            <span className="text-xs bg-gray-800 px-2 py-0.5 text-gray-400 border border-gray-700">{language}</span>
          )}
          <button 
            onClick={handleCopy} 
            className="text-xs bg-blue-500 hover:bg-blue-600 px-2 py-1 border-[1.5px] border-dashed border-blue-700 text-white transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative border-x-[1.5px] border-b-[1.5px] border-dashed border-gray-700 bg-gray-950">
        <div className="absolute top-0 left-0 bottom-0 w-10 border-r-[1.5px] border-dashed border-gray-700 bg-gray-900 flex flex-col items-center pt-2 text-gray-500 text-xs">
          {code.split('\n').map((_, i) => (
            <div key={i} className="w-full text-center py-[1.5px]">{i + 1}</div>
          ))}
        </div>
        <div className="overflow-x-auto pl-10">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              borderRadius: 0,
              background: 'transparent',
              fontFamily: 'inherit',
            }}
            showLineNumbers={false}
            wrapLines={true}
            lineProps={() => ({
              style: {
                display: 'block',
                paddingTop: '1.5px',
                paddingBottom: '1.5px',
              }
            })}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
