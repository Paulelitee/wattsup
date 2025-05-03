import { useState, useRef } from 'react';

// Default electricity rate in cents per kWh
const DEFAULT_RATE = 0.15; // 15 cents per kWh

export default function ElectricityEstimator() {
  const [appliances, setAppliances] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState('daily');
  const [estimate, setEstimate] = useState(null);
  const applianceInputRef = useRef(null);
  const usageInputRef = useRef(null);

  const addAppliance = () => {
    const name = applianceInputRef.current.value.trim();
    const usage = parseFloat(usageInputRef.current.value.trim());
    
    if (name && !isNaN(usage)) {
      setAppliances(prevAppliances => [
        ...prevAppliances,
        {
          id: Date.now(),
          name: name,
          usage: usage // Daily usage in kWh
        }
      ]);
      
      // Clear inputs
      applianceInputRef.current.value = '';
      usageInputRef.current.value = '';
      applianceInputRef.current.focus();
    }
  };

  const handleKeyUp = (event, nextInputRef) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (
        (event.target === applianceInputRef.current && usageInputRef.current.value.trim() !== '') ||
        (event.target === usageInputRef.current && applianceInputRef.current.value.trim() !== '')
      ) {
        addAppliance();
      } else {
        nextInputRef.current.focus();
      }
    }
  };
  
  const deleteAppliance = (id) => {
    setAppliances(prevAppliances => prevAppliances.filter(appliance => appliance.id !== id));
  };
  
  const togglePeriod = () => {
    setCurrentPeriod(prevPeriod => prevPeriod === 'daily' ? 'monthly' : 'daily');
  };
  
  const calculateEstimate = () => {
    if (applianceInputRef.current.value.trim() !== '' && usageInputRef.current.value.trim() !== '') {
      addAppliance();
    }
    
    if (appliances.length > 0) {
      let totalUsage = appliances.reduce((sum, appliance) => sum + appliance.usage, 0);
      
      let dailyCost = totalUsage * DEFAULT_RATE;
      let monthlyCost = dailyCost * 30;
      
      let finalCost = currentPeriod === 'daily' ? dailyCost : monthlyCost;
      
      setEstimate({
        cost: finalCost.toFixed(2),
        period: currentPeriod
      });
    }
  };
  
  return (
    <div className="container">      
      <div className="input-group">
        <input 
          type="text" 
          ref={applianceInputRef}
          placeholder="Add appliance"
          onKeyUp={(e) => handleKeyUp(e, usageInputRef)}
        />
      </div>
      
      <div className="input-group">
        <input 
          type="number" 
          ref={usageInputRef}
          placeholder="00 per day"
          onKeyUp={(e) => handleKeyUp(e, applianceInputRef)}
        />
      </div>
      
      <div className="input-group metric-label">
        <div className="dot"></div>
        <span>Add more metrics</span>
      </div>
      
      <div className="button-container">
        <button 
          className="toggle-btn" 
          onClick={togglePeriod}
        >
          {currentPeriod === 'daily' ? 'Daily' : 'Monthly'}
        </button>
        <button 
          className="estimate-btn" 
          onClick={calculateEstimate}
        >
          Estimate
        </button>
      </div>
      
      {appliances.length > 0 && (
        <div className="appliances-list">
          {appliances.map(appliance => (
            <div key={appliance.id} className="appliance-item">
              <div>{appliance.name}</div>
              <div>
                {appliance.usage} kWh/day 
                <span 
                  className="delete-btn" 
                  onClick={() => deleteAppliance(appliance.id)}
                >
                  ✕
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {estimate && (
        <div className="result-area">
          <h3>Estimated Bill:</h3>
          <p>${estimate.cost} per {estimate.period === 'daily' ? 'day' : 'month'}</p>
        </div>
      )}
    </div>
  );
}