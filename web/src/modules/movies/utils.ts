export const paginate = (items: any[], size: number, page: number) => {
  const startIdx = (page - 1) * size;
  return items.slice(startIdx, startIdx + size);
};
