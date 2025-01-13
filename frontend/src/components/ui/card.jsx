import React from 'react';
import { cn } from "../../lib/utils"


export const Card = ({ children, className }) => {
  return (
    <div className={`card shadow-md rounded-lg bg-white p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }) => {
    return <h3 className={`card-title text-lg font-semibold ${className}`}>{children}</h3>;
  };
  
export const CardHeader = ({ title, description, className }) => {
  return (
    <div className={`card-header mb-4 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={`card-content text-gray-700 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className }) => {
  return <div className={`card-footer mt-4 ${className}`}>{children}</div>;
};
