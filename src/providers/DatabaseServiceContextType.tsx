import { DatabaseService } from '../services/database.service'; 
import React from "react";

export type DatabaseServiceContextType = {
	databaseService: DatabaseService;
	setDatabaseService: React.Dispatch<React.SetStateAction<DatabaseService>>;
  };