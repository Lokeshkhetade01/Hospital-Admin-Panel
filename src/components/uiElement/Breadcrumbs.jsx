import React from 'react';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex py-3 text-gray-700  w-fit" aria-label="Breadcrumb">
      <ol className="inline-flex items-center ">
        {/* Dashboard Icon / Home - Hamesha fixed rahega */}
        <li className="inline-flex items-center">
          <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Dashboard
          </a>
        </li>

        {/* Dynamic Items mapping */}
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              {/* > Separator Icon */}
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              
              <a
                href={item.link}
                className={`ml-1 text-sm font-medium md:ml-2 transition-colors ${
                  index === items.length - 1 
                    ? "text-blue-600 cursor-default" // Last item highlight
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;