export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
};
