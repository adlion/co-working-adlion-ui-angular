export interface FieldDataType {
  name: string;
  navKeyId: string;
  type: 'string' | 'number' | 'array' | 'object' | 'unknown';
  nested: FieldDataType[] | null;
}

export interface ResultRow {
  fieldValues: {
    [key: string]: string | number;
  };
  aggregateValue: number;
}
