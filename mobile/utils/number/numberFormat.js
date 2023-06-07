const _numberFormat = new Intl.NumberFormat('en', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 3,
});

export const numberFormat = (number) => _numberFormat.format(number ?? '0');
