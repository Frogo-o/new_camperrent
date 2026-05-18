"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "../lib/gtag";

export default function AnalyticsEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastTrackedUrl = useRef("");

    useEffect(() => {
        const currentUrl = `${window.location.pathname}${window.location.search}`;

        if (!currentUrl || currentUrl === lastTrackedUrl.current) return;

        lastTrackedUrl.current = currentUrl;
        pageview(currentUrl);
    }, [pathname, searchParams]);

    return null;
}
