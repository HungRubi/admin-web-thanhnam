import PropTypes from "prop-types"

const Empty = ({title, subTitle}) => {
    return (
        <tr>
            <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center py-8">
                    <img src="/loading.gif" alt="loading gif"/>
                    <p className="text-lg font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{subTitle}</p>
                </div>
            </td>
        </tr>
    )
}

Empty.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
}

export default Empty