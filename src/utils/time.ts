
export function toISO(date: Date): string {
  return date.toISOString();
}

export function toDate(dateString: string): Date {
  return new Date(dateString)
}
