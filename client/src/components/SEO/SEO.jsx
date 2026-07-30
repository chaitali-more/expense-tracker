import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Determine current canonical URL based on window location
    const currentOrigin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "http://chaitalimore.in";
    const canonicalUrl = `${currentOrigin}${location.pathname}`;

    // 1. Set Page Title directly
    const defaultTitle = "Personal Finance Tracker & Expense Manager";
    const pageTitle = title || defaultTitle;
    document.title = pageTitle;

    // 2. Set Dynamic Canonical Link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Open Graph & Twitter URL
    let ogUrl = document.querySelector("meta[property='og:url']");
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

    let twitterUrl = document.querySelector("meta[name='twitter:url']");
    if (twitterUrl) twitterUrl.setAttribute("content", canonicalUrl);

    // 4. Open Graph & Twitter Title
    let ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute("content", pageTitle);

    let twitterTitle = document.querySelector("meta[name='twitter:title']");
    if (twitterTitle) twitterTitle.setAttribute("content", pageTitle);

    // 5. Meta Description, OG Description, & Twitter Description
    if (description) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) metaDesc.setAttribute("content", description);

      let ogDesc = document.querySelector("meta[property='og:description']");
      if (ogDesc) ogDesc.setAttribute("content", description);

      let twitterDesc = document.querySelector("meta[name='twitter:description']");
      if (twitterDesc) twitterDesc.setAttribute("content", description);
    }
  }, [title, description, location]);

  return null;
};

export default SEO;
