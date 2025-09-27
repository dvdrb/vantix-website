"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface FormField {
  name: string;
  placeholder: string;
  type: "text" | "email";
  validation: (value: string) => string | null;
}

interface EnhancedFormProps {
  onSubmit: (data: Record<string, string>) => void;
  className?: string;
}

const fields: FormField[] = [
  {
    name: "name",
    placeholder: "Numele Personal/ al Companiei",
    type: "text",
    validation: (value) => {
      if (!value.trim()) return "Numele este obligatoriu";
      if (value.trim().length < 2)
        return "Numele trebuie sa aiba cel putin 2 caractere";
      return null;
    },
  },
  {
    name: "email",
    placeholder: "Email Personal/ al Companiei",
    type: "email",
    validation: (value) => {
      if (!value.trim()) return "Emailul este obligatoriu";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Formatul emailului nu este valid";
      return null;
    },
  },
];

const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwEO8DAoj6EPQZzysY75dsF-QJi4S04exZQbzeTVThJVGZ4mVPrvLD8sbv1bAjbcTZ7YQ/exec"; // TODO: set in env

const EnhancedForm = ({ onSubmit, className = "" }: EnhancedFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (field: FormField, value: string) => {
    return field.validation(value);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleInputBlur = (field: FormField) => {
    const value = formData[field.name] || "";
    const error = validateField(field, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [field.name]: error }));
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.name] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const formEl = formRef.current;
        if (!formEl) return;

        const name = (formData["name"] || "").trim();
        const email = (formData["email"] || "").trim();
        const message = ""; // Enhanced form has no message field

        const jsonPayload = {
          name,
          email,
          message,
          source: "enhanced_form",
        };

        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(jsonPayload),
        });

        setSubmitSuccess(true);
        setFormData({});
        onSubmit?.({ name, email });
      } catch (e) {
        console.error("Form submit failed", e);
        setSubmitError("A apărut o eroare la trimitere. Încercați din nou.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNativeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleNativeSubmit}
      action={APPS_SCRIPT_URL}
      method="POST"
      className={`space-y-4 ${className}`}
    >
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            className="rounded-xl px-4 py-3 text-emerald-300 bg-emerald-500/10 border border-emerald-400/20"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            ✓ Mesaj trimis cu succes! Vă vom contacta în curând.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitError && (
          <motion.div
            className="rounded-xl px-4 py-3 text-red-300 bg-red-500/10 border border-red-400/20"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {submitError}
          </motion.div>
        )}
      </AnimatePresence>
      {fields.map((field, index) => (
        <FormInput
          key={field.name}
          field={field}
          value={formData[field.name] || ""}
          error={errors[field.name]}
          isFocused={focusedField === field.name}
          onChange={(value) => handleInputChange(field.name, value)}
          onFocus={() => setFocusedField(field.name)}
          onBlur={() => {
            setFocusedField(null);
            handleInputBlur(field);
          }}
          delay={index * 100}
        />
      ))}

      <SubmitButton
        isSubmitting={isSubmitting}
        isSuccess={submitSuccess}
        disabled={isSubmitting}
      />
    </form>
  );
};

interface FormInputProps {
  field: FormField;
  value: string;
  error?: string;
  isFocused: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  delay: number;
}

const FormInput = ({
  field,
  value,
  error,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  delay,
}: FormInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
    >
      <motion.div
        className={`border rounded-full px-6 py-4 shadow-lg transition-all duration-300 ${
          error
            ? "border-red-400/60"
            : isFocused
            ? "border-cyan-400/60"
            : "border-transparent"
        }`}
        style={{
          background: error
            ? "rgba(248, 113, 113, 0.06)"
            : isFocused
            ? "rgba(146, 232, 241, 0.12)"
            : "rgba(146, 232, 241, 0.06)",
          backdropFilter: "blur(14px) saturate(170%) brightness(96%)",
        }}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        whileHover={{ scale: 1.01 }}
      >
        <input
          ref={inputRef}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full bg-transparent focus:outline-none transition-colors duration-300 ${
            error
              ? "text-red-200 placeholder-red-300"
              : "text-gray-100 placeholder-gray-400"
          }`}
        />
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute left-6 top-full mt-2 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus indicator */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={false}
        animate={{
          boxShadow: isFocused
            ? "0 0 0 2px rgba(146, 232, 241, 0.2), 0 0 20px rgba(146, 232, 241, 0.1)"
            : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

interface SubmitButtonProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  disabled: boolean;
}

const SubmitButton = ({
  isSubmitting,
  isSuccess,
  disabled,
}: SubmitButtonProps) => {
  return (
    <motion.button
      type="submit"
      className={`relative overflow-hidden border rounded-full px-8 py-3 font-medium transition-all w-full md:w-auto ${
        isSuccess
          ? "text-emerald-800 border-emerald-400/60"
          : "text-gray-900 border-white/90"
      }`}
      style={{
        background: isSuccess
          ? "rgba(167, 243, 208, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
      }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
      animate={{
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="loading"
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-4 h-4 border-2 border-gray-700/30 border-t-gray-700 rounded-full animate-spin" />
            <span>Se trimite...</span>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Trimis cu succes!</span>
          </motion.div>
        ) : (
          <motion.span
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Trimite mesaj
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isSubmitting ? "100%" : "-100%" }}
        transition={{
          duration: 1.5,
          repeat: isSubmitting ? Infinity : 0,
          repeatType: "loop",
        }}
        style={{
          clipPath: "polygon(0 0, 100% 0, 85% 100%, -15% 100%)",
        }}
      />
    </motion.button>
  );
};

export default EnhancedForm;
