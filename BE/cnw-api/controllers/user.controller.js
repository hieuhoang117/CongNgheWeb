import { sql } from "../db.js";

export const checkEmail = async (req, res) => {
  const { email } = req.body;

  const result = await sql.query`
    SELECT Email, Role FROM Users WHERE Email = ${email}
  `;

  if (result.recordset.length > 0) {
    const user = result.recordset[0];

    res.json({
      exists: true,
      role: user.Role,
    });
  } else {
    res.json({ exists: false });
  }
};