// Cloudflare Pages Function: serves the RFC 9727 API catalog with the exact
// application/linkset+json media type (Pages _headers can't override the
// Content-Type of static assets, so this path is served by a function).
const catalog = {
  linkset: [
    {
      anchor: 'https://the-ai-course.hurayraiit.com/search-index.json',
      links: [
        {
          rel: 'service-desc',
          href: 'https://the-ai-course.hurayraiit.com/openapi.json',
          type: 'application/openapi+json',
        },
        {
          rel: 'service-doc',
          href: 'https://the-ai-course.hurayraiit.com/about/',
          type: 'text/html',
        },
        {
          rel: 'status',
          href: 'https://the-ai-course.hurayraiit.com/search-index.json',
        },
      ],
    },
  ],
};

export function onRequestGet() {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
