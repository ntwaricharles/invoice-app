export interface Invoice {
  id: string;
  clientName: string;
  items: InvoiceItem[];
  total: number;
  status: 'draft' | 'pending' | 'paid';
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}
