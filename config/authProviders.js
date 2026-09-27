import { Globe2, CircleUserRound, MessageCircle, Code2 } from "lucide-react"

export const authProviders = [
  { id: "google", name: "Google", icon: Globe2, enabled: false },
  { id: "apple", name: "Apple", icon: CircleUserRound, enabled: false },
  { id: "facebook", name: "Facebook", icon: MessageCircle, enabled: false },
  { id: "github", name: "GitHub", icon: Code2, enabled: false },
]

export default authProviders
 
