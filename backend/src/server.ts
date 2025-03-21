import app from './app';

const PORT = process.env.PORT || 3001;

import { getCircuits, getDrivers } from './data/dataService';

getCircuits(); 
getDrivers(); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
