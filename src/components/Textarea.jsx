import PropTypes from "prop-types"

const Textarea = ({name, row, children, value, label, className, onChange}) => {
    // Use value if provided, otherwise fall back to children for backward compatibility
    const textareaValue = value !== undefined ? value : children;
    
    return (
        <div className="mt-5">
            <label className="block text-[16px] font-medium text-gray-800">
                {label}
            </label>
            <textarea 
                onChange={onChange} 
                className={`mt-2 block grow py-2.5 px-3 leading-7 text-justify text-base text-gray-900 placeholder:text-gray-400 border-custom w-7/8 rounded-lg ${className}`}
                name={name} 
                value={textareaValue || ''} 
                rows={row}>
            </textarea>
        </div>
    )
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default Textarea
