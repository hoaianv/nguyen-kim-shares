"use client";

import { useEffect, useCallback, useRef } from "react";

declare global {
    interface Window {
        google?: any;
        googleTranslateElementInit?: () => void;
    }
}

export type Lang = "vi" | "en";

function setCookie(name: string, value: string, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Google uses cookie googtrans like "/vi/en"
function setGoogTransCookie(from: Lang, to: Lang) {
    setCookie("googtrans", `/${from}/${to}`);

    // best-effort for root domain
    const host = location.hostname;
    const parts = host.split(".");
    if (parts.length >= 2) {
        const root = parts.slice(-2).join(".");
        document.cookie = `googtrans=/${from}/${to}; path=/; domain=.${root}`;
    }
}

export function useGoogleTranslateEngine(pageLanguage: Lang = "vi") {
    const readyRef = useRef(false);

    const isReady = useCallback(() => {
        return readyRef.current && !!document.querySelector(".goog-te-combo");
    }, []);

    const switchTo = useCallback(
        (lang: Lang) => {
            // persist preference via cookie
            setGoogTransCookie(pageLanguage, lang);

            // stable approach: change Google select value
            const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
            if (combo) {
                combo.value = lang;
                combo.dispatchEvent(new Event("change"));
            }
        },
        [pageLanguage]
    );

    useEffect(() => {
        // Inject style to hide Google UI + banner (no css file)
        if (!document.getElementById("gt-inline-style")) {
            const style = document.createElement("style");
            style.id = "gt-inline-style";
            style.textContent = `
        #google_translate_element { display:none !important; }
        .goog-te-banner-frame.skiptranslate { display:none !important; }
        body { top:0px !important; }
        .goog-tooltip, .goog-tooltip:hover { display:none !important; }
        .goog-text-highlight { background: inherit !important; box-shadow: none !important; }
      `;
            document.head.appendChild(style);
        }

        // If script already exists, just wait for combo
        if (document.getElementById("google-translate-script")) {
            const t = setInterval(() => {
                if (document.querySelector(".goog-te-combo")) {
                    readyRef.current = true;
                    clearInterval(t);
                }
            }, 120);
            return () => clearInterval(t);
        }

        window.googleTranslateElementInit = () => {
            // eslint-disable-next-line no-new
            new window.google.translate.TranslateElement(
                {
                    pageLanguage,
                    includedLanguages: "vi,en",
                    autoDisplay: false
                },
                "google_translate_element"
            );

            const t = setInterval(() => {
                if (document.querySelector(".goog-te-combo")) {
                    readyRef.current = true;
                    clearInterval(t);
                }
            }, 120);
        };

        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.async = true;
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
    }, [pageLanguage]);

    return { switchTo, isReady };
}

export default function GoogleTranslateHidden({ pageLanguage = "vi" }: { pageLanguage?: Lang }) {
    // Mount engine
    useGoogleTranslateEngine(pageLanguage);

    // This container is required for Google to inject the hidden select
    return <div id="google_translate_element" />;
}