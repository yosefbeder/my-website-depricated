import React from 'react';
import MarkdownCompiler from 'markdown-to-jsx';

const Markdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <MarkdownCompiler
      options={{
        wrapper: 'article',
        forceWrapper: true,
        overrides: {
          a: {
            component: 'a',
            props: {
              target: '_blank',
              className: 'link',
            },
          },
        },
      }}
    >
      {children}
    </MarkdownCompiler>
  );
};

export default Markdown;
