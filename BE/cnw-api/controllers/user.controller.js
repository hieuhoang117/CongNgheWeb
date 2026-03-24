import e from "cors";
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
export const getUsers = async (req, res) => {
  const result = await sql.query("SELECT * FROM Users");
  res.json(result.recordset);
};

export const addUser = async (req, res) => {
  try {
    const {UserID
      ,FullName
      ,Email
      ,PasswordHash
      ,Phone
      ,Role
      ,CreatedAt
      ,Status } = req.body;

    await sql.query`
      INSERT INTO Users (UserID, FullName, Email, PasswordHash, Phone, Role, CreatedAt, Status)
      VALUES (${UserID}, ${FullName}, ${Email}, ${PasswordHash}, ${Phone}, ${Role}, ${CreatedAt}, ${Status})
    `;

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteUser = async (req, res) => {
  try {    const id = req.params.id;

    await sql.query`
      DELETE FROM Users WHERE UserID = ${id}
    `;  
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  } 
};

export const fixUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    
    await sql.query`
      UPDATE Users SET
        FullName = ${data.FullName},
        Email = ${data.Email},
        PasswordHash = ${data.PasswordHash},
        Phone = ${data.Phone},
        Role = ${data.Role},
        Status = ${data.Status}
      WHERE UserID = ${id}
    `;
    res.json({ message: "User updated successfully" });
  }
  catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await sql.query`
      SELECT * FROM Users 
      WHERE Email LIKE '%' + ${email} + '%'
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};