export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const textTruncate = (string, maxLenght) => {
  const ending = '...';
  if (string.length > maxLenght) {
    return string.substring(0, maxLenght - ending.length) + ending;
  } else {
    return string;
  }
};
