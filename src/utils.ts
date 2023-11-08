export const validate = (response: { ok: boolean }, errorMessage: string): void => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
};

export const createId = (): string => Math.floor(Math.random() * 999999999999).toString();
