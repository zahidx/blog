import Image from "next/image";
import 'animate.css';
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0E1628] to-[#380643] text-white py-24 px-6">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">Welcome to Your Next Favorite Blog</h1>
          <p className="mt-4 text-lg sm:text-xl font-light">Explore captivating stories, insightful posts, and creative ideas from our vibrant community of writers.</p>
          <button className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-full shadow-lg focus:outline-none">
            Start Reading
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Browse by Category</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4e73df] to-[#1f74d7] opacity-70"></div>
              <div className="relative z-10 text-center p-8 text-white">
                <h3 className="text-xl font-semibold">Technology</h3>
                <p className="mt-2 text-sm">Latest tech trends, news, and insights</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fd7e14] to-[#e04c3f] opacity-70"></div>
              <div className="relative z-10 text-center p-8 text-white">
                <h3 className="text-xl font-semibold">Lifestyle</h3>
                <p className="mt-2 text-sm">Health, wellness, and everyday living</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f9ca24] to-[#f39c12] opacity-70"></div>
              <div className="relative z-10 text-center p-8 text-white">
                <h3 className="text-xl font-semibold">Education</h3>
                <p className="mt-2 text-sm">Learning, growth, and skill development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Recent Posts</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Post 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
              <Image
                src="/path/to/your/image.jpg"
                alt="Post Image"
                width={400}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">Post Title 1</h3>
                <p className="mt-2 text-gray-600">A brief description of the blog post goes here, giving users a preview of the content.</p>
                <button className="mt-4 text-indigo-600 hover:underline">Read more</button>
              </div>
            </div>
            {/* Post 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
              <Image
                src="/path/to/your/image.jpg"
                alt="Post Image"
                width={400}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">Post Title 2</h3>
                <p className="mt-2 text-gray-600">A brief description of the blog post goes here, giving users a preview of the content.</p>
                <button className="mt-4 text-indigo-600 hover:underline">Read more</button>
              </div>
            </div>
            {/* Post 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
              <Image
                src="/path/to/your/image.jpg"
                alt="Post Image"
                width={400}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">Post Title 3</h3>
                <p className="mt-2 text-gray-600">A brief description of the blog post goes here, giving users a preview of the content.</p>
                <button className="mt-4 text-indigo-600 hover:underline">Read more</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
