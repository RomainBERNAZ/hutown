import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="link-mentions">
                <ul>
                    <a href="/mentions-legales"><li>Mentions légales</li></a>
                    <a href="/conditions-utilisation"><li>Conditions générales d'utilisation</li></a>
                    <a href="/conditions-vente"><li>Conditions générales de vente</li></a>
                </ul>
            </div>
        </div>
    );
};

export default Footer;