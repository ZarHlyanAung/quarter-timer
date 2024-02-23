import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  type?: string; // Optional type of the input (text, password, etc.)
  label: string; // The label text
  required?: boolean; // Whether the input is required
  onFocus?: () => void; // Optional callback for onFocus event
  // Add more props as needed for styling or functionality
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  required,
  onFocus,
  ...props
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleFocus = () => {
    labelRef.current?.animate({
      transition: {
        duration: 0.4,
        delayChildren: 0.05,
      },
      y: -30,
    });
    onFocus?.();
  };

  return (
    <div className="form-control">
      <motion.input
        type={type}
        required={required}
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.1 }}
        onFocus={handleFocus}
        {...props}
      />
      <motion.label
        ref={labelRef} // Use labelRef for animation
        initial={{ y: 15 }}
        animate={{ y: -30, transition: { duration: 0.4 } }}
      >
        {label}
        <span style={{ transitionDelay: 0 }}>E</span>
        <span style={{ transitionDelay: 50 }}>m</span>
        <span style={{ transitionDelay: 100 }}>a</span>
        <span style={{ transitionDelay: 150 }}>i</span>
        <span style={{ transitionDelay: 200 }}>l</span>
      </motion.label>
    </div>
  );
};

export default Input;
