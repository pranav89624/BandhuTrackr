import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK_TECHNOLOGIES, SECTION_CONTENT } from "../constants";
import type { Technology } from "../constants/types";

const TechStack: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const { techStack } = SECTION_CONTENT;

  return (
    <section className="py-20" aria-labelledby="tech-stack-heading" role="region">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="tech-stack-heading" className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {techStack.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{techStack.subheading}</p>
        </motion.div>

        <div
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          role="list"
          aria-label={techStack.ariaLabel}
        >
          {TECH_STACK_TECHNOLOGIES.map((tech: Technology, index: number) => (
            <motion.div
              key={`${tech.name}-${index}`}
              role="listitem"
              aria-label={tech.ariaLabel}
              className={`${tech.color} text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105`}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
            >
              <span
                className="text-lg"
                aria-hidden="true"
                role="img"
                aria-label={`${tech.name} icon`}
              >
                {tech.icon}
              </span>
              <span className="font-semibold">{tech.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg">{techStack.footer}</p>
        </motion.div>
      </div>
    </section>
  );
});

TechStack.displayName = "TechStack";

export default TechStack;
