const sql = require("mssql");

const config = {
    user: "sa",
    password: "hieuday2403",
    server: "MSICUAHIEU",
    database: "BTLWeb",
    options: {
        instanceName: "MAY1",
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log("Kết nối SQL Server thành công!");
    } catch (err) {
        console.error("Lỗi kết nối:", err);
    }
}

module.exports = { sql, connectDB };