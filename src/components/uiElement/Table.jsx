import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b border-gray-200 bg-gray-50 font-medium text-gray-600">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} scope="col" className="px-6 py-4 capitalize">
                      {col.header}
                    </th>
                  ))}
                  {actions && <th scope="col" className="px-6 py-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {data.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="transition duration-300 ease-in-out hover:bg-gray-50/50"
                  >
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="whitespace-nowrap px-6 py-4 font-normal text-gray-700">
                        {/* Check if a custom render function is provided */}
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    
                    {actions && (
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <div className="p-8 text-center text-gray-500 bg-white">
                No records found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;