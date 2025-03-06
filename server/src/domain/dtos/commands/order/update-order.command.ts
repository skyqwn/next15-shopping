export type UpdateOrderCommandProps = {
  status: 'pending' | 'shipping' | 'completed' | 'cancelled' | 'refunded';
  totalPrice?: number;
  receiptURL?: string;
  tossOrderId?: string;
};

export class UpdateOrderCommand {
  readonly status:
    | 'pending'
    | 'shipping'
    | 'completed'
    | 'cancelled'
    | 'refunded';
  readonly totalPrice?: number;
  readonly receiptURL?: string;
  readonly tossOrderId?: string;

  constructor(props: UpdateOrderCommandProps) {
    this.status = props.status;
    this.totalPrice = props.totalPrice;
    this.receiptURL = props.receiptURL;
    this.tossOrderId = props.tossOrderId;
  }
}
