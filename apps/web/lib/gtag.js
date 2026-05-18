export const GA_TRACKING_ID = "G-PM4GG76SWF";

export function pageview(url) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: url,
        page_title: document.title,
    });
}

export function event(action, params = {}) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", action, params);
}
