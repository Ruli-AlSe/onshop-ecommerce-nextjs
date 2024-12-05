import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  addressDetails: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
  setAddress: (address: State['addressDetails']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      addressDetails: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
      },

      setAddress: (address) => {
        set({ addressDetails: address });
      },
    }),
    {
      name: 'address-details',
    }
  )
);
