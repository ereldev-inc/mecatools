const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

/**
 * Cloudflare Web Analytics: cookieless page views per URL.
 * Only rendered when the token is set at build time (see README).
 */
export function Analytics() {
  if (!token) return null;
  return (
    // Plain tag: Cloudflare reads data-cf-beacon from its own <script> element.
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
