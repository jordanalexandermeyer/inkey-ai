import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

const LeftMenu = ({
  setShowMenu,
  children,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}) => {
  const menuRef = useRef<any>()

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div
      ref={menuRef}
      className="z-10 overflow-hidden absolute right-0 top-0 border border-gray-300 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export default LeftMenu
