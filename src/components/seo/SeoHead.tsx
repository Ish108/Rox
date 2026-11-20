import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CLUB } from '@/data/club';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  schemas?: Array<Record<string, unknown>>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  path,
  schemas = [],
}) => {
  const canonicalUrl = `${CLUB.domain}${path === '/' ? '/' : path}`;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content="#060B18" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={CLUB.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${CLUB.domain}/og-placeholder.svg`} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${CLUB.domain}/og-placeholder.svg`} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
