import Template from "../models/Template.js";
import Handlebars from "handlebars";

export const createTemplate = async(req, res) => {
    try {
        const { name, email, company, subject, body } = req.body;

        if (!name || !email || !company || !subject || !body) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTemplate = new Template({
            name: name.trim(),
            email: email.trim(),
            company: company.trim(),
            currentVersion: {
                subject: subject.trim(),
                body: body.trim()
            },
            versions: [{
                subject: subject.trim(),
                body: body.trim()
            }]
        });

        await newTemplate.save();
        res.status(201).json(newTemplate);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTemplates = async(req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTemplate = async(req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        res.json(template);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTemplate = async(req, res) => {
    try {
        const { subject, body, email, company } = req.body;

        if (!subject || !body || !email || !company) {
            return res.status(400).json({ message: "All fields required" });
        }

        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        template.email = email;
        template.company = company;

        template.versions.push({ subject, body });
        template.currentVersion = { subject, body };

        await template.save();

        res.json(template);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTemplate = async(req, res) => {
    try {
        await Template.findByIdAndDelete(req.params.id);
        res.json({ message: "Template deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const renderTemplate = async(req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        if (!template.currentVersion ||
            !template.currentVersion.subject ||
            !template.currentVersion.body
        ) {
            return res.status(400).json({ message: "Subject or body missing" });
        }

        const data = {
            name: template.name,
            email: template.email,
            company: template.company,
            ...req.body
        };

        const subject = Handlebars
            .compile(template.currentVersion.subject)(data);

        const body = Handlebars
            .compile(template.currentVersion.body)(data);

        res.json({ subject, body });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};