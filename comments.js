// Create web server

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create routes
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    // Generate random id
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get comments array for post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add comment to comments array
    comments.push({ id: commentId, content });

    // Update comments object
    commentsByPostId[req.params.id] = comments;

    // Send response
    res.status(201).send(comments);
});

// Listen to port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});