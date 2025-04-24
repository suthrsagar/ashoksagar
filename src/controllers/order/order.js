
import { Order, Product, Branch, Category } from '../../models/index.js';







export const createOrder = async (req, reply) => {
    try {
        const { userId } = req.user;
        const { idems, branch, totalPrice } = req.body;


        const customerData = await Customer.findById(userId);
        const branchData = await Branch.findById(branch);

        if (!customerData) {
            return reply.status(404).send({ message: 'Customer not found' });
        }

        const newOrder = new Order({
            customer: userId,
            items: idems.map((item) => ({
                id: item.id,
                item: item.item,
                count: item.count,
            })),
            branch,
            totalPrice,
            deliveryLocation: {
                latitude: customerData.liveLocation.latitude,
                longitude: customerData.liveLocation.longitude,
                address: customerData.address || "Addrees nahi diya hai",
            },
            PickupLocation: {
                latitude: branchData.location.latitude,
                longitude: branchData.location.longitude,
                address: branchData.address || "Addrees nahi diya hai",
            },


        })



        const savedOrder = await newOrder.save();
        return reply.status(201).send(savedOrder);

    }
    catch (error) {
        console.error(err);
        return reply.status(500).send({ message: 'Failed to create order', error });
    }
}


export const confirmOrder = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { userId } = req.user;
        const deliveryParsonLocation = req.body;





        const deliveryParson = await DeliveryPartner.findById(userId);
        if (!deliveryParson) {
            return reply.status(404).send({ message: 'Delivery partner not found' });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return reply.status(404).send({ message: 'Order not found' });
        }
        if (order.status !== 'available') {
            return reply.status(400).send({ message: 'Order is not available ' });

        }
        order.status = 'confirmed';
        order.deliveryParson = userId;
        order.deliveryParsonLocation = {
            latitude: deliveryParsonLocation.latitude,
            longitude: deliveryParsonLocation.longitude,
            address: deliveryParsonLocation.address || "",

        };
        req.server.io.to(orderId).emit('orderConfirmed', order);
        await order.save();


        return reply, send(order);





    } catch (error) {
        return reply
            .status(500)
            .send({ message: 'Failed to confirm order', error });
    }
}


export const updateOrderStatus = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { status, deliveryParsonLocation } = req.body;

        const { userId } = req.user;

        const deliveryParson = await DeliveryPartner.findById(userId);
        if (!deliveryParson) {
            return reply.status(404).send({ message: 'Delivery partner not found' });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return reply.status(404).send({ message: 'Order not found' });
        }

        if (oder.DeliveryPartner.toString() !== userId) {
            return reply.status(403).send({ message: 'Unauthorized  ' });
        }
        oder.status = status;
        order.deliveryParsonLocation = deliveryParsonLocation;
        await order.save();


        eq.server.io.to(orderId).emit('liveTrackingUpdate', order);



        return reply.send(order);

    }
    catch (error) {


        return reply.status(500).send({ message: 'Failed to update order status', error });
    }
}


export const getOrder = async (req, reply) => {
    try {
        const { status, customerId, deliveryParsonId, branchId } = req.query;
        let query = {};



        if (status) {
            query.status = status;

        }
        if (customerId) {
            query.customer = customerId;
        }
        if (deliveryParsonId) {
            query.deliveryParson = deliveryParsonId;
            query.branch = branchId;
        }
        const order = await Order.find(query).populate(' customer branch  items.item deliveryParson');

        return reply.send(order);
    }
    catch (error) {
        return reply.status(500).send({ message: 'Failed to get order', error });
    }

}

export const getOrderById = async (req, reply) => {
    try {

        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('customer branch items.item deliveryParson');

        if (!order) {
            return reply.status(404).send({ message: 'Order not found' });
        }
        return reply.send(order);


    } catch (error) {
        return reply.status(500).send({ message: 'Failed to get order', error });
    } 

}