import Link from "next/link";
import { getAllBrands } from "../server/brands.actions";
import Image from "next/image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function ListedBrands() {
  const response = await getAllBrands();

  return (
    <>
      <section id="brands" className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {response.data.map((brand) => (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="bg-white rounded-lg p-4 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:text-purple-600 hover:scale-105"
              >
                <div className="h-36 w-36 bg-white flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                  <Image
                    width={300}
                    height={300}
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <h3 className="py-1 font-bold">{brand.name}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-purple-600 font-semibold text-sm">View Products</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-purple-600 text-xs ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
