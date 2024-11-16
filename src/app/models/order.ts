import { OrderDetail } from './order.detail';

export interface Order {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  note: string;
  order_date: Date;
  status: string;
  total_money: number;
  shipping_method: string;
  shipping_address: string;
  shipping_date: Date | null; // Có thể null nếu chưa giao hàng
  tracking_number: string | null; // Có thể null nếu chưa có mã vận chuyển
  payment_method: string;
  active: boolean; // Chỉ dùng với admin
  orderDetails: OrderDetail[];
}
