import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BANDHU_TRACKR_BENEFITS, SECTION_CONTENT } from '../constants';
import type { Benefit } from '../constants/types';

const WhyBandutrachkr: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const { whyBandhuTrackr } = SECTION_CONTENT;

  return (
    <section 
      className="py-20"
      aria-labelledby="why-bandutrachkr-heading"
      role="region"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            id="why-bandutrachkr-heading"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            {whyBandhuTrackr.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {whyBandhuTrackr.subheading}
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          role="list"
          aria-label={whyBandhuTrackr.ariaLabel}
        >
          {BANDHU_TRACKR_BENEFITS.map((benefit: Benefit, index: number) => {
            const BenefitIcon = benefit.icon;
            
            return (
              <motion.div
                key={index}
                role="listitem"
                aria-label={benefit.ariaLabel}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                    aria-hidden="true"
                  >
                    <BenefitIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 italic">
            "Dost ho toh aisa, varna koi jarurat nahi!" 💪
          </p>
        </motion.div>
      </div>
    </section>
  );
});

WhyBandutrachkr.displayName = 'WhyBandutrachkr';

export default WhyBandutrachkr;