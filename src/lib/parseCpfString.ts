export function parseCpf(value: string, originalValue: string) {
  if (!originalValue) return ''

  const parsedCpf = originalValue.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/g,
    '$1.$2.$3-$4',
  )

  return parsedCpf
}
