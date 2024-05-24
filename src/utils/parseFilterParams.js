const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  } else if (typeof isFavourite === 'string') {
    const lowerCaseFavourite = isFavourite.toLowerCase();
    if (lowerCaseFavourite === 'true') {
      return true;
    } else if (lowerCaseFavourite === 'false') {
      return false;
    }
  }
  return undefined;
};

export const parseFilterParams = (query) => {
    if (!query || typeof query !== 'object') {
        throw new Error('Invalid query object provided.');
    }

    const { isFavourite } = query;
    if (isFavourite === undefined || isFavourite === null) {
        throw new Error('isFavourite parameter is required.');
    }

    const parsedIsFavourite = parseIsFavourite(isFavourite);
    if (parsedIsFavourite === undefined) {
        throw new Error('Invalid isFavourite value provided.');
    }

    return { isFavourite: parsedIsFavourite };
};


