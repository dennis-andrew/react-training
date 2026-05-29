const currencyFormatter = new Intl.NumberFormat("en-IN");

const formatPrice = (price: number) => `Rs. ${currencyFormatter.format(price)}`;

export default formatPrice;
