import { titleFont } from '@/config/fonts';

export default function Home() {
  return (
    <div>
      <h1>Hello world</h1>

      <h1 className={titleFont.className}>Hello world</h1>
    </div>
  );
}
