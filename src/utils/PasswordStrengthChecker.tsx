import { FC, useMemo } from "react";

interface PasswordStrengthProps {
  password: string;
  showLabel?: boolean;
}

interface StrengthResult {
  strength:
    | "Enter a password"
    | "Very Weak"
    | "Weak"
    | "Fair"
    | "Good"
    | "Strong"
    | "Very Strong";
  score: number;
  color: string;
  percentage: number;
}

// Function to calculate password strength
export const calculatePasswordStrength = (password: string): StrengthResult => {
  let score = 0;

  if (!password) {
    return {
      strength: "Enter a password",
      score: 0,
      color: "bg-red-600",
      percentage: 0,
    };
  }

  // Check if password contains only English characters
  if (!/[^\x00-\x7F]/.test(password)) score += 1;

  // Length check
  if (password.length >= 8) score += 1;

  // Uppercase letters
  if (/[A-Z]/.test(password)) score += 1;

  // Lowercase letters
  if (/[a-z]/.test(password)) score += 1;

  // Numbers
  if (/\d/.test(password)) score += 1;

  // Special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;

  // Determine strength level and color based on score out of 6
  let strength:
    | "Enter a password"
    | "Very Weak"
    | "Weak"
    | "Fair"
    | "Good"
    | "Strong"
    | "Very Strong" = "Enter a password";
  let color = "bg-red-600";
  let percentage = 0;

  if (score === 1) {
    strength = "Very Weak";
    color = "bg-red-600";
    percentage = 16;
  } else if (score === 2) {
    strength = "Weak";
    color = "bg-red-500";
    percentage = 33;
  } else if (score === 3) {
    strength = "Fair";
    color = "bg-orange-500";
    percentage = 50;
  } else if (score === 4) {
    strength = "Good";
    color = "bg-yellow-500";
    percentage = 66;
  } else if (score === 5) {
    strength = "Strong";
    color = "bg-lime-500";
    percentage = 83;
  } else if (score === 6) {
    strength = "Very Strong";
    color = "bg-green-500";
    percentage = 100;
  }

  return {
    strength,
    score,
    color,
    percentage,
  };
};

export default function PasswordStrengthChecker({
  password,
  showLabel = true,
}: PasswordStrengthProps) {
  const strengthResult = useMemo(
    () => calculatePasswordStrength(password),
    [password],
  );

  const hasNonEnglish = /[^\x00-\x7F]/.test(password);

  const getRequirementStatus = (met: boolean) => {
    return met ? "text-green-500" : "text-gray-400";
  };

  const requirements = [
    {
      label: "English characters only",
      met: !/[^\x00-\x7F]/.test(password),
    },
    {
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      label: "Uppercase letter (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter (a-z)",
      met: /[a-z]/.test(password),
    },
    {
      label: "Number (0-9)",
      met: /\d/.test(password),
    },
    {
      label: "Special character (!@#$%^&*)",
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];

  return (
    <div className="space-y-3">
      {/* Non-English Character Alert */}
      {hasNonEnglish && (
        <div className="bg-red-50 border border-red-300 rounded p-2.5 flex items-center gap-2">
          <span className="text-red-600 text-sm font-medium">
            ⚠️ Password must contain English characters only!
          </span>
        </div>
      )}

      {/* Strength Bar */}
      <div className="flex gap-2 items-center">
        <div className="bar grow h-1 rounded-md overflow-hidden bg-gray-200">
          <div
            className={`progress ${strengthResult.color} h-full transition-all duration-300 ease-in-out`}
            style={{ width: `${strengthResult.percentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-700 min-w-fit">
          {strengthResult.strength}
        </span>
      </div>

      {/* Requirements Checklist */}
      {showLabel && password && (
        <div className="text-xs space-y-1.5 bg-gray-50 p-2.5 rounded border border-gray-200">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                  requirement.met ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span className={getRequirementStatus(requirement.met)}>
                {requirement.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
