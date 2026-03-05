import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ReactNode } from 'react';

interface EmptyStateProps {
  // Header
  showBackButton?: boolean;
  onBack?: () => void;
  headerTitle?: string;
  
  // Content
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  helperText?: string;
  
  // Actions
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  
  // Optional custom illustration
  customIllustration?: ReactNode;
}

export function EmptyState({
  showBackButton = false,
  onBack,
  headerTitle,
  icon: Icon,
  iconColor = 'text-teal-600',
  title,
  description,
  helperText,
  primaryAction,
  secondaryAction,
  customIllustration
}: EmptyStateProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
      {/* Header */}
      {(showBackButton || headerTitle) && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center justify-between">
            {showBackButton && onBack ? (
              <button
                onClick={onBack}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Volver"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
            ) : (
              <div />
            )}
            {headerTitle && (
              <h1 className="font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
                {headerTitle}
              </h1>
            )}
            <div className="w-10" />
          </div>
        </div>
      )}

      {/* Main Content - Vertically Centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-sm w-full text-center">
          {/* Illustration/Icon */}
          <div className="mb-6 flex justify-center">
            {customIllustration ? (
              customIllustration
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                <Icon className={`h-12 w-12 ${iconColor}`} />
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h2>

          {/* Description */}
          <p className="text-base text-gray-500 mb-2">
            {description}
          </p>

          {/* Helper Text */}
          {helperText && (
            <p className="text-sm text-gray-400 mb-8">
              {helperText}
            </p>
          )}

          {/* Actions */}
          <div className="space-y-3 mt-8">
            <Button
              onClick={primaryAction.onClick}
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium"
            >
              {primaryAction.label}
            </Button>

            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
