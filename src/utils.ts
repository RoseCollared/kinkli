/**
 * Remove all characters that have special meaning in react-hook-form field names
 */
export function sanitizeInputName(str: string) {
  return str.replaceAll(/[\s\-\,\.\[\]/]/g, '');
}
