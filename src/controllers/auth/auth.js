import e from 'cors';
import { Costmer, DeliveryPartner } from '../../models/user.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';




const generateToken = (user) => {

    const accesstoken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1d',
        }
    );

    const refreshtoken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d',
        }
    );
    return { accesstoken, refreshtoken };

}

export const loginCustmer = async (req, reply) => {
    try {

        const { phone } = req.body;
        let custmer = await Costmer.findOne({ phone });


        if (!custmer) {
            custmer = new Costmer({

                phone,
                role: 'customer',
                isActive: true,
            });
            await custmer.save();

        }
        const { accesstoken, refreshtoken } = generateToken(custmer);

        return reply.send({


            message: "Login successful",
            accesstoken,
            refreshtoken,
            custmer,
        });


    } catch (error) {
        {



            return reply.status(500).send({ message: 'Internal server error' });
        }
    }
}


export const loginDeliveryPartner = async (req, reply) => {
    try {

        const { email, password } = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({ email });
        if (!deliveryPartner) {
            return reply.status(404).send({ message: 'Delivery partner not found' });
        }
        const isMatch = paasword === deliveryPartner.password;
        if (!isMatch) {
            return reply.status(400).send({ message: 'Invalid credentials' });
        }
        const { accesstoken, refreshtoken } = generateToken(deliveryPartner);



        return reply.send({


            message: "Login successful",
            accesstoken,
            refreshtoken,
            deliveryPartner,
        });



    } catch (error) {
        return reply.status(500).send({ message: 'An  error occurred' });
    };

};
export const refreshtoken = async (req, reply) => {

    const { refreshtoken } = req.body;
    if (!refreshtoken) {
        return reply.status(401).send({ message: 'Refresh token not found' });
    }

    try {
        const decoded = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET);
        let user;
        if (decoded.role === 'customer') {
            user = await Costmer.findById(decoded.userId);
        }
        else if (decoded.role === 'deliveryPartner') {
            user = await DeliveryPartner.findById(decoded.userId);
        } else {
            return reply.status(403).send({ message: 'Invalid role' });
        }
        if (!user) {
            return reply.status(403).send({ message: 'User not found' });

        }
        const { accesstoken, refreshtoken, newRefreshToken } = generateToken(user);

    }
    catch (error) {
        return reply.status(403).send({ message: 'Invalid  refresh Token' });

    }
}

export const fetchUser = async (req, reply) => {

try{
    const { userId, role } = req.user;
    let user;
    if (role === 'customer') {
        user = await Costmer.findById(userId);
    }
    else if (role === 'deliveryPartner') {
        user = await DeliveryPartner.findById(userId);
    }
    else {
        return reply.status(403).send({ message: 'Invalid role' });
    }
    if (!user) {    
        return reply.status(403).send({ message: 'User not found' });
    }

    return reply.send({ 
        message: 'User fetched successfully',
        user,
    });
}
catch (error) {
    return reply.status(500).send({ message: 'ye error sagar ke server ke aa raha hai' });

}
}