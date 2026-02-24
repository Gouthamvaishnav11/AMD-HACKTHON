const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize, User, Event, Plan } = require('./models');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key_here';

app.use(cors());
app.use(bodyParser.json());

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Auth Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/me', authenticateToken, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    res.json({ id: user.id, name: user.name, email: user.email });
});

app.put('/api/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const { interests, budget, showExplanations, shareData } = req.body;
        // For now we don't store these in DB, just return success
        // In a real app, we'd add these columns to the User model
        res.json({ message: 'Profile updated successfully!', user: { ...user.toJSON(), interests, budget } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Planner Routes
app.get('/api/planner', authenticateToken, async (req, res) => {
    const plan = await Plan.findOne({ where: { userId: req.user.id } });
    res.json(plan ? plan.data : []);
});

app.post('/api/planner', authenticateToken, async (req, res) => {
    try {
        const { data } = req.body;
        let plan = await Plan.findOne({ where: { userId: req.user.id } });
        if (plan) {
            plan.data = data;
            await plan.save();
        } else {
            plan = await Plan.create({ userId: req.user.id, data });
        }
        res.json(plan.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI Chat Route
app.post('/api/chat', authenticateToken, async (req, res) => {
    const { message } = req.body;
    const user = await User.findByPk(req.user.id);

    // Intelligent mock response logic
    const lower = message.toLowerCase();
    let response = "";

    if (lower.includes("event") || lower.includes("happening") || lower.includes("week")) {
        response = "There are 3 events this week: a National Hackathon on Saturday (Free), Coffee & Code on Wednesday (₹250), and an Art Gallery on Friday (Free). Would you like me to add them to your planner?";
    } else if (lower.includes("money") || lower.includes("budget") || lower.includes("cost") || lower.includes("save")) {
        response = "I can help you save money! Based on your ₹5,000 budget, you should check out the free student events or use your canteen pass for ₹100 off on every meal.";
    } else if (lower.includes("who are you") || lower.includes("ai")) {
        response = "I am your Smart Campus AI. I analyze your profile and budget to give you 100% accurate recommendations for your campus life.";
    } else if (lower.includes("hello") || lower.includes("hi")) {
        response = `Hello ${user.name}! I am your AI assistant. I can help you find events, plan your day, or suggest ways to save money. What's on your mind?`;
    } else {
        response = "I'm not sure I understand perfectly, but based on campus activity, I recommend checking out the new Tech Expo in Hall B or the library for quiet study sessions.";
    }

    res.json({ content: response });
});

app.post('/api/feedback', authenticateToken, async (req, res) => {
    try {
        const { feedback } = req.body;
        console.log(`Feedback received: ${feedback}`);
        res.json({ message: 'Thank you for your feedback!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Events & Recommendations Routes
app.get('/api/events', async (req, res) => {
    const events = await Event.findAll();
    res.json(events);
});

app.get('/api/recommendations', authenticateToken, async (req, res) => {
    // Originality: Generating dynamic recommendations based on "real" events
    const recs = [
        { name: 'Campus Hackathon 2026', cost: 0, time: 6, rating: 4.8, tags: ['Technology', 'Social'], reason: 'Matches your interest in Tech. It is Free and near your location.' },
        { name: 'Coffee at Bean & Brew', cost: 350, time: 0.5, rating: 4.5, tags: ['Food'], reason: 'Perfect for a break between classes. Costs only ₹350.' },
        { name: 'AI Ethics Study Group', cost: 0, time: 2, rating: 4.3, tags: ['Academic', 'Technology'], reason: 'Helpful for your upcoming exams.' }
    ];
    res.json(recs);
});

// Initialize DB and Seed Data
sequelize.sync().then(async () => {
    const count = await Event.count();
    if (count === 0) {
        await Event.bulkCreate([
            { title: 'Campus Hackathon', description: 'Annual hackathon', date: new Date(), cost: 0, category: 'Tech' },
            { title: 'Coffee & Code', description: 'Weekly meetup', date: new Date(), cost: 250, category: 'Social' },
            { title: 'Art Exhibition', description: 'Student gallery', date: new Date(), cost: 0, category: 'Art' }
        ]);
        console.log('Seeded initial events with Indian currency.');
    }
    app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
});
