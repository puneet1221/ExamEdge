import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Components/AppContext/AppContext';

const CreateCategory = () => {
    const { userDetails } = useAppContext();
    const [categoryMsg, setCategoryMsg] = useState('');
    const [parentCategory, setParentCategory] = useState([]);
    const [categoryData, setCategoryData] = useState({
        title: '',
        description: '',
    });
    const [subcategoryData, setSubcategoryData] = useState({
        parentId: '',
        title: '',
        description: '',
    });

    // Fetch Parent Categories
    useEffect(() => {
        axios
            .get('http://localhost:8080/category/getAll', {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`,
                },
            })
            .then((response) => {
                setParentCategory(response.data);
            })
            .catch((error) => console.error('Error loading categories:', error));
    }, [userDetails.token]);

    // Handle Input Changes
    const handleInputChange = (setter) => (e) => {
        setter((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Add Category
    const addCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8080/category/',
                categoryData,
                {
                    headers: {

                        "Authorization": `Bearer ${userDetails.token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            setCategoryMsg('✅ Category added successfully!');
            setCategoryData({ title: '', description: '' });
        } catch {
            setCategoryMsg('❌ Error adding category!');
        }
    };

    // Add Subcategory
    const addSubcategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:8080/category/addSubcategory/${subcategoryData.parentId}`,
                subcategoryData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userDetails.token}`,
                    },
                }
            );
            setCategoryMsg('✅ Subcategory added successfully!');
            setSubcategoryData({ parentId: '', title: '', description: '' });
        } catch {
            setCategoryMsg('❌ Error adding subcategory!');
        }
    };

    // Delete Category
    const deleteCategory = async (e) => {
        e.preventDefault();
        if (!subcategoryData.parentId) {
            setCategoryMsg('❌ Please select a category to delete!');
            return;
        }
        try {
            console.log(subcategoryData.parentId);
            await axios.delete(
                `http://localhost:8080/category/${subcategoryData.parentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userDetails.token}`,
                    },
                }
            );
            setCategoryMsg('✅ Category deleted successfully!');
            setSubcategoryData({ parentId: '' });

            // Reload categories
            const response = await axios.get('http://localhost:8080/category/getAll', {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`,
                },
            });
            setParentCategory(response.data);
        } catch {
            setCategoryMsg('❌ Error deleting category!');
        }
    };

    return (
        <div className="p-10 min-h-screen bg-gradient-to-r from-purple-10 to-white-900 text-white">
            <h1 className="text-5xl font-bold text-center mb-10 ">
                <span className=" text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
                    Manage Categories
                </span>
            </h1>

            {categoryMsg && (
                <p className="text-center text-m text-blue-800 font-semibold mt-6 ">
                    {categoryMsg}
                </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Category Form */}
                <FormCard title="Add New Category" color="purple" onSubmit={addCategory}>
                    <InputField
                        label="Category Title"
                        name="title"
                        value={categoryData.title}
                        onChange={handleInputChange(setCategoryData)}
                        placeholder="Enter category title"
                    />

                    <TextAreaField
                        label="Description"
                        name="description"
                        value={categoryData.description}
                        onChange={handleInputChange(setCategoryData)}
                        placeholder="Enter category description"
                    />

                    <SubmitButton label="Add Category" bgColor="bg-purple-700" />
                </FormCard>

                {/* Add Subcategory Form */}
                <FormCard title="Add Subcategory" color="blue" onSubmit={addSubcategory}>
                    <SelectField
                        label="Parent Category"
                        name="parentId"
                        value={subcategoryData.parentId}
                        options={parentCategory}
                        onChange={handleInputChange(setSubcategoryData)}
                    />

                    <InputField
                        label="Subcategory Title"
                        name="title"
                        value={subcategoryData.title}
                        onChange={handleInputChange(setSubcategoryData)}
                        placeholder="Enter subcategory title"
                    />

                    <TextAreaField
                        label="Description"
                        name="description"
                        value={subcategoryData.description}
                        onChange={handleInputChange(setSubcategoryData)}
                        placeholder="Enter subcategory description"
                    />

                    <SubmitButton label="Add Subcategory" bgColor="bg-blue-700" />
                </FormCard>

                {/* Delete Category Form */}
                <FormCard title="Delete Category" color="red" onSubmit={deleteCategory}>
                    <SelectField
                        label="Select Category"
                        name="parentId"
                        value={subcategoryData.parentId}
                        options={parentCategory}
                        onChange={handleInputChange(setSubcategoryData)}
                    />
                    <SubmitButton label="Delete Category" bgColor="bg-red-700" />
                </FormCard>
            </div>
        </div>
    );
};

// Reusable Form Components
const FormCard = ({ title, color, onSubmit, children }) => (
    <form
        onSubmit={onSubmit}
        className={`bg-white/30 p-8 rounded-xl shadow-2xl backdrop-blur-md text-gray-900 space-y-6 border-l-4 border-${color}-700`}
    >
        <h2 className={`text-2xl font-bold text-${color}-700`}>{title}</h2>
        {children}
    </form>
);

const InputField = ({ label, name, value, onChange, placeholder }) => (
    <div>
        <label className="block font-semibold mb-2">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
    <div>
        <label className="block font-semibold mb-2">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder={placeholder}
        />
    </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
    <div>
        <label className="block font-semibold mb-2">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
        >
            <option value="">Select an option</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.title}
                </option>
            ))}
        </select>
    </div>
);

const SubmitButton = ({ label, bgColor }) => (
    <button
        type="submit"
        className={`w-full p-3 ${bgColor} text-white font-bold rounded-lg hover:brightness-110 transition`}
    >
        {label}
    </button>
);

export default CreateCategory;
