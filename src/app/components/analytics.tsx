"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

// Replace with your actual Google Analytics ID when available
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

const AnalyticsContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.origin + url,
      });

      // Custom event for AI crawlers detection
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        custom_parameters: {
          user_agent: navigator.userAgent,
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight,
        }
      });
    }
  }, [pathname, searchParams]);

  // Only render in production or when GA_ID is provided
  if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'user_engagement'
            }
          });

          // Enhanced events for better AI understanding
          gtag('event', 'website_load', {
            event_category: 'engagement',
            event_label: 'VANTIX Website',
            value: 1
          });

          // Track contact interactions
          document.addEventListener('click', function(e) {
            const target = e.target;
            if (target.matches('a[href^="tel:"]')) {
              gtag('event', 'phone_click', {
                event_category: 'contact',
                event_label: 'Phone Number Click',
                value: 1
              });
            }
            if (target.matches('a[href^="mailto:"]')) {
              gtag('event', 'email_click', {
                event_category: 'contact',
                event_label: 'Email Click',
                value: 1
              });
            }
          });
        `}
      </Script>

      {/* Microsoft Clarity (optional - uncomment when needed) */}
      {/*
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
        `}
      </Script>
      */}

      {/* Structured Data for Real-time Analytics */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "name": "Analytics Tracking",
            "description": "Enhanced analytics and AI search optimization for VANTIX website",
            "url": typeof window !== 'undefined' ? window.location.href : 'https://vantix.ro',
            "dateModified": new Date().toISOString(),
            "isPartOf": {
              "@type": "WebSite",
              "name": "VANTIX",
              "url": "https://vantix.ro"
            }
          })
        }}
      />
    </>
  );
};

const Analytics = () => {
  return (
    <Suspense fallback={<div style={{display: 'none'}} />}>
      <AnalyticsContent />
    </Suspense>
  );
};

// Custom hook for tracking events
export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'user_interaction',
        ...parameters
      });
    }
  };

  const trackFormSubmission = (formName: string) => {
    trackEvent('form_submit', {
      event_category: 'engagement',
      event_label: formName,
      value: 1
    });
  };

  const trackButtonClick = (buttonName: string) => {
    trackEvent('button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      value: 1
    });
  };

  return {
    trackEvent,
    trackFormSubmission,
    trackButtonClick
  };
};

export default Analytics;