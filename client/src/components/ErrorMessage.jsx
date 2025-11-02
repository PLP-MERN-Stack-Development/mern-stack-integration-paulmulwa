const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-error">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
