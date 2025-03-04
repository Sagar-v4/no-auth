export function concatIds(
  newIds: Array<string | undefined>,
  arrOfIds: Array<string>,
): Array<string> {
  return newIds.filter((id) => id !== undefined).concat(arrOfIds);
}
