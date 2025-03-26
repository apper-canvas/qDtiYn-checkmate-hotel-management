import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, User, Coffee, Wifi, Utensils, Car, Tv, Plus, X, Check, AlertTriangle } from 'lucide-react';

const MainFeature = () => {
  // Guest information state
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
  });

  // Invoice items state
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, description: 'Room Charge - Deluxe King', rate: 189.99, quantity: 1, amount: 189.99 }
  ]);

  // Additional services that can be added
  const [availableServices, setAvailableServices] = useState([
    { id: 'breakfast', name: 'Breakfast', price: 24.99, icon: <Coffee size={18} /> },
    { id: 'wifi', name: 'Premium WiFi', price: 9.99, icon: <Wifi size={18} /> },
    { id: 'parking', name: 'Parking', price: 19.99, icon: <Car size={18} /> },
    { id: 'dining', name: 'Room Service', price: 39.99, icon: <Utensils size={18} /> },
    { id: 'entertainment', name: 'Movie Package', price: 14.99, icon: <Tv size={18} /> },
  ]);

  // UI states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Calculate totals
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  // Handle input changes for guest info
  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Add a service to the invoice
  const addService = (service) => {
    const newItem = {
      id: Date.now(),
      description: service.name,
      rate: service.price,
      quantity: 1,
      amount: service.price
    };
    
    setInvoiceItems(prev => [...prev, newItem]);
    setShowServiceModal(false);
  };

  // Remove an item from the invoice
  const removeInvoiceItem = (id) => {
    setInvoiceItems(prev => prev.filter(item => item.id !== id));
  };

  // Update quantity of an invoice item
  const updateItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setInvoiceItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedAmount = item.rate * newQuantity;
        return { ...item, quantity: newQuantity, amount: updatedAmount };
      }
      return item;
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!guestInfo.name.trim()) errors.name = "Guest name is required";
    if (!guestInfo.email.trim()) errors.email = "Email is required";
    if (!guestInfo.roomNumber.trim()) errors.roomNumber = "Room number is required";
    if (!guestInfo.checkInDate) errors.checkInDate = "Check-in date is required";
    if (!guestInfo.checkOutDate) errors.checkOutDate = "Check-out date is required";
    
    if (guestInfo.checkInDate && guestInfo.checkOutDate && 
        new Date(guestInfo.checkInDate) > new Date(guestInfo.checkOutDate)) {
      errors.checkOutDate = "Check-out date must be after check-in date";
    }
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Success message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg p-4 flex items-center"
          >
            <Check size={20} className="mr-2 text-green-500" />
            <span>Invoice has been successfully generated and saved!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card">
        <div className="bg-gradient-to-r from-primary to-secondary p-4">
          <h2 className="text-white text-xl font-bold flex items-center">
            <CreditCard size={22} className="mr-2" />
            New Invoice Generator
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Guest Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User size={18} className="mr-2 text-primary" />
              Guest Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Guest Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={guestInfo.name}
                  onChange={handleGuestInfoChange}
                  className={`input ${formErrors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={guestInfo.email}
                  onChange={handleGuestInfoChange}
                  className={`input ${formErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="john.doe@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={guestInfo.phone}
                  onChange={handleGuestInfoChange}
                  className="input"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="roomNumber">
                  Room Number
                </label>
                <input
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  value={guestInfo.roomNumber}
                  onChange={handleGuestInfoChange}
                  className={`input ${formErrors.roomNumber ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="301"
                />
                {formErrors.roomNumber && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.roomNumber}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="checkInDate">
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={guestInfo.checkInDate}
                  onChange={handleGuestInfoChange}
                  className={`input ${formErrors.checkInDate ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {formErrors.checkInDate && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.checkInDate}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="checkOutDate">
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={guestInfo.checkOutDate}
                  onChange={handleGuestInfoChange}
                  className={`input ${formErrors.checkOutDate ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {formErrors.checkOutDate && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    {formErrors.checkOutDate}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Invoice Items Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Calendar size={18} className="mr-2 text-primary" />
                Invoice Items
              </h3>
              
              <button
                type="button"
                onClick={() => setShowServiceModal(true)}
                className="btn-outline text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Service
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-100 dark:bg-surface-800">
                    <th className="text-left p-3 border-b border-surface-200 dark:border-surface-700">Description</th>
                    <th className="text-right p-3 border-b border-surface-200 dark:border-surface-700">Rate</th>
                    <th className="text-right p-3 border-b border-surface-200 dark:border-surface-700">Qty</th>
                    <th className="text-right p-3 border-b border-surface-200 dark:border-surface-700">Amount</th>
                    <th className="text-right p-3 border-b border-surface-200 dark:border-surface-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border-b border-surface-200 dark:border-surface-700"
                    >
                      <td className="p-3">{item.description}</td>
                      <td className="p-3 text-right">${item.rate.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-surface-200 dark:bg-surface-700"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-surface-200 dark:bg-surface-700"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-right">${item.amount.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeInvoiceItem(item.id)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          disabled={invoiceItems.length === 1}
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="p-3 text-right font-medium">Subtotal:</td>
                    <td className="p-3 text-right">${subtotal.toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="p-3 text-right font-medium">Tax ({(taxRate * 100).toFixed(0)}%):</td>
                    <td className="p-3 text-right">${taxAmount.toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr className="bg-surface-100 dark:bg-surface-800">
                    <td colSpan="3" className="p-3 text-right font-bold">Total:</td>
                    <td className="p-3 text-right font-bold">${total.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-6 py-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={18} className="mr-2" />
                  Generate Invoice
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Services Modal */}
      <AnimatePresence>
        {showServiceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full mx-4"
            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add Service</h3>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 gap-3">
                  {availableServices.map(service => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addService(service)}
                      className="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mr-3">
                          {service.icon}
                        </div>
                        <span>{service.name}</span>
                      </div>
                      <span className="font-medium">${service.price.toFixed(2)}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-end">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;