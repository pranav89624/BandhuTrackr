import React from "react";

// Type definitions for constant data structures

export interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgGradient: string;
  stepGradient: string;
  ariaLabel: string;
}

export interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  ariaLabel: string;
}

export interface Technology {
  name: string;
  color: string;
  icon: string;
  ariaLabel: string;
}

export interface MockUser {
  username: string;
  status: "followed" | "unfollowed";
  days: number;
  ariaLabel: string;
}

export interface SectionContent {
  heading: string;
  subheading: string;
  ariaLabel: string;
  footer?: string;
  tableTitle?: string;
  ariaLabels?: {
    dashboard?: string;
    table?: string;
    tableDescription?: string;
  };
}

export interface AnimationConfig {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  transition: { duration: number };
  viewport: { once: boolean };
  stagger: { delay: number };
  hover: {
    scale: number;
    y: number;
  };
}

// Auth related types
export interface AuthContent {
  login: {
    heading: string;
    subheading: string;
    fields: {
      email: AuthField;
      password: AuthField;
    };
    button: {
      text: string;
      ariaLabel: string;
    };
    toggle: {
      question: string;
      action: string;
    };
  };
  signup: {
    heading: string;
    subheading: string;
    fields: {
      name: AuthField;
      email: AuthField;
      password: AuthField;
    };
    button: {
      text: string;
      ariaLabel: string;
    };
    toggle: {
      question: string;
      action: string;
    };
  };
  decoration: {
    login: DecorationContent;
    signup: DecorationContent;
  };
}

export interface AuthField {
  label: string;
  placeholder: string;
  errors: {
    required: string;
    invalid?: string;
    minLength?: string;
  };
  ariaLabel: string;
}

export interface DecorationContent {
  headline: string;
  subtitle: string;
  quote: string;
  ariaLabel: string;
}
