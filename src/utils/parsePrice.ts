export const parsePrice = (price: number) => {
    return price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    });
}