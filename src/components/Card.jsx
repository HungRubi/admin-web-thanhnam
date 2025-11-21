import { FileText } from "lucide-react";
import PropTypes from "prop-types";

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const  Card = ({ data, isOnClick, selected, isEditing, renameValue, onRenameChange }) => {

  return (
    <div 
      className={`
        w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-10px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-15px)] 
        bg-white shadow p-2 sm:p-3 cursor-pointer 
        transition-all duration-300 ease-in-out transform
        hover:scale-105 hover:shadow-xl
        ${selected ? "border-2 border-blue-500 bg-blue-50" : "border border-gray-200"}
      `}
      onClick={isOnClick}
    >

      <div className="w-full h-[100px] sm:h-[120px] bg-gray-100 overflow-hidden flex items-center justify-center">
        {data?.type === "file" && data?.path ? (
          <img 
            src={`${import.meta.env.VITE_SERVER_URL}/${data.path.replace(/\\/g, "/")}`}
            alt={data?.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <FileText className="w-12 h-12 text-gray-400" />
        )}
      </div>

      <input 
        className={`
          mt-2 font-medium text-xs sm:text-sm truncate py-1.5 sm:py-2 w-full
          ${isEditing 
            ? "border border-blue-500 rounded px-2 text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none" 
            : "border border-transparent bg-transparent"}
        `}
        type="text"
        value={isEditing ? renameValue : data?.name}
        onChange={(e) => {
          if (isEditing) {
            onRenameChange?.(e.target.value);
          }
        }}
        onClick={(e) => {
          if (isEditing) e.stopPropagation();
        }}
        readOnly={!isEditing}
        autoFocus={isEditing}
      />
        
      <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
        <span className="truncate pr-1">{data?.formatDate}</span>
        <span className="shrink-0">{formatSize(data?.size)}</span>
      </div>
    </div>
  );
}


Card.propTypes = {
    data: PropTypes.object.isRequired,
    isOnClick: PropTypes.func,
    selected: PropTypes.bool,
    isEditing: PropTypes.bool,
    renameValue: PropTypes.string,
    onRenameChange: PropTypes.func
}

export default Card
