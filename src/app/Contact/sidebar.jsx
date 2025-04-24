'use client'


export const Sidebar = () => {
    return (
        <div className="flex h-screen pt-28">
        {/* Sidebar */}
        <div className="w-64 bg-blue-900 text-white p-5">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <ul className="space-y-4">
            <li>🏠 Home</li>
            <li>📊 Analytics</li>
            <li>⚙️ Settings</li>
          </ul>
          </div>
        </div>
    )

}