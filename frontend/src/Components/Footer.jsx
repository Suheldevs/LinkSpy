import React from 'react'

function Footer() {
  return (
    <div>
        {/* Footer Section */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} URL Shortener. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer