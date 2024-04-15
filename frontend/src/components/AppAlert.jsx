export default function AppAlert({ message, variant }) {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}