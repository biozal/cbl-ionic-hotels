import React, { useState, ReactNode, useMemo, useEffect } from 'react';

import { DatabaseService } from '../services/database.service'; 
import DatabaseServiceContext from './DatabaseServiceContext';

import { CapacitorEngine } from 'cbl-ionic';

type CBLiteProviderProps = {
  children: ReactNode;
};

const CBLiteProvider: React.FC<CBLiteProviderProps> = ({ children }) => {

  const ds = new DatabaseService();
  const [databaseService, setDatabaseService] = useState<DatabaseService>(ds);
  const databaseServiceValue = useMemo(() => ({ databaseService, setDatabaseService }), [databaseService, setDatabaseService]);

  const engine = new CapacitorEngine();
  return (
    <DatabaseServiceContext.Provider value={databaseServiceValue}>
      {children}
    </DatabaseServiceContext.Provider>
  );
};

export default CBLiteProvider;
