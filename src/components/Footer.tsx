import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li><a href="/about">About Last.fm</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/jobs">Jobs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>HELP</h3>
          <ul>
            <li><a href="/track-music">Track My Music</a></li>
            <li><a href="/support">Community Support</a></li>
            <li><a href="/guidelines">Community Guidelines</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>GOODIES</h3>
          <ul>
            <li><a href="/scrobbler">Download Scrobbler</a></li>
            <li><a href="/api">Developer API</a></li>
            <li><a href="/free-music">Free Music Downloads</a></li>
            <li><a href="/merch">Merchandise</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>ACCOUNT</h3>
          <ul>
            <li><a href="/inbox">Inbox</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/pro">Last.fm Pro</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>FOLLOW US</h3>
          <div className="social-icons">
            <a href="https://facebook.com/lastfm" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/lastfm" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/lastfm" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/lastfm" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Last.fm Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}