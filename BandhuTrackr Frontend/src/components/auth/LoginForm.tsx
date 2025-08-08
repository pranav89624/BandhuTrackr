import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, RotateCcw } from "lucide-react";
import { AUTH_CONTENT, AUTH_VALIDATION, AUTH_ANIMATIONS } from "../../constants";

interface LoginFormProps {
  onToggleMode: () => void;
  isAnimating: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isAnimating }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const formId = "login-form";

  // Memoize validation function for better performance
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = AUTH_CONTENT.login.fields.email.errors.required;
    } else if (!AUTH_VALIDATION.email.regex.test(formData.email)) {
      newErrors.email = AUTH_CONTENT.login.fields.email.errors.invalid!;
    }

    if (!formData.password) {
      newErrors.password = AUTH_CONTENT.login.fields.password.errors.required;
    } else if (formData.password.length < AUTH_VALIDATION.password.minLength) {
      newErrors.password = AUTH_CONTENT.login.fields.password.errors.minLength!;
    }

    return newErrors;
  }, [formData.email, formData.password]);

  // Memoize form validity status
  const isFormValid = useMemo(() => {
    return (
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      Object.keys(errors).length === 0
    );
  }, [formData.email, formData.password, errors]);

  useEffect(() => {
    // Auto-focus first input when component mounts
    const timer = setTimeout(() => {
      emailRef.current?.focus();
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
          console.log("Login attempt:", formData);
          // Handle successful login here
        } catch (error) {
          console.error("Login error:", error);
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
      aria-labelledby="login-heading"
    >
      <div className="text-center mb-8">
        <h2 id="login-heading" className="text-3xl font-bold text-gray-800 mb-2">
          {AUTH_CONTENT.login.heading}
        </h2>
        <p className="text-gray-600" aria-describedby="login-heading">
          {AUTH_CONTENT.login.subheading}
        </p>
      </div>

      <form
        id={formId}
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        aria-label="Login form"
      >
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {AUTH_CONTENT.login.fields.email.label}
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              ref={emailRef}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder={AUTH_CONTENT.login.fields.email.placeholder}
              aria-label={AUTH_CONTENT.login.fields.email.ariaLabel}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              required
            />
          </div>
          {errors.email && (
            <motion.p
              id="email-error"
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {AUTH_CONTENT.login.fields.password.label}
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder={AUTH_CONTENT.login.fields.password.placeholder}
              aria-label={AUTH_CONTENT.login.fields.password.ariaLabel}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              autoComplete="current-password"
              required
            />
          </div>
          {errors.password && (
            <motion.p
              id="password-error"
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
              : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105"
          } text-white`}
          whileHover={!isSubmitting && isFormValid ? AUTH_ANIMATIONS.button.hover : {}}
          whileTap={!isSubmitting && isFormValid ? AUTH_ANIMATIONS.button.tap : {}}
          aria-label={AUTH_CONTENT.login.button.ariaLabel}
          aria-describedby="login-status"
        >
          <LogIn className="w-5 h-5" aria-hidden="true" />
          <span>{isSubmitting ? "Logging in..." : AUTH_CONTENT.login.button.text}</span>
        </motion.button>

        {/* Screen reader status */}
        <div id="login-status" className="sr-only" aria-live="polite">
          {isSubmitting ? "Logging you in, please wait..." : ""}
        </div>
      </form>

      {/* Toggle to Signup */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">{AUTH_CONTENT.login.toggle.question}</p>
        <motion.button
          type="button"
          onClick={onToggleMode}
          disabled={isAnimating}
          className={`text-orange-500 hover:text-orange-600 font-semibold flex items-center justify-center space-x-2 mx-auto transition-all duration-200 ${
            isAnimating ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          whileHover={!isAnimating ? { rotate: 5 } : {}}
          whileTap={!isAnimating ? { rotate: -5 } : {}}
          aria-label="Switch to signup form"
        >
          <RotateCcw
            className={`w-4 h-4 ${isAnimating ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          <span>{AUTH_CONTENT.login.toggle.action}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoginForm;
