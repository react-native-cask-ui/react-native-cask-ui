type TPlainStyledObject = { [key: string]: unknown };

function colorTokenHandler(obj: TPlainStyledObject, palette: { [key: string]: string }): TPlainStyledObject {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    if (typeof value === 'string' && value.startsWith('palette')) {
      const color = value.split('.')[1];
      newObj[key] = palette?.[color] || value;
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = colorTokenHandler(value as TPlainStyledObject, palette);
    } else {
      newObj[key] = value;
    }
    return newObj;
  }, {} as TPlainStyledObject);
}

export default colorTokenHandler;
