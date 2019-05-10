export function capitalize(word: string) {
  const firstLetter = word[0].toUpperCase();
  const restOfTheWord = word.substr(1).toLowerCase();
  return `${firstLetter}${restOfTheWord}`;
}
