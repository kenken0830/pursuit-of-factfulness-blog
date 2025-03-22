"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import Image from "next/image"

interface MarkdownDisplayProps {
  content: string
}

export function MarkdownDisplay({ content }: MarkdownDisplayProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
        li: ({ node, ...props }) => <li className="my-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        img: ({ node, src, alt, ...props }) => (
          <div className="my-6">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt || ""}
              width={800}
              height={450}
              className="rounded-lg mx-auto"
            />
            {alt && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
          </div>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              className="rounded-md my-4"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
              {children}
            </code>
          )
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-gray-300" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
        th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-sm font-semibold" {...props} />,
        td: ({ node, ...props }) => <td className="px-4 py-3 text-sm" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-8 border-gray-300" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

