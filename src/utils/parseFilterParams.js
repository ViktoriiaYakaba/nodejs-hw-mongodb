const parseIsFavourite = (isFavourite) => {
   if (typeof isFavourite === 'boolean') {
      const favourite = isFavourite;
    if (favourite=== 'true') {
      return true;
    } else if (favourite === 'false') {
      return false;
    }
  }
};

export const parseFilterParams = (query) => {
    const { isFavourite } = query;
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    return { isFavourite: parsedIsFavourite };
};


