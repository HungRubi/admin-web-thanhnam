import PropTypes from "prop-types"

const InputGroup = ({label, icon, name, value, pattern, type, placeholder, helper, onChange, max}) => {
    return (
        <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    {icon}
                </div>
                <input 
                    type={type} 
                    id="zip-input" 
                    aria-describedby="helper-text-explanation" 
                    name={name} 
                    value={value} 
                    min={type === "number" ? "0" : ""} 
                    max={max}
                    className="w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder={placeholder} 
                    pattern={pattern} 
                    onChange={onChange} 
                    required 
                />
            </div>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
        </div>
    )
}

InputGroup.propTypes = {
    label: PropTypes.node.isRequired,
    helper: PropTypes.node.isRequired,
    placeholder: PropTypes.node.isRequired,
    icon: PropTypes.node.isRequired,
    name: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    pattern: PropTypes.node,
    type: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    max: PropTypes.number
}

export default InputGroup