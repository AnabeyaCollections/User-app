import { Menu, X } from 'lucide-react';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  FaShoppingCart, FaWhatsapp } from 'react-icons/fa';

const navLinks = [
    { title: 'Home', link: '/' },
    { title: 'Products', link: '/allproducts' },
    { title: 'Orders', link: '/orders' },
    { title: 'Contact', link: '/contact' },
    { title: 'About', link: '/about' },
    { title: 'Reviews', link: '/reviews' },
];

const Navbar = (props) => {
    const [showNavbar, setShowNavbar] = useState(false);

    let navigate = useNavigate();

    const logOut = ()=>{
        localStorage.removeItem('token');
        navigate('/signup')
    }
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };


    return (
        <nav className="fixed bg-white navbar relative h-16 shadow-xl text-black z-100 w-full">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
                {/* logo */}
                <Link to="/" className="flex items-center gap-3">
                    <h1 className='text-2xl'>Anabeya Collections</h1>
                </Link>
                <div className="flex items-center space-x-4">


                    <button className="menu-icon z-50 lg:hidden">
                        {showNavbar ? (
                            <X size={28} onClick={handleShowNavbar} className="" />
                        ) : (
                            <>
                                <div className="flex gap-5">
                                    <Link to="/cart" className="relative text-white hover:text-blue-600">
                                        <FaShoppingCart size={28} className='text-black' />
                                        {props.cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {props.cartCount}
                                            </span>
                                        )}
                                    </Link>

                                    <Menu size={28} onClick={handleShowNavbar} className="" />
                                </div>
                            </>
                        )}
                    </button>

                </div>
                <div
                    className={`nav-elements navbar bg-white fixed inset-0 z-96 h-screen w-screen transform transition-transform duration-300 ease-in-out lg:relative lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:translate-x-0 lg:bg-transparent ${showNavbar ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <ul className="mt-16 flex flex-col space-y-8 px-6 py-6 lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 lg:px-0 text-center items-center">
                        {navLinks.map(({ title, link }, index) => (
                            <li key={index} className="group">
                                <Link
                                    to={link}
                                    className="text-black relative p-2 text-lg font-medium transition-all duration-300 ease-in-out  lg:text-base"
                                    onClick={() => setShowNavbar(false)}>
                                    {title}
                                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                        <div className="mt-4 flex justify-center space-x-4 lg:mt-0 lg:justify-end">
                            <Link to="https://wa.me/923160581732" target="_blank" rel="noopener noreferrer" className="text-black hover:text-green-600">
                              <FaWhatsapp size={28}/>
                            </Link>
                        </div>
                        {!showNavbar && <Link to="/cart" className="relative text-white hover:text-blue-600">
                            <FaShoppingCart size={28} className='text-black' />
                            {props.cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {props.cartCount}
                                </span>
                            )}
                        </Link>}
                        {localStorage.getItem('token')?(<button onClick={logOut} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log Out</button>):(<Link to={'/login'}>
                        
                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log In</button>
                    </Link>)

                    }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
