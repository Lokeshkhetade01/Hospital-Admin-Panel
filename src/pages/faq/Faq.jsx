import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqs, addFaq, updateFaq, deleteFaq } from '../../redux/slices/faq/faqSlice';
import Table from '../../components/uiElement/Table';
import Modal from '../../components/uiElement/Modal';
import { Edit, Trash } from 'lucide-react';

const Faq = () => {
  const dispatch = useDispatch();
  const { items: faqs, loading } = useSelector((state) => state.faqs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ id: null, question: '', answer: '' });

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const handleAddClick = () => {
    setCurrentFaq({ id: null, question: '', answer: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (faq) => {
    setCurrentFaq({ id: faq._id, question: faq.question, answer: faq.answer });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // --- DELETE WITH REFRESH ---
  const handleDelete = async (id) => {
    if (window.confirm("Bhai, pakka delete karna hai?")) {
      try {
        await dispatch(deleteFaq(id)).unwrap();
        // Delete success hone ke baad refresh
        window.location.reload(); 
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  // --- SUBMIT (ADD/UPDATE) WITH REFRESH ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const faqData = { question: currentFaq.question, answer: currentFaq.answer };

    try {
      if (isEditing) {
        await dispatch(updateFaq({ id: currentFaq.id, faqData })).unwrap();
      } else {
        await dispatch(addFaq(faqData)).unwrap();
      }
      
      setIsModalOpen(false);
      // Action complete hone ke baad page refresh taaki naya data fetch ho jaye
      window.location.reload(); 
      
    } catch (error) {
      alert("Error occurred! Please try again.");
      console.error("Submit error:", error);
    }
  };

  const columns = [
    { 
      header: 'Question', 
      key: 'question',
      render: (row) => <span className="font-medium text-gray-800">{row.question}</span>
    },
    { 
      header: 'Answer', 
      key: 'answer',
      render: (row) => <p className="max-w-md truncate text-gray-500">{row.answer}</p>
    }
  ];

  const tableActions = (row) => (
    <div className="flex justify-end gap-3">
      <button 
        onClick={() => handleEditClick(row)}
        className="px-2 py-1.5 text-sm font-semibold text-indigo-600 cursor-pointer rounded-lg hover:bg-indigo-100 transition-all"
      >
        <Edit size={15}/>
      </button>
      <button 
        onClick={() => handleDelete(row._id)}
        className="px-2 py-1.5 text-sm font-semibold text-red-600 cursor-pointer rounded-lg hover:bg-red-100 transition-all"
      >
        <Trash size={15}/>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 border border-gray-200">
      <div className="max-w-full ">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">FAQ's Section</h1>
            <p className="text-gray-500 mt-1">Manage FAQs with auto-refresh functionality.</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95"
          >
            <span className="text-xl">+</span> Add FAQ
          </button>
        </div>

        <div className=" overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500">Updating list...</p>
            </div>
          ) : (
            <Table columns={columns} data={faqs} actions={tableActions} />
          )}
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={isEditing ? "Edit FAQ" : "Add FAQ"}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Question</label>
              <input 
                required
                type="text"
                placeholder='enter your question here....'
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                value={currentFaq.question}
                onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Answer</label>
              <textarea 
                required
                rows="5"
                placeholder='enter your answer here.....'
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                value={currentFaq.answer}
                onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md transition-all"
              >
                {isEditing ? "Update & Refresh" : "Save & Refresh"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Faq;