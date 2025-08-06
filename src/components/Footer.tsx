import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Heart, Coffee } from 'lucide-react';

// TypeScript interfaces for better type safety
interface ActionButton {
  text: string;
  href?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  ariaLabel: string;
  isExternal?: boolean;
}

const Footer: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  // Memoized action buttons data with accessibility labels
  const actionButtons: ActionButton[] = useMemo(() => [
    {
      text: 'View on GitHub',
      href: 'https://github.com/pranav89624/BandhuTrackr',
      icon: Github,
      className: 'bg-gray-800 hover:bg-gray-700',
      ariaLabel: 'View BandhuTrackr source code on GitHub',
      isExternal: true
    },
    {
      text: 'Buy me chai!',
      onClick: () => alert('Thanks for the thought! Chai fund coming soon 🍵'),
      icon: Coffee,
      className: 'bg-yellow-600 hover:bg-yellow-500',
      ariaLabel: 'Support the developer by buying them chai'
    }
  ], []);
  return (
    <footer 
      className="bg-gray-900 text-white py-16"
      role="contentinfo"
      aria-label="Site footer with project information and links"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-8"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={prefersReducedMotion ? {} : { duration: 0.3 }}
          >
            <h3 
              className="text-3xl font-display font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
              id="footer-brand"
            >
              BandhuTrackr
            </h3>
            <p className="text-gray-400 text-lg">
              "Apne the ya nahi? Hum bata denge." 🕵️‍♂️
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            role="list"
            aria-label="Project actions and links"
          >
            {actionButtons.map((button) => {
              const IconComponent = button.icon;
              const Component = button.href ? 'a' : 'button';
              
              return (
                <motion.div
                  key={button.text}
                  role="listitem"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Component
                    {...(button.href ? {
                      href: button.href,
                      target: button.isExternal ? '_blank' : undefined,
                      rel: button.isExternal ? 'noopener noreferrer' : undefined
                    } : {
                      onClick: button.onClick,
                      type: 'button' as const
                    })}
                    className={`flex items-center space-x-2 ${button.className} px-6 py-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    aria-label={button.ariaLabel}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                    <span>{button.text}</span>
                  </Component>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="border-t border-gray-800 pt-8" role="region" aria-label="Footer credits and disclaimer">
            <motion.p
              className="text-gray-400 mb-4 flex items-center justify-center"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Made with <Heart className="w-4 h-4 mx-2 text-red-500" fill="currentColor" aria-label="love" /> in India
            </motion.p>
            
            <motion.p
              className="text-gray-500 text-sm mb-2"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Created by <span className="text-orange-400 font-semibold">Pranav Verma</span>
            </motion.p>

            <motion.div
              className="bg-gray-800 rounded-lg p-4 mt-6 max-w-2xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              role="note"
              aria-labelledby="disclaimer-heading"
            >
              <h4 
                id="disclaimer-heading"
                className="text-yellow-400 font-semibold mb-2 flex items-center justify-center"
              >
                ⚠️ Disclaimer
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a personal side project and is still evolving. Features may change, 
                break, or disappear entirely. Remember - 
                it's all about having fun with code! 🚀
              </p>
            </motion.div>

            <motion.p
              className="text-gray-600 text-xs mt-6"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              © {currentYear} BandhuTrackr. Made for fun, shared with love.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;