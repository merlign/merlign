import { z } from 'zod';

/**
 * Reusable wrapper to validate API request bodies
 * Usage: return withValidation(req, res, MySchema, async (data) => { ... })
 */
export const withValidation = async (req, res, schema, handler) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const validatedData = schema.parse(req.body);
        return await handler(validatedData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.warn('API Validation Failed:', error.errors);
            return res.status(400).json({
                message: 'Invalid request data',
                details: error.errors
            });
        }
        console.error('API Handler Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Common Schemas
export const ContactSchema = z.object({
    name: z.string().min(2, 'Naam is te kort').max(100),
    email: z.string().email('Ongeldig e-mailadres'),
    message: z.string().min(10, 'Bericht moet minimaal 10 tekens bevatten').max(5000),
    phone: z.string().optional(),
});
