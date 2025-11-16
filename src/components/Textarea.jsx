import PropTypes from "prop-types"

const Textarea = ({name, row, children,label, className, onChange}) => {
    return (
        <div className="mt-5">
            <label className="block text-[16px] font-medium text-gray-800">
                {label}
            </label>
            <textarea 
                onChange={onChange} 
                className={`mt-2 block grow py-2.5 px-3 leading-7 text-justify text-base text-gray-900 placeholder:text-gray-400 border-custom w-7/8 rounded-lg ${className}`}
                name={name} 
                defaultValue={children} 
                rows={row}>
            </textarea>
        </div>
    )
}

Textarea.protoTypes = {
    name: PropTypes.node.isRequired,
    row: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Textarea
