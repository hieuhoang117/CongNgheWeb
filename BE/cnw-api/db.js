import sql from "mssql";

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

export async function connectDB() {
    try {
        await sql.connect(config);
        console.log("Kết nối SQL Server thành công!");
    } catch (err) {
        console.error("Lỗi kết nối:", err);
    }
}

export { sql };