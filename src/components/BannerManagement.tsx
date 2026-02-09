"use client";

import { useState } from "react";

interface Banner {
  id: string;
  title: string;
  image: string;
  gradient: string;
  isActive: boolean;
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "Hero Banner",
      image: "",
      gradient: "bg-gradient-to-r from-purple-600 via-purple-800 to-orange-500",
      isActive: true,
    },
    {
      id: "2", 
      title: "Section Banner",
      image: "",
      gradient: "bg-gradient-to-br from-orange-400 via-purple-600 to-purple-900",
      isActive: false,
    }
  ]);

  const [activeTab, setActiveTab] = useState("manage");
  const [newBanner, setNewBanner] = useState({
    title: "",
    image: "",
    gradient: "bg-gradient-to-r from-purple-600 via-purple-800 to-orange-500"
  });

  const gradientOptions = [
    "bg-gradient-to-r from-purple-600 via-purple-800 to-orange-500",
    "bg-gradient-to-br from-orange-400 via-purple-600 to-purple-900", 
    "bg-gradient-to-l from-purple-500 to-orange-400",
    "bg-gradient-to-tr from-orange-500 via-purple-500 to-purple-800",
    "bg-gradient-to-b from-purple-400 to-orange-600",
    "bg-gradient-to-tl from-orange-600 via-purple-700 to-purple-400",
    "bg-gradient-to-r from-purple-800 via-orange-500 to-purple-600",
    "bg-gradient-to-br from-purple-300 via-orange-400 to-purple-800"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, bannerId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (bannerId) {
          // Update existing banner
          setBanners(prev => prev.map(banner => 
            banner.id === bannerId 
              ? { ...banner, image: imageUrl }
              : banner
          ));
        } else {
          // Set image for new banner
          setNewBanner(prev => ({ ...prev, image: imageUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addBanner = () => {
    if (newBanner.title) {
      const banner: Banner = {
        id: Date.now().toString(),
        title: newBanner.title,
        image: newBanner.image,
        gradient: newBanner.gradient,
        isActive: false
      };
      setBanners(prev => [...prev, banner]);
      setNewBanner({ title: "", image: "", gradient: gradientOptions[0] });
    }
  };

  const toggleBannerActive = (id: string) => {
    setBanners(prev => prev.map(banner => 
      banner.id === id 
        ? { ...banner, isActive: !banner.isActive }
        : banner
    ));
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
  };

  const updateBannerGradient = (id: string, gradient: string) => {
    setBanners(prev => prev.map(banner =>
      banner.id === id 
        ? { ...banner, gradient }
        : banner
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Banner Management System</h1>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("manage")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "manage"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Manage Banners
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "create"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Create Banner
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "preview"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Preview
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{banner.title}</h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      banner.isActive 
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => toggleBannerActive(banner.id)}
                      className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Banner Preview */}
                <div className={`relative h-32 rounded-lg ${banner.gradient} mb-4`}>
                  {banner.image && (
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg mix-blend-overlay"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h4 className="text-white text-xl font-bold">{banner.title}</h4>
                  </div>
                </div>

                {/* Controls */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, banner.id)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gradient Style
                    </label>
                    <select
                      value={banner.gradient}
                      onChange={(e) => updateBannerGradient(banner.id, e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      {gradientOptions.map((gradient, index) => (
                        <option key={index} value={gradient}>
                          Purple/Orange Style {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "create" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Create New Banner</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner(prev => ({ ...prev, title: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter banner title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gradient Style
                </label>
                <select
                  value={newBanner.gradient}
                  onChange={(e) => setNewBanner(prev => ({ ...prev, gradient: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  {gradientOptions.map((gradient, index) => (
                    <option key={index} value={gradient}>
                      Purple/Orange Style {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>

            {/* Preview */}
            {newBanner.title && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                <div className={`relative h-32 rounded-lg ${newBanner.gradient}`}>
                  {newBanner.image && (
                    <img 
                      src={newBanner.image} 
                      alt={newBanner.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg mix-blend-overlay"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h5 className="text-white text-xl font-bold">{newBanner.title}</h5>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={addBanner}
                disabled={!newBanner.title}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Banner
              </button>
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Active Banners Preview</h3>
            {banners.filter(banner => banner.isActive).map((banner) => (
              <div key={banner.id} className="relative">
                <div className={`relative h-48 rounded-lg ${banner.gradient}`}>
                  {banner.image && (
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg mix-blend-overlay"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h4 className="text-white text-3xl font-bold">{banner.title}</h4>
                  </div>
                </div>
              </div>
            ))}
            {banners.filter(banner => banner.isActive).length === 0 && (
              <p className="text-gray-500 text-center py-12">No active banners to display</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}