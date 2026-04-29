import fs from 'fs';
import { TEST_DATA_PATH } from '../constants/constants';

const testDataPath =  TEST_DATA_PATH;

// Module-level cache — file is read from disk ONCE per process run
let cachedTestData: Record<string, any> | null = null; // ← this variable can hold EITHER a Record<string,any> OR a null."

// Private: loads JSON from disk only on first call, returns cache thereafter
function loadTestData(): Record<string, any>{ // ← return type: never null

  if (cachedTestData !== null) return cachedTestData; // ← Cache hit: skip disk I/O

  if (!fs.existsSync(testDataPath)) {
    throw new Error(`Test data file not found: ${testDataPath}`);
  }
  const rawData = fs.readFileSync(testDataPath, 'utf-8');
  const parsed: Record<string, any> = JSON.parse(rawData);
  return parsed;
}

// Private: key validation — throws if key missing (never returns false)
function validateTestDataKey(key: string, testData:  Record<string , any>){
  if (!(key in testData)){
    throw new Error(`Key "${key}" not found in test data`);
  }
}

// Returns a primitive or any value by key (string, number, etc.)
export function getTestData(key: string): any {
 const testData = loadTestData();
 validateTestDataKey(key, testData);     
 return testData[key];
 }

// Returns a JSON array — throws if value is not an array
export function getJsonArray(key: string): any[]{
  const testData = loadTestData();
  validateTestDataKey(key, testData);
  
  const value = testData[key];
  if(!Array.isArray(value)){
    throw new Error(`Key "${key}" does not contain a JSON array!`)    
  }
  return value;  
}

// Returns a JSON object — throws if value is an array or non-object
export function getJsonObject(key: string): Record <string , any>{
  const testData = loadTestData();
  validateTestDataKey(key, testData); 
  
  const value = testData[key];
  // typeof [] === 'object' — so must explicitly exclude arrays
  if(typeof(value) != 'object' || Array.isArray(value)){
    throw new Error(`Key "${key}" does not contain a JSON Object!`)
  }  
  return value;
}