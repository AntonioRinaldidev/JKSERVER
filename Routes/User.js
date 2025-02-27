const express = require('express');
const { createUser, getUser, modifyUser, loginUser, logoutUser } = require('../Controllers/UserController');
const { verifyToken } = require('../Verification/tokenVerification');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get one user
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 */
router.get('/', getUser);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/create', createUser);

/**
 * @swagger
 * /api/users/modify/{id}:
 *   put:
 *     summary: Update a user
 *     description: Modify an existing user's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to modify
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/modify/:id', verifyToken, modifyUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Log in a user and return an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Log out a user
 *     description: Remove the refresh token and log out the user.
 *     responses:
 *       200:
 *         description: Logout successful
 *       400:
 *         description: No refresh token found
 */
router.post('/logout', logoutUser);

module.exports = router;
