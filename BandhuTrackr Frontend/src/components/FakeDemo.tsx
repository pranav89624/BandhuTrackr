import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, X, User } from 'lucide-react';
import { DEMO_MOCK_DATA, SECTION_CONTENT } from '../constants';
import type { MockUser } from '../constants/types';

const FakeDemo: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const { demo } = SECTION_CONTENT;

  return (
    <section 
      className="py-20"
      aria-labelledby="demo-heading"
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
            id="demo-heading"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            {demo.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            {demo.subheading}
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.8 }}
          viewport={{ once: true }}
          role="application"
          aria-label={demo.ariaLabels?.dashboard}
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <User className="w-6 h-6 mr-2" aria-hidden="true" />
              {demo.tableTitle}
            </h3>
          </div>

          <div className="overflow-x-auto" role="region" aria-label={demo.ariaLabels?.table}>
            <table 
              className="w-full"
              role="table"
              aria-label={demo.ariaLabels?.tableDescription}
            >
              <thead className="bg-gray-50">
                <tr role="row">
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    scope="col"
                  >
                    Username
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    scope="col"
                  >
                    Status
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    scope="col"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {DEMO_MOCK_DATA.map((user: MockUser, index: number) => (
                  <motion.tr
                    key={`${user.username}-${index}`}
                    role="row"
                    aria-label={user.ariaLabel}
                    className="hover:bg-gray-50 transition-colors duration-200"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    transition={prefersReducedMotion ? {} : { duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" role="cell">
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3"
                          aria-hidden="true"
                        >
                          <span className="text-white text-sm font-bold">
                            {user.username.charAt(1).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-gray-900 font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" role="cell">
                      {user.status === 'followed' ? (
                        <span 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                          aria-label={`${user.username} is still following you`}
                        >
                          <Check className="w-4 h-4 mr-1" aria-hidden="true" />
                          Still Following
                        </span>
                      ) : (
                        <span 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                          aria-label={`${user.username} has unfollowed you`}
                        >
                          <X className="w-4 h-4 mr-1" aria-hidden="true" />
                          Unfollowed You
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" role="cell">
                      {user.status === 'unfollowed' && (
                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-label={`Unfollow ${user.username} back in response to them unfollowing you`}
                          type="button"
                        >
                          Unfollow Back 💔
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-gray-600 text-sm italic">
              "Revenge is a dish best served... systematically!" 😏
            </p>
          </div>
        </motion.div>
        <div className="flex justify-center mt-8">
        <p className="text-sm text-gray-500 mt-6 italic">*Disclaimer: This is just a mock-up. Actual results may be more heartbreaking.</p>
        </div>

      </div>
    </section>
  );
});

FakeDemo.displayName = 'FakeDemo';

export default FakeDemo;