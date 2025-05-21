import formatBalance from '../utils/formatBalance'

/**
 * DisplayPanel component for showing messages to user
 * @param {object} props
 * @param {string} props.msg - The message to display
 * @param {string} props.textColorClass - Tailwind class for text color
 * @param {number} props.balance - Current balance
 */
function DisplayPanel({ msg, textColorClass, balance }) {
  return (
    <div className='bg-gray-800 text-white p-4 rounded-lg shadow-inner text-center'>
      <pre
        className={`text-lg sm:text-xl font-medium min-h-[3em] flex items-center justify-center whitespace-pre-wrap ${textColorClass}`}
      >
        {msg}
      </pre>
      <p className='text-2xl sm:text-3xl font-bold mt-1'>
        Balance: {formatBalance(balance)}
      </p>
    </div>
  )
}

export default DisplayPanel
