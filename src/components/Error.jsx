import React from 'react'

function Error({error}) {
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-500 text-lg bg-gray-800 p-4 rounded-lg shadow-lg">
          {error}
        </p>
      </div>
    </div>
  )
}

export default Error