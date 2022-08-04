export function selectGender(gender: string): string {
  const genders: { [key: string]: string } = {
    male: 'Masculino',
    female: 'Feminino',
  }

  if (gender) {
    return genders[gender]
  }

  return ''
}
