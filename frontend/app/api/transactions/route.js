import { NextResponse } from 'next/server';
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
export async function GET(req) {
    try {
        let hasMore = true;
        let charges = [];
        let startingAfter = null;

        
        while (hasMore) {
            const response = await stripeInstance.charges.list({
                limit: 100,
                ...(startingAfter && { starting_after: startingAfter }), 
            });
            charges = charges.concat(response.data);
            hasMore = response.has_more;
            if (hasMore) {
                startingAfter = response.data[response.data.length - 1].id;
            }
        }

       
        const successfulCharges = charges.filter(charge => charge.status === 'succeeded');
        const data = successfulCharges.map(charge => ({
            id: charge.id,
            amount: charge.amount,
            currency: charge.currency,
            description: charge.description,
            status: charge.status,
            created: new Date(charge.created * 1000).toISOString(), 
            customer: charge.customer,
            payment_method: charge.payment_method,
            billing_name: charge.billing_details.name, 
            billing_phone: charge.billing_details.phone, 
            receipt_url: charge.receipt_url, 
        }));

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return GET(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end('Method Not Allowed');
    }
}
