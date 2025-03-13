import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  src: any;
  alt: string;
  title: string;
  description: string;
  url: string;
}

interface ScreenListProps {
  title: string;
  products: Product[];
}
const ScreenList = ({ title, products }: ScreenListProps) => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            <Link href={item.url} className="block h-full w-full">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={item.id === 1}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="mb-1 translate-y-4 transform text-lg font-bold transition-transform duration-300 group-hover:translate-y-0">
                      {item.title}
                    </h3>
                    <p className="translate-y-4 transform text-sm opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.description}
                    </p>
                    <span className="mt-2 inline-block translate-y-4 transform rounded-full bg-white px-4 py-1 text-sm text-black opacity-0 transition-all delay-200 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      구매하기 →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScreenList;
