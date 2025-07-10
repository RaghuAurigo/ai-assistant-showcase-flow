import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Paperclip, Maximize2, Minimize2, MessageSquare } from "lucide-react"
import { AIAssistantCard } from "@/components/AIAssistantCard"
import { ReviewTaskModal } from "@/components/ReviewTaskModal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AIAssistantPanel() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [pendingCount, setPendingCount] = useState(3)
  const [showStatusCard, setShowStatusCard] = useState(true)
  const [showRFICard, setShowRFICard] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

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
    if (title === "Project Status Report Request") {
      setIsReviewModalOpen(true);
    } else {
      toast({
        title: `📋 Reviewing ${title}`,
        description: "Opening review details...",
      });
    }
  }

  const taskData = {
    emailSubject: "Project X Health Report Request",
    project: "Highway Expansion Phase 2",
    detectedIntent: "Generate Report",
    confidence: 92,
    proposedAction: "Create monthly health report with current progress metrics",
    draftContent: `Project Health Report - Highway Expansion Phase 2

Current Status: On Track
Budget Utilization: 67%
Timeline Progress: 92%
Quality Metrics: Excellent
Risk Assessment: Low

Key Accomplishments this month:
- Completed foundation work for Section A
- Environmental compliance review passed
- Material procurement on schedule

Upcoming Milestones:
- Begin roadway paving next week
- Safety inspection scheduled for end of month
- Final electrical work to commence`,
    originalEmail: `From: client@abcllc.com
To: projectmanager@company.com
Subject: Project X Health Report Request

Hi Team,

We need the monthly health report for Project X (Highway Expansion Phase 2) for tomorrow's board meeting. Can you please send the latest status update including budget utilization and timeline progress?

Thanks,
ABC LLC Project Team`,
    saveLocation: "Highway Expansion Phase 2 - health_reports"
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

  // Chatbot collapsed view
  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-background border border-border rounded-lg shadow-lg w-80 max-h-96 overflow-hidden">
          {/* Chatbot Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <Badge variant="secondary" className="text-xs">
                {pendingCount}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsExpanded(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chatbot Content - Preview */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {showStatusCard && (
              <div className="text-sm border-l-2 border-l-primary pl-3 py-2 bg-muted/30 rounded-r cursor-pointer hover:bg-muted/50 transition-colors"
                   onClick={() => setIsExpanded(true)}>
                <p className="font-medium">Project Status Report Request</p>
                <p className="text-xs text-muted-foreground">Project A - Priority: High</p>
              </div>
            )}
            
            {showRFICard && (
              <div className="text-sm border-l-2 border-l-orange-500 pl-3 py-2 bg-muted/30 rounded-r cursor-pointer hover:bg-muted/50 transition-colors"
                   onClick={() => setIsExpanded(true)}>
                <p className="font-medium">Create RFI</p>
                <p className="text-xs text-muted-foreground">Bridge Renovation - Priority: High</p>
              </div>
            )}
            
            {!showStatusCard && !showRFICard && (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">All tasks completed!</p>
              </div>
            )}
            
            <div className="text-center pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsExpanded(true)}
                className="text-xs"
              >
                View All Tasks
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full expanded view
  return (
    <>
      <div className="fixed inset-0 z-50 bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl h-full overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {pendingCount} pending
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="gap-2"
                >
                  <Minimize2 className="h-4 w-4" />
                  Minimize
                </Button>
              </div>
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

      {/* Review Modal */}
      <ReviewTaskModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        taskData={taskData}
      />
    </>
  )
}