import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
                description="Create and send the standard health report to the customer, ABC LLC."
                progress={92}
                progressColor="bg-green-500"
                primaryAction="Generate & Send"
                onPrimaryAction={handleStatusReportAction}
                onRemove={() => {
                  setShowStatusCard(false)
                  setPendingCount(prev => prev - 1)
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
                primaryAction="Create RFI Draft"
                onPrimaryAction={handleRFIAction}
                onRemove={() => {
                  setShowRFICard(false)
                  setPendingCount(prev => prev - 1)
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