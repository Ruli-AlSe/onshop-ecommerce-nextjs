import { titleFont } from '@/config/fonts';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Hello world</h1>

      <h1 className={titleFont.className}>Hello world</h1>
    </div>
  );
}
