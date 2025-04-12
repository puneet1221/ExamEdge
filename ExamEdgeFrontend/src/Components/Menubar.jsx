import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContext/AppContext';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Menubar = () => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categoriesPerPage = 7;
    const { setSelectedCategory, userDetails } = useAppContext();

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/getAll', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userDetails.token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                setError('Failed to load categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [userDetails]);

    // Calculate the categories to display
    const displayedCategories = categories.slice(
        currentPage * categoriesPerPage,
        (currentPage + 1) * categoriesPerPage
    );

    const handleCategoryClick = (category) => {
        if (!category.subcategory?.length) {
            setSelectedCategory(category.id);
        } else {
            setActiveCategory(activeCategory === category.title ? null : category.title);
        }
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * categoriesPerPage < categories.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (<> <nav className="bg-purple-200  shadow-md">
        <div className="flex">
            <div className="flex space-x-4">
                {displayedCategories.map((category) => (
                    <div key={category.id} className="relative">
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className="text-indigo hover:text-blue-400 px-7 rounded-md font-normal text-md"
                        >
                            {category.title}
                        </button>
                        {Boolean(category.subcategory?.length) && activeCategory === category.title && (
                            <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                {category.subcategory.map((sub) => (
                                    <li
                                        key={sub.id}
                                        onClick={() => setSelectedCategory(sub.id)}
                                        className="block text-gray-700 hover:bg-blue-700 hover:text-white px-4 py-2 text-sm"
                                    >
                                        {sub.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

        </div>

    </nav>

        <div className="absolute right-10 top-12 flex items-center mt-0  space-x-4 mt-4">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="bg-blue-700 text-white rounded-full p-1  hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            >
                <FaChevronLeft />
            </button>

            <button
                onClick={handleNextPage}
                disabled={(currentPage + 1) * categoriesPerPage >= categories.length}
                className="bg-blue-700 text-white rounded-full p-1 hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            >
                <FaChevronRight />
            </button>
        </div>


    </>

    );
};

export default Menubar;
