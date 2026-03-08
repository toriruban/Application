/**
 * @swagger
 * tags:
 *   - name: Events
 *     description: API endpoints for managing events
 *
 * /events:
 *   get:
 *     summary: Get all public events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Tech Conference
 *                   description:
 *                     type: string
 *                     example: Annual tech conference
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-04-01T10:00:00Z"
 *                   location:
 *                     type: string
 *                     example: Kyiv
 *                   capacity:
 *                     type: integer
 *                     example: 50
 *                   visibility:
 *                     type: string
 *                     example: public
 *                   organizerId:
 *                     type: number
 *                     example: 1
 *                   organizer:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                         example: Viktoriia
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: number
 *                         eventId:
 *                           type: number
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: number
 *                             name:
 *                               type: string
 *                               example: Alice
 *       500:
 *         description: Failed to fetch events
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *               - visibility
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference
 *               description:
 *                 type: string
 *                 example: Annual tech conference
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-01T10:00:00Z"
 *               location:
 *                 type: string
 *                 example: Kyiv
 *               capacity:
 *                 type: integer
 *                 example: 50
 *               visibility:
 *                 type: string
 *                 example: public
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Tech Conference
 *                 organizerId:
 *                   type: number
 *                   example: 1
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to create event
 *
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Tech Conference
 *                 description:
 *                   type: string
 *                   example: Annual tech conference
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-04-01T10:00:00Z"
 *                 location:
 *                   type: string
 *                   example: Kyiv
 *                 capacity:
 *                   type: integer
 *                   example: 50
 *                 visibility:
 *                   type: string
 *                   example: public
 *                 organizerId:
 *                   type: number
 *                   example: 1
 *                 organizer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                       example: Viktoriia
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: number
 *                       eventId:
 *                         type: number
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           name:
 *                             type: string
 *                             example: Alice
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to fetch event
 *   patch:
 *     summary: Update event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference
 *               description:
 *                 type: string
 *                 example: Annual tech conference
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-01T10:00:00Z"
 *               location:
 *                 type: string
 *                 example: Kyiv
 *               capacity:
 *                 type: integer
 *                 example: 50
 *               visibility:
 *                 type: string
 *                 example: public
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Tech Conference
 *                 organizerId:
 *                   type: number
 *                   example: 1
 *       403:
 *         description: Forbidden - You are not the organizer
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to update event
 *   delete:
 *     summary: Delete event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       403:
 *         description: Forbidden - You are not the organizer
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to delete event
 *
 * /events/{id}/join:
 *   post:
 *     summary: Join event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Joined successfully
 *       400:
 *         description: Already joined or event is full
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to join event
 *
 * /events/{id}/leave:
 *   post:
 *     summary: Leave event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Left event successfully
 *       400:
 *         description: You are not a participant
 *       500:
 *         description: Failed to leave event
 *
 * /users/me/events:
 *   get:
 *     summary: Get my events for calendar
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Failed to fetch your events
 */
export {};