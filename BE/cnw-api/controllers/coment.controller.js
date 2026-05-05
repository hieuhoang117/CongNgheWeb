import { sql } from "../db.js";

export const getComentById = async (req, res) => {
    try {
        const { contentId, sessionId } = req.query;

        const result = await sql.query`
            SELECT TOP 100 c.*, u.FullName
            FROM Comment c
            JOIN Users u ON c.UserID = u.UserID
            WHERE c.ContentID = ${contentId}
            AND (${sessionId} IS NULL OR c.SessionID = ${sessionId})
            AND c.IsActive = 1
            ORDER BY c.CreatedAt DESC
        `;

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const addComent = async (req, res) => {
    try {
        const { contentId, userId, commentText, sessionId } = req.body;

        if (!contentId || !userId || !commentText) {
            return res.status(400).json({ message: "Thiếu dữ liệu" });
        }

        await sql.query`
            INSERT INTO Comment (ContentID, UserID, CommentText, SessionID)
            VALUES (${contentId}, ${userId}, ${commentText}, ${sessionId})
        `;

        res.json({ message: "Comment added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const deleteComent = async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            UPDATE Comment
            SET IsActive = 0
            WHERE CommentID = ${id}
        `;

        res.json({ message: "Comment hidden successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const endSession = async (req, res) => {
    try {
        const { sessionId } = req.body;

        await sql.query`
            UPDATE WatchSession
            SET IsLive = 0, EndTime = GETDATE()
            WHERE SessionID = ${sessionId}
        `;

        // Ẩn comment luôn
        await sql.query`
            UPDATE Comment
            SET IsActive = 0
            WHERE SessionID = ${sessionId}
        `;

        res.json({ message: "Session ended" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const createSession = async (req, res) => {
    try {
        const { contentId } = req.body;

        const sessionId = "SS" + Date.now();

        await sql.query`
            INSERT INTO WatchSession (SessionID, ContentID)
            VALUES (${sessionId}, ${contentId})
        `;

        res.json({ sessionId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};