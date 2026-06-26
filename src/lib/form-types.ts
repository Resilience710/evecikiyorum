export interface FormState {
  ok: boolean;
  /** başarıyla oluşturulan ilanın id'si */
  id?: string;
  /** alan adı -> hata mesajı */
  errors?: Record<string, string>;
  /** hata sonrası formu yeniden doldurmak için girilen değerler */
  values?: Record<string, string>;
  /** forma özel genel hata (rate-limit, captcha vb.) */
  formError?: string;
}

export const initialFormState: FormState = { ok: false };
