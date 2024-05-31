import React from 'react';
import { DatabaseServiceContextType } from './DatabaseServiceContextType';

const DatabaseServiceContext = React.createContext<DatabaseServiceContextType | undefined>(undefined);
export default DatabaseServiceContext;