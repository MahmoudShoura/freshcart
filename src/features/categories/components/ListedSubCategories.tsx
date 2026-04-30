import Link from "next/link";
import { getAllSubCategories } from "../server/subcategories.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function ListedSubCategories() {
  const response = await getAllSubCategories();

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 my-2">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-3xl font-bold text-primary-600">
              Sub<span className="text-gray-900"> Categories</span>
            </h2>
          </div>

          <div className="my-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {response.data.map((subcategory) => (
                <Link
                  href={`/categories/subcategory/${subcategory._id}`}
                  key={subcategory._id}
                  className="bg-white rounded-2xl shadow-md p-8 text-start border border-gray-200
                  hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:text-emerald-600 hover:scale-105"
                >
                  <div
                    className="h-14 w-14 rounded-2xl bg-primary-100
                    flex items-center justify-center  mb-3 transition-all duration-300 group-hover:bg-primary-200"
                  >
                    <div className="text-2xl font-bold text-primary-500 ">
                      <FontAwesomeIcon icon={faFolderOpen} />
                    </div>
                  </div>

                  <h3 className="font-extrabold py-1">{subcategory.name}</h3>
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
