import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Paperclip } from "lucide-react"
import { AIAssistantCard } from "@/components/AIAssistantCard"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function AIAssistantPanel() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [pendingCount, setPendingCount] = useState(3)
  const [showStatusCard, setShowStatusCard] = useState(true)
  const [showRFICard, setShowRFICard] = useState(true)

  const handleStatusReportAction = () => {
    toast({
      title: "✅ Report for Project A sent to ABC LLC and logged",
      description: "Status report has been successfully generated and delivered.",
    })
    setShowStatusCard(false)
    setPendingCount(prev => prev - 1)
  }

  const handleRFIAction = () => {
    navigate("/rfi-form", {
      state: {
        project: "Bridge Renovation",
        contractor: "Contractor XYZ",
        subject: "RFI: Rebar Placement Conflict (Pay Item #12-345)",
        question: "Per your request, please provide clarification on the rebar placement conflict at Pier 4, Section B, concerning Pay Item #12-345."
      }
    })
  }

  const handleReview = (title: string) => {
    toast({
      title: `📋 Reviewing ${title}`,
      description: "Opening review details...",
    })
  }

  const statusReportDescription = (
    <div>
      <p className="mb-3">Create and send the standard health report to the customer, ABC LLC. Needed for meeting today.</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Paperclip className="h-4 w-4" />
        <span>Project_A_Health_Report_Jan2025.pdf</span>
      </div>
    </div>
  )

  const rfiDescription = (
    <div>
      <p className="mb-2">AI detected a technical query from Contractor XYZ. Extracted details:</p>
      <ul className="space-y-1 text-sm">
        <li>• Pay Item: #12-345</li>
        <li>• Location: Pier 4, Section B</li>
        <li>• Issue: Rebar placement conflict</li>
      </ul>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
            <Badge variant="secondary" className="text-sm">
              {pendingCount} pending
            </Badge>
          </div>
          
          <div className="space-y-4">
            {showStatusCard && (
              <AIAssistantCard
                title="Project Status Report Request"
                subtitle="Project A"
                description={statusReportDescription}
                progress={92}
                progressColor="bg-green-500"
                priority="High"
                onPrimaryAction={handleStatusReportAction}
                onReview={() => handleReview("Project Status Report Request")}
                onRemove={() => {
                  setShowStatusCard(false)
                  setPendingCount(prev => prev - 1)
                  toast({
                    title: "🗑️ Task Removed",
                    description: "Project Status Report Request has been deleted.",
                  })
                }}
                className="animate-fade-in"
              />
            )}
            
            {showRFICard && (
              <AIAssistantCard
                title="Suggested Action: Create RFI"
                subtitle="Bridge Renovation"
                description={rfiDescription}
                progress={78}
                progressColor="bg-orange-500"
                priority="High"
                onPrimaryAction={handleRFIAction}
                onReview={() => handleReview("Suggested Action: Create RFI")}
                onRemove={() => {
                  setShowRFICard(false)
                  setPendingCount(prev => prev - 1)
                  toast({
                    title: "🗑️ Task Removed",
                    description: "RFI creation task has been deleted.",
                  })
                }}
                className="animate-fade-in"
              />
            )}
            
            {!showStatusCard && !showRFICard && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">All tasks completed!</p>
                <p className="text-sm mt-2">No pending AI assistant actions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}