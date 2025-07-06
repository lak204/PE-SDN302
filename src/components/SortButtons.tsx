'use client'

import { ArrowUpAZ, ArrowDownAZ } from 'lucide-react'

interface SortButtonsProps {
  currentSort: 'asc' | 'desc'
  onSort: (sort: 'asc' | 'desc') => void
}

export default function SortButtons({ currentSort, onSort }: SortButtonsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onSort('asc')}
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          currentSort === 'asc'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ArrowUpAZ className="w-4 h-4 mr-2" />
        A-Z
      </button>
      
      <button
        onClick={() => onSort('desc')}
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          currentSort === 'desc'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ArrowDownAZ className="w-4 h-4 mr-2" />
        Z-A
      </button>
    </div>
  )
}
