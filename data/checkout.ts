export type Customer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const validCustomer: Customer = {
  firstName: 'Budi',
  lastName: 'Santoso',
  postalCode: '12345',
};

export const invalidCustomers = [
  { name: 'first name kosong', customer: { ...validCustomer, firstName: '' }, error: 'Error: First Name is required' },
  { name: 'last name kosong', customer: { ...validCustomer, lastName: '' }, error: 'Error: Last Name is required' },
  { name: 'postal code kosong', customer: { ...validCustomer, postalCode: '' }, error: 'Error: Postal Code is required' },
];
