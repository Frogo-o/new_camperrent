export const GA_TRACKING_ID = "G-PM4GG76SWF";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

export function event(action, params = {}) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", action, params);
}
