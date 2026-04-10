import { z } from 'zod';

export const leadFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  zipCode: z.string().min(5, 'Enter a 5-digit zip code').max(5),
  issueType: z.string().min(1, 'Please select an issue type'),
  roofAge: z.string().min(1, 'Please select roof age'),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};
