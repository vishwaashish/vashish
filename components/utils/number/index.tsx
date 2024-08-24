const INTEFER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
});

export const formatNumber = (operand: string) => {
    if (!operand) return;

    const [int, decimal] = operand.split(".");

    const intNumber = parseFloat(int);

    const number = intNumber ? INTEFER_FORMATTER.format(intNumber) : int;

    if (!decimal) {
        return number;
    }

    return `${number}.${decimal}`;
};
