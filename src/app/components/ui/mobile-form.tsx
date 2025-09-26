"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useMobileDetection } from "../../hooks/useMobileDetection";

interface MobileFormField {
  name: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "textarea";
  validation: (value: string) => string | null;
}

interface MobileFormProps {
  onSubmit: (data: Record<string, string>) => void;
  className?: string;
}

const fields: MobileFormField[] = [
  {
    name: "name",
    placeholder: "Numele dvs. complet",
    type: "text",
    validation: (value) => {
      if (!value.trim()) return "Numele este obligatoriu";
      if (value.trim().length < 2) return "Numele trebuie sa aiba cel putin 2 caractere";
      return null;
    }
  },
  {
    name: "email",
    placeholder: "Adresa de email",
    type: "email",
    validation: (value) => {
      if (!value.trim()) return "Emailul este obligatoriu";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Formatul emailului nu este valid";
      return null;
    }
  },
  {
    name: "phone",
    placeholder: "Numărul de telefon (opțional)",
    type: "tel",
    validation: () => null
  },
  {
    name: "message",
    placeholder: "Mesajul dvs. (opțional)",
    type: "textarea",
    validation: () => null
  }
];

const MobileForm = ({ onSubmit, className = "" }: MobileFormProps) => {
  const { isMobile, orientation } = useMobileDetection();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const validateField = (field: MobileFormField, value: string) => {
    return field.validation(value);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleInputBlur = (field: MobileFormField) => {
    const value = formData[field.name] || "";
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [field.name]: error }));
    }
  };


  const handleSubmit = async () => {
    const requiredFields = fields.filter(field => field.name === 'name' || field.name === 'email');
    const newErrors: Record<string, string> = {};

    requiredFields.forEach(field => {
      const value = formData[field.name] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSubmit(formData);
        setSubmitSuccess(true);
        setFormData({});
        setTimeout(() => setSubmitSuccess(false), 3000);
      } catch (error) {
        console.error("Submit error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  if (!isMobile) {
    // Return regular form for desktop
    return (
      <div className={className}>
        <div className="space-y-4">
          {fields.map((field) => (
            <MobileFormInput
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
              isMobile={false}
            />
          ))}
          <MobileSubmitButton
            onClick={handleSubmit}
            isSubmitting={isSubmitting}
            isSuccess={submitSuccess}
            disabled={isSubmitting}
            isMobile={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} ${orientation === 'portrait' ? 'px-2' : 'px-4'}`}>
      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
          <div className="text-green-400 font-medium">✓ Mesaj trimis cu succes!</div>
          <div className="text-green-300 text-sm">Vă vom contacta în curând.</div>
        </div>
      )}

      {/* Simple Form Fields */}
      <div className="space-y-4 mb-6">
        {fields.map((field) => (
          <MobileFormInput
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
            isMobile={true}
          />
        ))}
      </div>

      {/* Simple Submit Button */}
      <MobileSubmitButton
        onClick={handleSubmit}
        isSubmitting={isSubmitting}
        isSuccess={submitSuccess}
        disabled={isSubmitting}
        isMobile={true}
      />
    </div>
  );
};

// Mobile-optimized form input component
interface MobileFormInputProps {
  field: MobileFormField;
  value: string;
  error?: string;
  isFocused: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isMobile: boolean;
  autoFocus?: boolean;
}

const MobileFormInput = ({
  field,
  value,
  error,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  isMobile,
  autoFocus
}: MobileFormInputProps) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [autoFocus]);

  const inputClasses = `
    w-full bg-transparent text-white placeholder-gray-400 focus:outline-none
    ${isMobile ? 'text-base py-4 px-4' : 'py-3 px-4'}
  `;

  return (
    <div className="relative">
      <div
        className={`border rounded-xl transition-colors duration-200 ${
          error
            ? "border-red-400/50 bg-red-500/5"
            : isFocused
            ? "border-cyan-400/50 bg-cyan-500/5"
            : "border-gray-600/20 bg-gray-800/10"
        }`}
        style={{
          backdropFilter: "blur(10px)",
          minHeight: isMobile ? "60px" : "50px",
        }}
      >
        <div className="flex items-center">

          {field.type === 'textarea' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              name={field.name}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              className={`${inputClasses} resize-none`}
              rows={isMobile ? 4 : 3}
              style={{ minHeight: isMobile ? '120px' : '80px' }}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              className={inputClasses}
              inputMode={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
            />
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className={`absolute top-full mt-2 text-red-400 text-sm px-2`}>
          {error}
        </div>
      )}
    </div>
  );
};

const MobileSubmitButton = ({
  onClick,
  isSubmitting,
  isSuccess,
  disabled,
  isMobile
}: {
  onClick: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  disabled: boolean;
  isMobile: boolean;
}) => {
  return (
    <button
      className={`w-full rounded-xl font-medium transition-all duration-200 ${
        isMobile ? 'py-4 px-6 text-base' : 'py-3 px-5'
      } ${
        isSuccess
          ? "bg-green-500 text-white"
          : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90"
      } ${disabled ? "opacity-70" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Se trimite...</span>
        </div>
      ) : isSuccess ? (
        <div className="flex items-center justify-center space-x-2">
          <span>✓ Trimis cu succes!</span>
        </div>
      ) : (
        "Trimite mesaj"
      )}
    </button>
  );
};

export default MobileForm;