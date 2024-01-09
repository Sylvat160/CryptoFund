export const daysLeft = (deadline: number): string => {
  const difference: number = new Date(deadline).getTime() - Date.now();
  const remainingDays: number = difference / (1000 * 3600 * 24);
  return Math.ceil(remainingDays).toString();
};

export const calculateBarPercentage = (
  goal: number,
  raisedAmount: number
): number => {
  const percentage: number = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (
  url: string,
  callback: (isImage: boolean) => void
): void => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.onerror = () => alert('Please enter a valid image URL');
};
