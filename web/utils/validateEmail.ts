export default function validateEmail(value: string): boolean {
  if (typeof value !== 'string') {
    return false
  }
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value,
    )
  ) {
    return true
  }
  return false
}
