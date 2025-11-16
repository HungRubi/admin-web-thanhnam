import PropTypes from "prop-types";

const CircleButton = ({children, className, onClick}) => {
    return (
        <div className={`w-10 h-10 flex items-center justify-center bg-circle rounded-[50%] cursor-pointer ${className}`}
        onClick={onClick}>
            {children}
        </div>
    )
}

CircleButton.protoTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.fc,
    className: PropTypes.node.isRequired
}

export default CircleButton