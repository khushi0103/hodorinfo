function buildAnalyticsUrl(endpoint: string) {
  const normalizedEndpoint = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
  return new URL("umami", normalizedEndpoint).toString();
}

export function initializeAnalytics() {
  if (typeof document === "undefined") {
    return;
  }

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

  if (!endpoint || !websiteId) {
    return;
  }

  if (document.querySelector('script[data-hodor-analytics="umami"]')) {
    return;
  }

  try {
    const script = document.createElement("script");
    script.defer = true;
    script.src = buildAnalyticsUrl(endpoint);
    script.dataset.websiteId = websiteId;
    script.dataset.hodorAnalytics = "umami";
    document.head.appendChild(script);
  } catch (error) {
    console.warn("Skipping analytics script due to invalid analytics configuration.", error);
  }
}
