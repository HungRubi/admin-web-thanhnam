import PropTypes from "prop-types"

const Button = ({className, children, type, onClick}) => {
    return (
        <button type={type} onClick={onClick}
        className={`py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-3.5 flex items-center justify-center border-custom rounded-[5px] cursor-pointer transition duration-300 ease-linear text-xs sm:text-sm md:text-base ${className}`}>
            {children}
        </button>
    )
}

Button.protoTypes = {
    className: PropTypes.node.isRequired,
    type: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
}

export default Button