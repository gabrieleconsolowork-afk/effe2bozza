import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  parseHashHref,
  smoothScrollToId,
  smoothScrollToIdWhenReady,
  syncHash,
} from '../utils/smoothScroll'

function toHref(to) {
  if (typeof to === 'string') return to
  const path = to.pathname ?? '/'
  const hash = to.hash ?? ''
  return `${path}${hash}`
}

export default function SmoothHashLink({ to, onClick, children, ...props }) {
  const navigate = useNavigate()
  const location = useLocation()
  const href = toHref(to)
  const parsed = parseHashHref(href)
  const isHashLink = Boolean(parsed)

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !parsed) return

    event.preventDefault()

    const currentPath = location.pathname || '/'
    const samePage = currentPath === parsed.path

    if (samePage) {
      smoothScrollToId(parsed.id)
      if (location.hash !== `#${parsed.id}`) {
        syncHash(parsed.path, parsed.id)
      }
      return
    }

    navigate(
      { pathname: parsed.path, hash: `#${parsed.id}` },
      { preventScrollReset: true },
    )
  }

  return (
    <Link to={to} preventScrollReset onClick={isHashLink ? handleClick : onClick} {...props}>
      {children}
    </Link>
  )
}
