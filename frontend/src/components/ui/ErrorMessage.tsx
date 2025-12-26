type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p style={{ color: "red" }}>{message}</p>;
};

export default ErrorMessage;