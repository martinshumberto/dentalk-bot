import Leads from '../models/Lead';

export default {
    async index(req, res) {
        const leads = await Leads.findAll();
        return res.json(leads);
    }
};