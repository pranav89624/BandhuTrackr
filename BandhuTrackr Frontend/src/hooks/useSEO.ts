import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export const useSEO = ({
  title = 'BandhuTrackr - Know Your Real Bandhu',
  description = 'Apne the ya nahi? Hum bata denge. Track your social media followers with BandhuTrackr.',
  keywords = 'social media tracking, follower tracker, unfollow detector, bandhu tracker, instagram followers, social media analytics',
  author = 'Pranav Verma',
  ogTitle,
  ogDescription,
  ogImage = '/icon.webp',
  twitterCard = 'summary_large_image'
}: SEOProps = {}) => {
  useEffect(() => {
    document.title = title;

    // Helper function to update existing meta tags only
    const updateExistingMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      const element = document.querySelector(selector) as HTMLMetaElement;
      
      if (element) {
        element.setAttribute('content', content);
      }
    };

    // Update existing meta tags if they differ from defaults
    if (description !== 'Apne the ya nahi? Hum bata denge. Track your social media followers with BandhuTrackr.') {
      updateExistingMetaTag('description', description);
    }
    
    if (keywords !== 'social media tracking, follower tracker, unfollow detector, bandhu tracker, instagram followers, social media analytics') {
      updateExistingMetaTag('keywords', keywords);
    }

    // Update Open Graph tags if custom values provided
    if (ogTitle && ogTitle !== title) {
      updateExistingMetaTag('og:title', ogTitle, true);
    }
    
    if (ogDescription && ogDescription !== description) {
      updateExistingMetaTag('og:description', ogDescription, true);
    }

    // Update Twitter tags if custom values provided
    if (ogTitle && ogTitle !== title) {
      updateExistingMetaTag('twitter:title', ogTitle);
    }
    
    if (ogDescription && ogDescription !== description) {
      updateExistingMetaTag('twitter:description', ogDescription);
    }

    return () => {};
  }, [title, description, keywords, author, ogTitle, ogDescription, ogImage, twitterCard]);
};

export default useSEO;
