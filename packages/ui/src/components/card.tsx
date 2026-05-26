import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 })
  const [perspectiveOrigin, setPerspectiveOrigin] = React.useState("50% 50%")
  const [boxShadow, setBoxShadow] = React.useState("0 4px 12px rgba(0, 0, 0, 0.15)")
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // マウス位置を正規化 (-1 ~ 1)
    const normalizedX = (x - centerX) / centerX
    const normalizedY = (y - centerY) / centerY
    
    // マウス位置に応じて perspective-origin を動的に設定
    const perspX = 50 + normalizedX * 15
    const perspY = 50 + normalizedY * 15
    setPerspectiveOrigin(`${perspX}% ${perspY}%`)
    
    // 回転は反対方向（沈むような挙動）
    const rotateX = -normalizedY * 15
    const rotateY = normalizedX * 15
    
    setRotate({ x: rotateX, y: rotateY })
    
    // 影をマウス位置の反対方向に設定（正面に近い影）
    const shadowX = -normalizedX * 20
    const shadowY = -normalizedY * 20
    const shadowBlur = 20
    const shadowSpread = 0
    setBoxShadow(`
      ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.2),
      0 0 ${shadowBlur * 1.5}px -${shadowBlur / 1.5}px rgba(0, 0, 0, 0.1)
    `)
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setPerspectiveOrigin("50% 50%")
    setBoxShadow("0 4px 12px rgba(0, 0, 0, 0.15)")
  }

  return (
    <div
      ref={cardRef}
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-6 overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 dark:bg-white/8 py-6 text-sm text-card-foreground ring-1 ring-white/20 dark:ring-white/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl shadow-sm shadow-black/20 dark:shadow-black/30 transition-all duration-300 ease-out will-change-transform hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/20 hover:-translate-y-1",
        className
      )}
      style={{
        perspective: '1200px',
        perspectiveOrigin: perspectiveOrigin,
        transform: `rotateX(${rotate.x / 2}deg) rotateY(${rotate.y / 2}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
