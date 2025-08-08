import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, RotateCcw } from "lucide-react";
import { AUTH_CONTENT, AUTH_VALIDATION, AUTH_ANIMATIONS } from "../../constants";

interface SignupFormProps {
  onToggleMode: () => void;
  isAnimating: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode, isAnimating }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const formId = "signup-form";

  // Memoize validation function for better performance
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = AUTH_CONTENT.signup.fields.name.errors.required;
    } else if (formData.name.length < AUTH_VALIDATION.name.minLength) {
      newErrors.name = AUTH_CONTENT.signup.fields.name.errors.minLength!;
    }

    if (!formData.email) {
      newErrors.email = AUTH_CONTENT.signup.fields.email.errors.required;
    } else if (!AUTH_VALIDATION.email.regex.test(formData.email)) {
      newErrors.email = AUTH_CONTENT.signup.fields.email.errors.invalid!;
    }

    if (!formData.password) {
      newErrors.password = AUTH_CONTENT.signup.fields.password.errors.required;
    } else if (formData.password.length < AUTH_VALIDATION.password.minLength) {
      newErrors.password = AUTH_CONTENT.signup.fields.password.errors.minLength!;
    }

    return newErrors;
  }, [formData.name, formData.email, formData.password]);

  // Memoize form validity status
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      Object.keys(errors).length === 0
    );
  }, [formData.name, formData.email, formData.password, errors]);

  useEffect(() => {
    // Auto-focus first input when component mounts
    const timer = setTimeout(() => {
      nameRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      const validationErrors = validateForm();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log("Signup attempt:", formData);
          // Handle successful signup here
        } catch (error) {
          console.error("Signup error:", error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, isSubmitting]
  );

  return (
    <motion.div
      className="w-full max-w-md"
      initial={AUTH_ANIMATIONS.form.initial}
      animate={AUTH_ANIMATIONS.form.animate}
      transition={AUTH_ANIMATIONS.form.transition}
      role="main"
      aria-labelledby="signup-heading"
    >
      <div className="text-center mb-8">
        <h2 id="signup-heading" className="text-3xl font-bold text-gray-800 mb-2">
          {AUTH_CONTENT.signup.heading}
        </h2>
        <p className="text-gray-600" aria-describedby="signup-heading">
          {AUTH_CONTENT.signup.subheading}
        </p>
      </div>

      <form
        id={formId}
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        aria-label="Signup form"
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {AUTH_CONTENT.signup.fields.name.label}
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              ref={nameRef}
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder={AUTH_CONTENT.signup.fields.name.placeholder}
              aria-label={AUTH_CONTENT.signup.fields.name.ariaLabel}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              autoComplete="name"
              required
            />
          </div>
          {errors.name && (
            <motion.p
              id="name-error"
              className="text-red-500 text-sm mt-1"
              initial={AUTH_ANIMATIONS.field.error.initial}
              animate={AUTH_ANIMATIONS.field.error.animate}
              role="alert"
              aria-live="polite"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
            {AUTH_CONTENT.signup.fields.email.label}
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder={AUTH_CONTENT.signup.fields.email.placeholder}
              aria-label={AUTH_CONTENT.signup.fields.email.ariaLabel}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              autoComplete="email"
              required
            />
          </div>
          {errors.email && (
            <motion.p
              id="signup-email-error"
              className="text-red-500 text-sm mt-1"
              initial={AUTH_ANIMATIONS.field.error.initial}
              animate={AUTH_ANIMATIONS.field.error.animate}
              role="alert"
              aria-live="polite"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
            {AUTH_CONTENT.signup.fields.password.label}
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder={AUTH_CONTENT.signup.fields.password.placeholder}
              aria-label={AUTH_CONTENT.signup.fields.password.ariaLabel}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "signup-password-error" : undefined}
              autoComplete="new-password"
              required
            />
          </div>
          {errors.password && (
            <motion.p
              id="signup-password-error"
              className="text-red-500 text-sm mt-1"
              initial={AUTH_ANIMATIONS.field.error.initial}
              animate={AUTH_ANIMATIONS.field.error.animate}
              role="alert"
              aria-live="polite"
            >
              {errors.password}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 ${
            isSubmitting || !isFormValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transform hover:scale-105"
          } text-white`}
          whileHover={!isSubmitting && isFormValid ? AUTH_ANIMATIONS.button.hover : {}}
          whileTap={!isSubmitting && isFormValid ? AUTH_ANIMATIONS.button.tap : {}}
          aria-label={AUTH_CONTENT.signup.button.ariaLabel}
          aria-describedby="signup-status"
        >
          <UserPlus className="w-5 h-5" aria-hidden="true" />
          <span>{isSubmitting ? "Creating account..." : AUTH_CONTENT.signup.button.text}</span>
        </motion.button>

        {/* Screen reader status */}
        <div id="signup-status" className="sr-only" aria-live="polite">
          {isSubmitting ? "Creating your account, please wait..." : ""}
        </div>
      </form>

      {/* Toggle to Login */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">{AUTH_CONTENT.signup.toggle.question}</p>
        <motion.button
          type="button"
          onClick={onToggleMode}
          disabled={isAnimating}
          className={`text-green-500 hover:text-green-600 font-semibold flex items-center justify-center space-x-2 mx-auto transition-all duration-200 ${
            isAnimating ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          whileHover={!isAnimating ? { rotate: -5 } : {}}
          whileTap={!isAnimating ? { rotate: 5 } : {}}
          aria-label="Switch to login form"
        >
          <RotateCcw
            className={`w-4 h-4 ${isAnimating ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          <span>{AUTH_CONTENT.signup.toggle.action}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SignupForm;
