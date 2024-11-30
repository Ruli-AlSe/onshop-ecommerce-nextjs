import clsx from 'clsx';

import { Size } from '@/seed/seed';

interface Props {
  sizeSelected: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({ sizeSelected, availableSizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available sizes</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 hover:underline text-lg', {
              underline: size === sizeSelected,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
