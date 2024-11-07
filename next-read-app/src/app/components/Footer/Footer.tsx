import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#F9F3EE] py-2 px-6 mt-2 h-40 bottom-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2024 MyWebsite. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li>
            <Link href="/about" className="hover:underline">About Us</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
