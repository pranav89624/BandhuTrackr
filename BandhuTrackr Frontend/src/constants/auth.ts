import type { AuthContent } from './types';

// Authentication related constants
export const AUTH_CONTENT: AuthContent = {
  login: {
    heading: "Welcome Back! 👋",
    subheading: "Apne account me login karo",
    fields: {
      email: {
        label: "Email Address",
        placeholder: "your.email@example.com",
        errors: {
          required: "Email toh daal do yaar! 📧",
          invalid: "Sahi email address daalo! 🤔"
        },
        ariaLabel: "Enter your email address for login"
      },
      password: {
        label: "Password",
        placeholder: "••••••••",
        errors: {
          required: "Password bhool gaye? 🔐",
          minLength: "Kam se kam 6 characters toh chahiye! 💪"
        },
        ariaLabel: "Enter your password for login"
      }
    },
    button: {
      text: "Login Karo! 🚀",
      ariaLabel: "Submit login form to access your account"
    },
    toggle: {
      question: "Naya account banana hai?",
      action: "Sign Up karo!"
    }
  },
  signup: {
    heading: "Join the Bandhu Army! 🤝",
    subheading: "Naya account banao aur shuru karo tracking",
    fields: {
      name: {
        label: "Full Name",
        placeholder: "Apna naam likhiye",
        errors: {
          required: "Naam toh batao yaar! 😊",
          minLength: "Poora naam likhiye! 📝"
        },
        ariaLabel: "Enter your full name for account creation"
      },
      email: {
        label: "Email Address",
        placeholder: "your.email@example.com",
        errors: {
          required: "Email address zaroori hai! 📧",
          invalid: "Valid email address daalo! 🤔"
        },
        ariaLabel: "Enter your email address for account creation"
      },
      password: {
        label: "Password",
        placeholder: "Strong password banao",
        errors: {
          required: "Strong password banao! 🔐",
          minLength: "Kam se kam 6 characters toh chahiye! 💪"
        },
        ariaLabel: "Create a strong password for your account"
      }
    },
    button: {
      text: "Account Banao! ✨",
      ariaLabel: "Submit signup form to create your account"
    },
    toggle: {
      question: "Already account hai?",
      action: "Login karo!"
    }
  },
  decoration: {
    login: {
      headline: "Apne the ya nahi?",
      subtitle: "Pata lagane ka time aa gaya! 🕵️‍♂️",
      quote: "Dost ho toh aisa, varna koi jarurat nahi!",
      ariaLabel: "Login page decoration with motivational content"
    },
    signup: {
      headline: "Dosti me OTP bhi chalega!",
      subtitle: "Nayi shururat, naye dost! 🤝",
      quote: "Bandhu banane ka sabse aasan tarika!",
      ariaLabel: "Signup page decoration with welcoming content"
    }
  }
};

// Form validation constants
export const AUTH_VALIDATION = {
  email: {
    regex: /\S+@\S+\.\S+/,
    minLength: 5
  },
  password: {
    minLength: 6
  },
  name: {
    minLength: 2
  }
} as const;

// Animation constants for auth forms
export const AUTH_ANIMATIONS = {
  form: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: 0.2 }
  },
  field: {
    error: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 }
    }
  },
  button: {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }
} as const;
