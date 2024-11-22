import React from 'react'
import Image from 'next/image'

interface MusicItemProps {
  id: number
  image: string
  title: string
  subtitle: string
}

interface ListMusicItemProps {
  items: MusicItemProps[]
  onItemClick?: (id: number) => void
}

const ListMusicItem: React.FC<ListMusicItemProps> = ({ items, onItemClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
          onClick={() => onItemClick && onItemClick(item.id)} // Trigger click event
        >
          <Image
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-lg object-cover"
            width={80} height={80}
          />
          <div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListMusicItem

// import React from 'react';
// import Image from 'next/image';

// interface MusicItemProps {
//   id: number;
//   image: string;
//   title: string;
//   subtitle: string;
// }

// interface ListMusicItemProps {
//   items: MusicItemProps[];
//   onItemClick?: (id: number) => void;
// }

// const ListMusicItem: React.FC<ListMusicItemProps> = ({ items, onItemClick }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid layout */}
//       {items.map((item) => (
//         <div
//           key={item.id}
//           className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200"
//           onClick={() => onItemClick && onItemClick(item.id)} // Trigger click event
//         >
//           <Image
//             src={item.image}
//             alt={item.title}
//             className="w-full h-40 rounded-lg object-cover" // Adjusted consistent size
//             width={160}
//             height={160}
//           />
//           <div className="mt-2">
//             <h3
//               className="text-lg font-semibold text-white truncate" // Truncate long titles
//               title={item.title} // Tooltip on hover for full title
//             >
//               {item.title}
//             </h3>
//             <p className="text-sm text-gray-400 truncate" title={item.subtitle}>
//               {item.subtitle}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ListMusicItem;
