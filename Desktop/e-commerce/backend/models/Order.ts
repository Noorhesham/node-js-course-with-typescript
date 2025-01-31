import { Schema, model, Document, Types } from 'mongoose';

// ... rest of the Order model code as provided ... 

interface IOrderItem {
  product: Types.ObjectId;
  variant: {
    optionValues: { [key: string]: string };
    sku: string;
  };
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Types.ObjectId;
  billingAddress: Types.ObjectId;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  trackingNumber?: string;
  notes?: string;
}

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    variant: {
      optionValues: {
        type: Map,
        of: String
      },
      sku: String
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  trackingNumber: String,
  notes: String
}, {
  timestamps: true
});

export const Order = model<IOrder>('Order', orderSchema); 