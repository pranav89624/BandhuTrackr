import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOW_IT_WORKS_STEPS, SECTION_CONTENT } from "../constants";
import type { Step } from "../constants/types";

const HowItWorks: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const { howItWorks } = SECTION_CONTENT;

  return (
    <section
      id="how-it-works"
      className="py-20"
      aria-labelledby="how-it-works-heading"
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
            id="how-it-works-heading"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            {howItWorks.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{howItWorks.subheading}</p>
        </motion.div>

        <div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          role="list"
          aria-label={howItWorks.ariaLabel}
        >
          {HOW_IT_WORKS_STEPS.map((step: Step, index: number) => {
            const StepIcon = step.icon;

            return (
              <motion.div
                key={index}
                role="listitem"
                aria-label={step.ariaLabel}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.bgGradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={prefersReducedMotion ? {} : { duration: 0.8 }}
                    aria-hidden="true"
                  >
                    <StepIcon className={`w-10 h-10 ${step.color}`} />
                  </motion.div>
                  <div
                    className={`absolute -top-10 -right-10 w-8 h-8 rounded-full bg-gradient-to-r ${step.stepGradient} text-white flex items-center justify-center font-bold text-sm`}
                    aria-label={`Step ${index + 1}`}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

HowItWorks.displayName = "HowItWorks";

export default HowItWorks;
