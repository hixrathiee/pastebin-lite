import Paste from "../models/pasteModel.js";
import mongoose from "mongoose";
import getNow from "../utils/time.js";
import escapeHtml from "../utils/escapeHTML.js";

// Create a new paste & return the url
export const createPaste = async (req, res) => {
    try {
        const { content, ttl_seconds, max_views } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
            return res.status(400).json({ error: "Invalid ttl_seconds" });
        }

        if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
            return res.status(400).json({ error: "Invalid max_views" });
        }

        const now = getNow(req);
        const expiresAt = ttl_seconds ? new Date(now + ttl_seconds * 1000) : null;

        const paste = await Paste.create({
            content,
            expiresAt,
            maxViews: max_views || null,
        })

        const url = `${req.protocol}://${req.get("host")}/p/${paste._id}`;

        res.status(201).json({ 
            id: paste._id,
            url 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get a paste by ID
export const getPaste = async (req, res) => {
    try {
        const paste = await Paste.findById(req.params.id);

        if (!paste) {
            return res.status(404).json({ error: "Not found" });
        }

        const now = getNow(req);

        if (paste.expiresAt && now > paste.expiresAt.getTime()) {
            return res.status(410).json({ error: "Paste expired" });
        }

        if (paste.maxViews && paste.views >= paste.maxViews) {
            return res.status(410).json({ error: "Paste expired" });
        }

        paste.views += 1;
        await paste.save();

        res.json({
            content: paste.content,
            remaining_views: paste.maxViews
                ? Math.max(paste.maxViews - paste.views, 0)
                : null,
            expires_at: paste.expiresAt,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// view paste in HTML
export const viewPaste = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.status(404).send("Not Found");

    const now = getNow(req);

    if (
      (paste.expiresAt && now > paste.expiresAt.getTime()) ||
      (paste.maxViews && paste.views >= paste.maxViews)
    ) {
      return res.status(410).send("paste expired");
    }

    paste.views += 1;
    await paste.save();

    res.send(`
      <html>
        <body>
          <pre>${escapeHtml(paste.content)}</pre>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// health route
export const healthCheck = async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false });
    }
}


