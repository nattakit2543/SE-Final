import * as Sentry from "@sentry/react";

const handleError = (error, info = {}) => {
  console.error(`Error: ${error}. Info:`, info);
  Sentry.captureException(error, { extra: info });
};

export default handleError;
