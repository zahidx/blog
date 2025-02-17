import Link from 'next/link';
import { FaTwitter, FaFacebook, FaGithub, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 pt-16 pl-6 pr-6">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12"> {/* Reduced gap */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
  

  {/* Quick Links */}
  <div className="flex justify-between items-center w-full">
  {/* Quick Links */}
  <div className="w-full pl-40 md:w-1/4 text-center md:text-left">
    <h4 className="text-lg font-semibold text-yellow-400">Links</h4>
    <ul className="space-y-2 text-gray-400">
      <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
      <li><Link href="/projects" className="hover:text-yellow-400">Projects</Link></li>
      <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
      <li><Link href="/blog" className="hover:text-yellow-400">Blog</Link></li>
    </ul>
  </div>
</div>

</div>

          {/* Social Media */}
          <div className="space-y-4 w-full md:w-1/4">
            <h4 className="text-lg font-semibold text-yellow-400 text-center">Follow Me</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Row 1 */}
              <div className="w-full md:w-1/2 flex justify-center space-x-6">
                <Link href="https://twitter.com" target="_blank" className="hover:text-blue-500">
                  <FaTwitter className="text-3xl" />
                </Link>
                <Link href="https://facebook.com" target="_blank" className="hover:text-blue-600">
                  <FaFacebook className="text-3xl" />
                </Link>
                <Link href="https://github.com" target="_blank" className="hover:text-yellow-400">
                  <FaGithub className="text-3xl" />
                </Link>
              </div>
              {/* Row 2 */}
              <div className="w-full md:w-1/2 flex justify-center space-x-6">
                <Link href="https://youtube.com" target="_blank" className="hover:text-red-600">
                  <FaYoutube className="text-3xl" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
                  <FaLinkedin className="text-3xl" />
                </Link>
                <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
                  <FaInstagram className="text-3xl" />
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 w-full md:w-1/4">
            <h4 className="text-lg font-semibold text-yellow-400">Newsletter</h4>
            <p className="text-gray-400">Stay updated with the latest news and articles.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-l-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-r-lg hover:bg-yellow-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Zahidul Islam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
