'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  let currentPage = isNaN(+pageString) ? 1 : +pageString;
  if (currentPage <= 1) currentPage = 1;

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav>
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              href={createPageUrl(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={clsx(
                'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                {
                  'pointer-events-none': currentPage <= 1,
                }
              )}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((page, idx) => (
            <li key={`${page} - ${idx}`} className="page-item">
              <Link
                href={createPageUrl(page)}
                className={clsx(
                  'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                  {
                    'bg-blue-600 shadow-sm text-white hover:bg-blue-700 hover:text-white':
                      page === currentPage,
                  }
                )}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              href={createPageUrl(currentPage + 1)}
              className={clsx(
                'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                {
                  'pointer-events-none': currentPage >= totalPages,
                }
              )}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
