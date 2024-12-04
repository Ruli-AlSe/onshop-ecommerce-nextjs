import clsx from 'clsx';

import { Size } from '@/seed/seed';

interface Props {
  sizeSelected?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ sizeSelected, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available sizes</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
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
