export function secondsToMinutes(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const secondsRemainder: number = seconds % 60;
  const formattedMinutes: string = minutes.toString().padStart(2, "0");
  const formattedSeconds: string = secondsRemainder.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function addApiUrlToPath(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}
