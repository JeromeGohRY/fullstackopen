import { Gender,newPatient } from "./types";
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};
  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };
  const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ');
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export const toNewPatient = (object: unknown): newPatient => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
      const newEntry: newPatient = {
        name:parseName(object.name),
        dateOfBirth:parseDate(object.dateOfBirth),
        gender:parseGender(object.gender),
        ssn:parseSSN(object.ssn),
        occupation:parseOccupation(object.occupation),
        entries:[]
      };
  
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };