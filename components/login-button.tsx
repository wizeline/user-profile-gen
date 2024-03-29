/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/rVQnOn8Uspa
 */
import { Button } from "@/components/ui/button"

export function LoginButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6 cursor-pointer">
      <div className="rounded-lg cursor-pointer">
        <Button onClick={onClick} className="rounded-full cursor-pointer">Sign In</Button>
      </div>
    </div>
  )
}
