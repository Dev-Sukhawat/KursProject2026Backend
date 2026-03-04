export const idagMedTid = (timmar, minuter) => {
  const d = new Date();
  d.setHours(timmar, minuter, 0, 0);
  return d;
};
