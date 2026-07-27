import {
  altLogo,
  description,
  jsonHome,
  name,
} from "@/constants/company.constant";
import { url } from "@/constants/routes";
import Script from "next/script";

export default function JsonldHome() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": url + "/#website",
        url: url,
        name: jsonHome[0],
        description: description,
        potentialAction: {
          "@type": "SearchAction",
          target: url + "/san-pham?keyword={search}",
          "query-input": "required name=search",
        },
        inLanguage: "vi-VN",
      },
      {
        "@type": "Organization",
        "@id": url + "/#organization",
        name: name,
        url: url,
        logo: {
          "@type": "ImageObject",
          "@id": url + "/#logo",
          url: url + "/images/logo.png",
          width: 600,
          height: 200,
          caption: altLogo,
        },

        image: {
          "@id": url + "/#logo",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+84-933-808-837",
            contactType: "Dịch vụ khách hàng",
            contactOption: "TollFree",
            areaServed: "VN",
            availableLanguage: [
              {
                "@type": "Language",
                name: "Vietnamese",
                alternateName: "vi",
              },
            ],
          },
          {
            "@type": "ContactPoint",
            telephone: "+84-933-808-837",
            contactType: "Hỗ trợ kỹ thuật",
            areaServed: "VN",
            availableLanguage: [
              {
                "@type": "Language",
                name: "Vietnamese",
                alternateName: "vi",
              },
            ],
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "245B Trần Quang Khải",
          addressLocality: "Quận 1",
          addressRegion: "TP Hồ Chí Minh",
          postalCode: "700000",
          addressCountry: {
            "@type": "Country",
            name: "Vietnam",
          },
        },
        sameAs: ["https://www.facebook.com/congnghechinhnhan"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "08:00",
            closes: "17:45",
          },
        ],
        priceRange: "₫₫₫",
      },
      {
        "@type": "CollectionPage",
        "@id": url + "/#webpage",
        url: url,
        name: jsonHome[1],
        isPartOf: {
          "@id": url + "/#website",
        },
        about: {
          "@id": url + "/#organization",
        },
        description: description,
        breadcrumb: { "@id": url + "/#breadcrumb" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        publisher: {
          "@id": url + "/#organization",
        },
        inLanguage: "vi-VN",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [url],
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": url + "/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sản phẩm",
            item: url + "/san-pham",
          },
        ],
      },
    ],
  };

  return (
    <Script
      id="json-ld-schema-home"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd) || "",
      }}
    />
  );
}
