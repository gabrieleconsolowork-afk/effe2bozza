import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Logo({ className = '', showText = true, size = 'md', light = false, header = false }) {
  const iconSize = header ? 'h-10' : { sm: 'h-7', md: 'h-9', lg: 'h-11' }[size]
  const textClass = light ? 'text-white' : 'text-primary-dark'
  const wordmark = header ? 'Effe2' : 'EFFE2'
  const wordmarkSize = header
    ? "text-2xl sm:text-3xl"
    : size === 'lg'
      ? 'text-xl'
      : 'text-lg'

  return (
    <Link
      to="/#home"
      className={`inline-flex items-center gap-2.5 font-bold ${textClass} ${className}`}
    >
      <img
        src={logo}
        alt={showText ? '' : wordmark}
        className={`${iconSize} w-auto object-contain`}
        aria-hidden={showText}
      />
      {showText && (
        <span
          className={`${wordmarkSize} ${
            header ? "font-['Times_New_Roman',Times,serif] font-bold leading-none" : ''
          }`}
        >
          {wordmark}
        </span>
      )}
    </Link>
  )
}
