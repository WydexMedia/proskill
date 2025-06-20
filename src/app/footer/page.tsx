'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12" style={{ zIndex: 10, marginTop: '50px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Get started now!</h2>
          <p className="text-gray-400">It takes less than a minute of your time.</p>
          <a
            href="https://wa.me/917034688802"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block border border-white py-2 px-6 hover:bg-white hover:text-black transition"
          >
            Chat on WhatsApp →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-300 text-center md:text-left">
          <div>
            <h4 className="font-bold text-white mb-2">Contact</h4>
            <ul className="space-y-1">
              <li>WhatsApp: 7034688802</li>
              <li>Email: proskilledu@gmail.com</li>
              <li>
                <a href="https://www.instagram.com/the.proskill/?hl=en" target="_blank" rel="noopener noreferrer">
                  Instagram: @the.proskill
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-6 text-gray-500 text-xl">
          <a href="https://wa.me/917034688802" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} className="hover:text-white" />
          </a>
          <a href="mailto:proskilledu@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} className="hover:text-white" />
          </a>
          <a href="https://www.instagram.com/the.proskill/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="hover:text-white" />
          </a>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>ProSkill © {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
