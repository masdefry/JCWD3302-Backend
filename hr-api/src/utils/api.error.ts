export function APIError(message: string, statusCode: number = 500) {
  const error = new Error(message) as Error & {
    statusCode: number;
    isExpose: boolean;
  };

  error.statusCode = statusCode;
  error.isExpose = true;

  return error;
}