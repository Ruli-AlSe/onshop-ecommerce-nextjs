'use client';

import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductImage } from '@/components/products/product-image/ProductImage';

import './slideshow.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface Props {
  images: { url: string; id: number }[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ width: '100vw', height: '500px' }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.url}>
            <ProductImage
              src={image.url}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
