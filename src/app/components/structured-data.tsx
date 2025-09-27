"use client";

import { usePathname } from "next/navigation";

const StructuredData = () => {
  const pathname = usePathname();

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://vantix.ro/#organization",
    name: "VANTIX",
    legalName: "VANTIX SRL",
    url: "https://vantix.ro",
    logo: {
      "@type": "ImageObject",
      url: "https://vantix.ro/vantix-logo.png",
      width: 300,
      height: 300,
    },
    image: "https://vantix.ro/vantix-logo.png",
    description:
      "VANTIX oferă soluții software inovative în România. Specializați în DataSight pentru analiza datelor, dezvoltare aplicații web și mobile, consultanță IT și servicii de digitalizare pentru afaceri moderne.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Adrian Hănțăscu",
        jobTitle: "Co-Fondator & CEO",
        worksFor: {
          "@type": "Organization",
          name: "VANTIX",
        },
      },
      {
        "@type": "Person",
        name: "Alexandru Hănțăscu",
        jobTitle: "Co-Fondator & CTO",
        worksFor: {
          "@type": "Organization",
          name: "VANTIX",
        },
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+40745306164",
      email: "contact@vantix.ro",
      contactType: "customer service",
      availableLanguage: ["Romanian", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "RO",
      addressRegion: "București",
      addressLocality: "București",
      postalCode: "010000",
    },
    sameAs: [
      "https://www.linkedin.com/company/vantix",
      "https://twitter.com/vantix_ro",
      "https://facebook.com/vantix.ro",
    ],
    knowsAbout: [
      "Software Development",
      "Data Analysis",
      "DataSight",
      "Web Applications",
      "Mobile Applications",
      "Business Intelligence",
      "Custom Software Solutions",
      "IT Consulting",
      "Digital Transformation",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "DataSight Analytics Platform",
          description:
            "Platformă avansată de analiză și vizualizare a datelor pentru afaceri moderne",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dezvoltare Aplicații Web Custom",
          description:
            "Soluții web personalizate dezvoltate cu tehnologii moderne",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dezvoltare Aplicații Mobile",
          description:
            "Aplicații mobile native și cross-platform pentru iOS și Android",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consultanță IT și Digitalizare",
          description:
            "Servicii de consultanță pentru transformarea digitală a afacerii",
        },
      },
    ],
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://vantix.ro/#website",
    url: "https://vantix.ro",
    name: "VANTIX - Soluții Software Inovative",
    description:
      "Website oficial VANTIX - soluții software inovative, DataSight, dezvoltare aplicații web și mobile în România",
    publisher: {
      "@id": "https://vantix.ro/#organization",
    },
    inLanguage: "ro-RO",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vantix.ro/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // Software Product Schema for DataSight
  const dataSightSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DataSight",
    applicationCategory: "Business Intelligence Software",
    description:
      "Platformă avansată de analiză și vizualizare a datelor pentru afaceri moderne. Transformă datele complexe în insights acționabile prin dashboard-uri interactive și rapoarte inteligente.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
      description: "Consultanță gratuită pentru implementarea DataSight",
    },
    operatingSystem: "Web-based, iOS, Android",
    softwareVersion: "1.0",
    creator: {
      "@id": "https://vantix.ro/#organization",
    },
    provider: {
      "@id": "https://vantix.ro/#organization",
    },
    featureList: [
      "Analiză avansată de date",
      "Dashboard-uri interactive",
      "Rapoarte automatizate",
      "Vizualizări în timp real",
      "Integrare cu multiple surse de date",
      "Export în multiple formate",
      "Securitate enterprise",
    ],
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VANTIX Software Development Services",
    description:
      "Servicii profesionale de dezvoltare software, consultanță IT și soluții digitale personalizate pentru afaceri din România și străinătate.",
    provider: {
      "@id": "https://vantix.ro/#organization",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "România",
      },
      {
        "@type": "AdministrativeArea",
        name: "Europa",
      },
    ],
    serviceType: [
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "Data Analytics",
      "IT Consulting",
      "Digital Transformation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "VANTIX Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DataSight Implementation",
            description: "Implementare și customizare platformă DataSight",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Development",
            description: "Dezvoltare aplicații web personalizate",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Dezvoltare aplicații mobile native și cross-platform",
          },
        },
      ],
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ce servicii oferă VANTIX?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VANTIX oferă soluții software complete: DataSight pentru analiza datelor, dezvoltare aplicații web și mobile personalizate, consultanță IT și servicii de digitalizare pentru afaceri moderne.",
        },
      },
      {
        "@type": "Question",
        name: "Ce este DataSight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DataSight este o platformă avansată de analiză și vizualizare a datelor dezvoltată de VANTIX. Transformă datele complexe în insights acționabile prin dashboard-uri interactive și rapoarte inteligente.",
        },
      },
      {
        "@type": "Question",
        name: "În ce tehnologii lucrează VANTIX?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VANTIX lucrează cu tehnologii moderne: React, Next.js, Node.js, Python, TypeScript, cloud platforms (AWS, Azure), baze de date SQL/NoSQL și frameworks mobile native și cross-platform.",
        },
      },
      {
        "@type": "Question",
        name: "Oferă VANTIX consultanță gratuită?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da, oferim consultanță gratuită inițială pentru a înțelege nevoile afacerii dumneavoastră și pentru a propune cele mai potrivite soluții software.",
        },
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: "https://vantix.ro",
      },
    ],
  };

  const allSchemas = [
    organizationSchema,
    websiteSchema,
    dataSightSchema,
    professionalServiceSchema,
    faqSchema,
    breadcrumbSchema,
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
    </>
  );
};

export default StructuredData;
