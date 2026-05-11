import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <div>
            <h4>Follow Us</h4>
            <div className="social" aria-label="Social media">
              <span aria-label="Facebook">f</span>
              <span aria-label="Instagram">ig</span>
              <span aria-label="YouTube">yt</span>
            </div>
          </div>

          <FooterColumn
            title="About Us"
            items={["Who We Are", "Shipping Terms", "Terms & Conditions", "Returns & warranty", "Data Policy"]}
          />
          <FooterColumn
            title="Contact"
            items={["Email: support@peakfit.com", "WhatsApp: +1 347 829 5612", "Phone: +1 347 829 5600"]}
          />
          <FooterColumn title="Help" items={["Where is my order?", "Size Guide", "PQRs"]} />
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  items: string[];
};

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;