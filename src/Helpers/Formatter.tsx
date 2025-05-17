function formatDate(date: Date): string {
  date = new Date(date);
  const pad = (n: number): string => n.toString().padStart(2, '0');

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default formatDate;