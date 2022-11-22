export const validate = (response: { ok: boolean }, errorMessage: string): void => {
  if (!response.ok) {
    throw new Error(errorMessage)
  }
}
