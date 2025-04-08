// title: "NoAscii Test Article"
// category: "ai-news"
// date: "2025-04-09"
// coverImage: "/images/test-noascii.jpg"
// description: "A test article that should work without anyAscii"
// tags: ["test", "noascii"]
// author: "Test Author"

import React from 'react';

export default function TestNoasciiArticle() {
  return (
    <article className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">NoAscii Test Article</h1>
      
      <div className="prose max-w-none">
        <p>This is a test article that should work without anyAscii conversion because the title is already in ASCII format.</p>
        
        <h2>Test Features</h2>
        <ul>
          <li>ASCII title (no conversion needed)</li>
          <li>Metadata extraction</li>
          <li>File generation</li>
          <li>Git commands</li>
        </ul>
        
        <p>If this test succeeds, it means the pipeline can work even with the anyAscii issue.</p>
      </div>
    </article>
  );
} 