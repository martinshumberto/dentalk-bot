import Lead from '../models/Lead';

export default {
    async index(req, res) {
        const leads = await Lead.findAll();
        return res.json(leads);
    }
};