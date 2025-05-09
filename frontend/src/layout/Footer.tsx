const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
                <ul className="footer__links">
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;