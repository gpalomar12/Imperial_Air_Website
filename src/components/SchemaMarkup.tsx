import React from 'react';

interface SchemaMarkupProps {
  data: Record<string, any>;
}

export default function SchemaMarkup({ data }: SchemaMarkupProps) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}
