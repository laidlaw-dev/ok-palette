interface OkValidationMessageProps {
  message: string;
}

export const OkValidationMessage = ({ message }: OkValidationMessageProps) => {
  return <div className="text-error-text text-xs">{message}</div>;
};
