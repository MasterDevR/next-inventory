export type preStockItem = {
  id?: string;
  name: string;
  price: string;
  quantity: string;
  measurement: string;
  description: string;
  stock: string;
  order: string;
  reference: string;
  consume: string;
  distributor: string;
  stockType: string;
  image: File | Blob | string | MediaSource | null;
};
export type Item = {
  id: string;
  name: string;
  price: string;
  description: string;
  measurement: string;
  quantity: string;
  order: string;
  reference: string;
  stockType: string;
  stock: string;
  image: string;
  consume: string;
};
