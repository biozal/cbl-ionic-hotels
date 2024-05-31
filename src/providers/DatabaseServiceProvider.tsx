import React, { useState, ReactNode, useMemo, useEffect } from 'react';

import { DatabaseService } from '../services/database.service'; 
import DatabaseServiceContext from './DatabaseServiceContext';

import { CapacitorEngine } from 'cbl-ionic';

type DatabaseServiceProviderProps = {
  children: ReactNode;
};

const DatabaseServiceProvider: React.FC<DatabaseServiceProviderProps> = ({ children }) => {
  //required before calling cblite code, you don't need to do anything
  //else but create a new CapacitorEngine instance
  const engine = new CapacitorEngine();
  const ds = new DatabaseService();

  const [databaseService, setDatabaseService] = useState<DatabaseService>(ds);
  const databaseServiceValue = useMemo(() => ({ databaseService, setDatabaseService }), [databaseService, setDatabaseService]);

  return (
    <DatabaseServiceContext.Provider value={databaseServiceValue}>
      {children}
    </DatabaseServiceContext.Provider>
  );
};

export default DatabaseServiceProvider;
