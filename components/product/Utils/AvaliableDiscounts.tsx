export interface Props {
  discounts: number[];
}

export default function AvaliableDiscounts ({ discounts }: Props) {
  const diff = discounts.length - 5;
  const init = diff <= 0 ? 0 : diff;
  const text = discounts.sort()
    .reduce((acc, discount, index) => {
      if (index === init) return `${discount}%`;
      return index >= init ? acc + `, ${discount}%` : acc;
    }, '');
  return (
    <div>
      <h4>Descontos de {text}</h4>
    </div>
  );
}
