import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  addressDetails: {
    firstName: string;
    lastName: string;
    street: string;
    street2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    colony: string;
    state: string;
  };
  setAddress: (address: State['addressDetails']) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      addressDetails: {
        firstName: '',
        lastName: '',
        street: '',
        street2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        colony: '',
        state: '',
      },

      setAddress: (address) => {
        set({ addressDetails: address });
      },

      clearAddress: () => {
        set({
          addressDetails: {
            firstName: '',
            lastName: '',
            street: '',
            street2: '',
            postalCode: '',
            city: '',
            country: '',
            phone: '',
            colony: '',
            state: '',
          },
        });
      },
    }),
    {
      name: 'address-details',
    }
  )
);
