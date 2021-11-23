export const slugifyString = str => str.split(' ').join('-');

export const asyncHandler = async p => {
  try {
    return [await p, null];
  } catch (err) {
    return [null, err];
  }
};

export const safeRound = n => {
  return Math.round(n * 100) / 100;
};
