import "./US_footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const USFooter = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.facebook.com/Netflix" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/Netflix" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://twitter.com/Netflix" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://www.youtube.com/@Netflix" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                </a>
            </div>

            <div className="footer-links">
                <div>
                    <p>Mô tả âm thanh</p>
                    <p>Quan hệ với nhà đầu tư</p>
                    <p>Thông báo pháp lý</p>
                </div>

                <div>
                    <p>Trung tâm trợ giúp</p>
                    <p>Việc làm</p>
                    <p>Tùy chọn cookie</p>
                </div>

                <div>
                    <p>Thẻ quà tặng</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Thông tin doanh nghiệp</p>
                </div>

                <div>
                    <p>Trung tâm đa phương tiện</p>
                    <p>Quyền riêng tư</p>
                    <p>Liên hệ với chúng tôi</p>
                </div>
            </div>

            <p className="copyright">© 1997-2026 Netflix, Inc.</p>
        </footer>
    );
};

export default USFooter;