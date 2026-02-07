import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"

export function NavBar({ items, actions, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-2 bg-white/60 border border-gray-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors",
                  "text-slate-600 hover:text-slate-900",
                  isActive && "bg-slate-100 text-slate-900",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-slate-900/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-slate-900/15 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-slate-900/15 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-slate-900/10 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>

        {actions && (
          <>
            <span className="hidden sm:block h-6 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-2 pr-1">
              {actions}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
