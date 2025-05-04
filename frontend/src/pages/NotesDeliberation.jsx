import React, { useState, useEffect } from 'react';
import api from '../api';

const NotesDeliberation = () => {
  // States for fetched data
  const [years, setYears] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Selected values
  const [selections, setSelections] = useState({
    year: '',
    department: '',
    filiere: '',
    semester: ''
  });

  // Fetch initial data (academic years and departments)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch academic years and departments in parallel
        const [yearsRes, deptsRes] = await Promise.all([
          api.get('/Grades/annee_academique').catch(e => ({ data: [] })),
          api.get('/Grades/listDepartments').catch(e => ({ data: [] }))
        ]);

        // Validate array responses
        setYears(validateArray(yearsRes?.data));
        setDepartments(validateArray(deptsRes?.data));
        console.log("Departments fetched:", validateArray(deptsRes?.data));
      } catch (error) {
        console.error('Initialization error:', error);
        setError('Failed to load initial data');
        setYears([]);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Universal array validation
  const validateArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.results) return data.results;
    if (data.data) return data.data;
    return [];
  };

  // Handle selection changes and fetch dependent data
  const handleSelection = async (type, value) => {
    const newSelections = { ...selections, [type]: value };
    
    // Reset downstream selections if needed
    if (type === 'year') {
      newSelections.department = newSelections.filiere = newSelections.semester = '';
    }
    if (type === 'department') {
      newSelections.filiere = newSelections.semester = '';
    }
    if (type === 'filiere') {
      newSelections.semester = '';
    }

    setSelections(newSelections);

    try {
      if (type === 'department' && value) {
        const res = await api.get('/Grades/listFilieres', { params: { department: value } });
        setFilieres(validateArray(res?.data));
      }
      
      if (type === 'filiere' && value) {
        const res = await api.get('/Grades/adminSemesters', { params: { filiere: value } });
        console.log("Semesters fetched:", validateArray(res?.data));
        setSemesters(validateArray(res?.data));
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setError(`Failed to load ${type} data`);
    }
  };

  // Check if all selections have been made
  const isReady = Object.values(selections).every(v => v !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-500 transform hover:scale-105">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-8 h-8 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Grade Deliberation Panel
        </h2>

        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 transition-opacity duration-300">
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-medium text-indigo-600">Loading data...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start animate-shake">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Selection UI */}
        <div className="space-y-8 mb-8">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-base uppercase tracking-wide text-blue-700 font-semibold mb-4">
              Selection Criteria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField 
                label="Academic Year"
                value={selections.year}
                onChange={(e) => handleSelection('year', e.target.value)}
                options={years}
                disabled={loading}
                icon={
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                }
                displayField="annee"  // adjust as per your academic year response property
                valueField="id"
              />

              <SelectField 
                label="Department"
                value={selections.department}
                onChange={(e) => handleSelection('department', e.target.value)}
                options={departments}
                disabled={!selections.year || loading}
                icon={
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                }
                displayField="nom_departement" // using 'nom_departement' for display
                valueField="id"               // or change to 'nom_departement' if needed
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <SelectField 
                label="Filiere"
                value={selections.filiere}
                onChange={(e) => handleSelection('filiere', e.target.value)}
                options={filieres}
                disabled={!selections.department || loading}
                icon={
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                }
                displayField="nom_filiere"  // using 'nom_filiere' for display
                valueField="id"            // adjust as needed
              />

              <SelectField 
                label="Semester"
                value={selections.semester}
                onChange={(e) => handleSelection('semester', e.target.value)}
                options={semesters}
                disabled={!selections.filiere || loading}
                icon={
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                }
                displayField="semester" // adjust property names as needed
                valueField="id"
              />
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <ProgressStep label="Year" completed={!!selections.year} number={1} />
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className="h-1 bg-blue-600 transition-all duration-300" style={{ width: selections.year ? '100%' : '0%' }}></div>
            </div>
            <ProgressStep label="Department" completed={!!selections.department} number={2} />
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className="h-1 bg-blue-600 transition-all duration-300" style={{ width: selections.department ? '100%' : '0%' }}></div>
            </div>
            <ProgressStep label="Filiere" completed={!!selections.filiere} number={3} />
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className="h-1 bg-blue-600 transition-all duration-300" style={{ width: selections.filiere ? '100%' : '0%' }}></div>
            </div>
            <ProgressStep label="Semester" completed={!!selections.semester} number={4} />
          </div>
        </div>

        {/* Status Message */}
        {!isReady && (
          <div className="text-center p-4 bg-yellow-50 border border-yellow-100 rounded-lg mb-6">
            <p className="text-sm text-yellow-700">
              {!selections.year ? (
                "Please start by selecting an academic year"
              ) : !selections.department ? (
                "Now select a department"
              ) : !selections.filiere ? (
                "Choose a filiere to continue"
              ) : (
                "Select a semester to complete the form"
              )}
            </p>
          </div>
        )}

        {/* Deliberation Section */}
        {isReady && (
          <div className="border-t border-gray-200 pt-6">
            <DeliberationActions selections={selections} />
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Progress Step Component
const ProgressStep = ({ label, completed, number }) => (
  <div className="flex flex-col items-center">
    <div 
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
        completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
      }`}
    >
      {completed ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      ) : (
        <span className="text-xs font-medium">{number}</span>
      )}
    </div>
    <span className={`text-xs mt-2 ${completed ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

// Flexible SelectField Component
const SelectField = ({
  label,
  value,
  onChange,
  options,
  disabled,
  icon,
  displayField = 'name', // fallback if not provided
  valueField = 'id'
}) => {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="transition-all duration-300">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <select
          className={`w-full pl-10 pr-10 py-2.5 border ${
            disabled ? 'bg-gray-50 border-gray-200' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-300 ${
            disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Select {label}</option>
          {safeOptions.length > 0 ? (
            safeOptions.map((item, index) => {
              if (typeof item === 'object' && item !== null) {
                const displayValue = item[displayField];
                const itemValue = item[valueField] || displayValue;
                const key = itemValue || `${displayValue || 'item'}-${index}`;
                return (
                  <option key={key} value={itemValue}>
                    {displayValue || `Unnamed ${label}`}
                  </option>
                );
              }
              return (
                <option key={`${item}-${index}`} value={item}>
                  {item}
                </option>
              );
            })
          ) : (
            <option value="">No {label} available</option>
          )}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Deliberation Actions Component
const DeliberationActions = ({ selections }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDeliberation = async () => {
    try {
      await api.post('/startDeliberation', {
        year: selections.year,
        department: selections.department,
        filiere: selections.filiere,
        semester: selections.semester
      });
      // Add a success notification or redirect if needed
    } catch (error) {
      console.error('Deliberation failed:', error);
      // Add error notification if needed
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
        <h3 className="text-xl font-medium text-indigo-800 mb-4">Ready for Deliberation</h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm transition-transform duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 uppercase">Academic Year</p>
            <p className="font-medium text-gray-800">{selections.year}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm transition-transform duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 uppercase">Department</p>
            <p className="font-medium text-gray-800">{selections.department}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm transition-transform duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 uppercase">Filiere</p>
            <p className="font-medium text-gray-800">{selections.filiere}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm transition-transform duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 uppercase">Semester</p>
            <p className="font-medium text-gray-800">{selections.semester}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          className={`px-10 py-3 rounded-lg font-medium flex items-center space-x-3 transition-all duration-300 ${
            isHovered ? 'bg-indigo-700 shadow-lg shadow-indigo-300' : 'bg-indigo-600 shadow shadow-indigo-200'
          } text-white hover:bg-indigo-700`}
          onClick={handleDeliberation}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span>Start Deliberation Process</span>
        </button>
      </div>
    </div>
  );
};

export default NotesDeliberation;
