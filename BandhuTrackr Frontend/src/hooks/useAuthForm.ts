import { useState, useCallback, useMemo } from "react";
import { AUTH_VALIDATION } from "../constants";

interface UseAuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: Record<string, string>) => Promise<void>;
}

interface UseAuthFormReturn {
  formData: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isFormValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearErrors: () => void;
}

export const useAuthForm = ({ mode, onSubmit }: UseAuthFormProps): UseAuthFormReturn => {
  const initialData = useMemo(() => {
    const baseData: Record<string, string> = { email: "", password: "" };
    if (mode === "signup") {
      baseData.name = "";
    }
    return baseData;
  }, [mode]);

  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized validation function
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    // Name validation for signup
    if (mode === "signup") {
      if (!formData.name?.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.length < AUTH_VALIDATION.name.minLength) {
        newErrors.name = `Name must be at least ${AUTH_VALIDATION.name.minLength} characters`;
      }
    }

    // Email validation
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!AUTH_VALIDATION.email.regex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < AUTH_VALIDATION.password.minLength) {
      newErrors.password = `Password must be at least ${AUTH_VALIDATION.password.minLength} characters`;
    }

    return newErrors;
  }, [formData, mode]);

  // Memoized form validity check
  const isFormValid = useMemo(() => {
    const requiredFields =
      mode === "signup" ? ["name", "email", "password"] : ["email", "password"];

    const hasAllRequiredFields = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );

    return hasAllRequiredFields && Object.keys(errors).length === 0;
  }, [formData, errors, mode]);

  // Optimized input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear specific field error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  // Optimized form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      const validationErrors = validateForm();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        try {
          await onSubmit(formData);
        } catch (error) {
          console.error(`${mode} error:`, error);
          // Handle submission error if needed
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
      }
    },
    [formData, isSubmitting, validateForm, onSubmit, mode]
  );

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleSubmit,
    clearErrors,
  };
};
