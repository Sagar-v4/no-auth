export function query$or(arr: Array<Object>): Object {
  const queryConditions = {};

  arr.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!queryConditions[key]) {
        queryConditions[key] = [];
      }
      if (!queryConditions[key].includes(item[key])) {
        queryConditions[key].push(item[key]);
      }
    });
  });

  const query = {
    $or: Object.keys(queryConditions).map((key) => ({
      [key]: { $in: queryConditions[key] },
    })),
  };

  return query;
}

export function query$and(arr: Array<Object>): Object {
  const queryConditions = {};

  arr.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!queryConditions[key]) {
        queryConditions[key] = [];
      }
      if (!queryConditions[key].includes(item[key])) {
        queryConditions[key].push(item[key]);
      }
    });
  });

  const query = {
    $and: Object.keys(queryConditions).map((key) => ({
      [key]: { $in: queryConditions[key] },
    })),
  };

  return query;
}
