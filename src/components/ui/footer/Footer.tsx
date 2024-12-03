import Link from 'next/link';

import { titleFont } from '@/config/fonts';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10 px-3">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>OnShop</span>
        <span> | E-commerce </span>
        <span>&copy; {new Date().getFullYear()}</span>
      </Link>

      <Link href="#" className="mx-3">
        Privacy Pollicy
      </Link>
      <Link href="#" className="mx-3">
        Terms and conditions
      </Link>
      <Link href="#" className="mx-3">
        Locations
      </Link>
    </div>
  );
};
