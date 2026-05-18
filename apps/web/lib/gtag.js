export const GA_TRACKING_ID = "G-PM4GG76SWF";

export function event(action, params = {}) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", action, params);
}
