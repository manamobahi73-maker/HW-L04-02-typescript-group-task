export const isDeadlineUrgent = (deadline: string): boolean => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  return hoursDiff <= 24 && hoursDiff > 0;
};

export const formatTimeRemaining = (deadline: string): string => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate.getTime() - now.getTime();

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
};
