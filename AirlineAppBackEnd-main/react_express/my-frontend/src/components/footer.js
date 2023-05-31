import React from 'react';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>
            <span>&copy; {year} Christopher Tidball &amp; Andrew Bush</span>
        </footer>
    );
}

export default Footer;