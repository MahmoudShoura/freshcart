import Link from "next/link";
import { getAllCategories } from "../server/categories.actions";
import Image from "next/image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function ListedCategories() {
  const response = await getAllCategories();

  return (
    <>
      {" "}
      <section className="py-10">
        <div className="container mx-auto">

           <div className="flex items-center gap-3 my-6">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-3xl font-bold text-primary-600">
              Categories
            </h2>
          </div>





          <div className="my-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {response.data.map((category) => (
                <Link
                  href={`/categories/${category._id}`}
                  key={category._id}
                  className="bg-white rounded-2xl shadow-md p-4 text-center border border-gray-200
                  hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:text-emerald-600 hover:scale-105"
                >
                  <div
                    className="h-50 w-50  rounded-2xl bg-white  overflow-hidden 
                    flex items-center justify-center mx-auto mb-3  "
                  >
                    <Image
                      width={500}
                      height={500}
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full  object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="font-extrabold py-1">{category.name}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-emerald-600 font-semibold text-sm">View Products</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-emerald-600 text-xs ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


