import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GetOwnerContract({ ownerEmail }) {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [acceptanceStatus, setAcceptanceStatus] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const navigate = useNavigate();

  const fetchContracts = async () => {
    try {
      // Fetching all contracts
      const result = await fetch('http://localhost:5000/ownercontract-details', {
        method: 'GET',
      });
      const val = await result.json();

      // Filtering contracts
      const filteredContracts = val.map(({ contractname, address }) => ({
        contractname,
        address,
      }));
      setFilteredContracts(filteredContracts);

      // Fetching contracts related to the owner
      const response = await fetch(`http://localhost:5000/allcontractsofowners/${ownerEmail}`);
      const data = await response.json();
      setContracts(data);

      // Fetching acceptance status for each contract
      data.forEach(async (contract) => {
        const statusResponse = await fetch(`http://localhost:5000/contracts/acceptance-statusoftenant/${contract._id}`);
        const statusData = await statusResponse.json();
        setAcceptanceStatus((prevStatus) => ({
          ...prevStatus,
          [contract._id]: statusData.acceptedByTenant ? 'Accepted' : 'Pending Acceptance',
        }));
      });
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [ownerEmail]);

  const handleViewDetails = (ownerContractId) => {
    navigate(`/allcontractsofowners/${ownerContractId}`);
  };

  const handleSignContract = async () => {
    if (selectedContract) {
      try {
        await fetch(`http://localhost:5000/contracts/sign/${selectedContract._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ signedByTenant: true }), // Assuming tenant signs
        });
        setShowPopup(false);
        setSelectedContract(null);
        // Refetch the contracts to update the acceptance status after signing
        fetchContracts();
      } catch (error) {
        console.error('Error signing contract:', error);
      }
    }
  };

  return (
    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {contracts.map((contract) => (
          <div
            key={contract._id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {contract.contractname}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Address: {contract.email}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Address: {contract.property}
            </p>
            <div style={{ display: "flex", width: "30%", columnGap: "1rem" }}>
              <button
                onClick={() => handleViewDetails(contract._id)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  if (acceptanceStatus[contract._id] === 'Accepted') {
                    setSelectedContract(contract);
                    setShowPopup(true);
                  }
                }}
                className={`text-white ${acceptanceStatus[contract._id] === 'Accepted' ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-500'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={acceptanceStatus[contract._id] !== 'Accepted'}
              >
                {acceptanceStatus[contract._id] === 'Accepted' ? 'Accepted' : 'Pending Acceptance'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Sign Contract</h2>
            <p>Are you sure you want to add this contract in blockchain?</p>
            <div>
              <input type="text" placeholder='Enter your sign'/>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSignContract}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetOwnerContract;
