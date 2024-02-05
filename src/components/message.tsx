
import { Separator } from "@/components/ui/separator"

export function Message() {
  return (
    <div
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      💧 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:inline">
        Verify airdrop now!
      </span>
    </div>
  )
}
