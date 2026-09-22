import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req, res) {
  try {
    const { items, shippingAddress, paymentMethod = 'Cash on Delivery' } = req.body;
    if (!items?.length) return res.status(400).json({ message: 'Your cart is empty' });

    const ids = items.map(i => i.product);
    const products = await Product.find({ _id: { $in: ids } });
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    const orderItems = [];
    let subtotal = 0;
    for (const item of items) {
      const product = productMap.get(String(item.product));
      if (!product) return res.status(400).json({ message: 'A product in your cart no longer exists' });
      const quantity = Math.max(1, Number(item.quantity) || 1);
      if (quantity > product.stock) return res.status(400).json({ message: `${product.name} does not have enough stock` });
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity
      });
      subtotal += product.price * quantity;
    }

    const shippingFee = subtotal >= 100000 ? 0 : 5000;
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      paymentMethod
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function myOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}

export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (req.user.role !== 'admin' && String(order.user._id) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(order);
}

export async function allOrders(req, res) {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
}

export async function updateOrderStatus(req, res) {
  const allowed = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status' });
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}
