import { v4 as uuidv4 } from 'uuid';

export const temporaryUUID = () => {
  return `temporary-id-${uuidv4()}`;
};
