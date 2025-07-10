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
  const [currentReviewTask, setCurrentReviewTask] = useState<string>("")

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
    if (title === "Project Status Report Request" || title === "Suggested Action: Create RFI") {
      setCurrentReviewTask(title)
      setIsReviewModalOpen(true)
    } else {
      toast({
        title: `📋 Reviewing ${title}`,
        description: "Opening review details...",
      })
    }
  }

  const statusReportTaskData = {
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

  const rfiTaskData = {
    emailSubject: "RFI: Rebar Placement Conflict",
    project: "Bridge Renovation",
    detectedIntent: "Create RFI",
    confidence: 89,
    proposedAction: "Generate RFI form for rebar placement conflict at Pier 4, Section B",
    draftContent: `RFI Form - Bridge Renovation Project

Project: Bridge Renovation
Contractor: Contractor XYZ
Subject: RFI: Rebar Placement Conflict (Pay Item #12-345)

Question:
Per your request, please provide clarification on the rebar placement conflict at Pier 4, Section B, concerning Pay Item #12-345.

The current drawings show conflicting rebar specifications that need to be resolved before we can proceed with the concrete pour scheduled for next week.`,
    originalEmail: `From: contractor.xyz@email.com
To: projectmanager@company.com
Subject: Question about Pier 4 Rebar

Hi Project Team,

We've encountered an issue with the rebar placement at Pier 4, Section B. The drawings show conflicting specifications for Pay Item #12-345. Can you provide clarification?

Thanks,
Contractor XYZ`,
    saveLocation: "Bridge Renovation - RFI_Forms"
  }

  const getCurrentTaskData = () => {
    return currentReviewTask === "Suggested Action: Create RFI" ? rfiTaskData : statusReportTaskData
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

  // Half-screen minimized view
  if (!isExpanded) {
    return (
      <div className="fixed right-0 top-0 bottom-0 z-50 w-1/2">
        <div className="bg-background border-l border-border shadow-lg h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Assistant</h3>
              <Badge variant="secondary">
                {pendingCount}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              Expand
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {showStatusCard && (
              <div className="border border-border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                   onClick={() => setIsExpanded(true)}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">Project Status Report Request</h4>
                  <Badge variant="outline" className="text-xs">High</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Create and send the standard health report to the customer, ABC LLC. Needed for meeting today.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                  <span>Project_A_Health_Report_Jan2025.pdf</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">92%</span>
                </div>
              </div>
            )}
            
            {showRFICard && (
              <div className="border border-border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                   onClick={() => setIsExpanded(true)}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">Suggested Action: Create RFI</h4>
                  <Badge variant="outline" className="text-xs">High</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  AI detected a technical query from Contractor XYZ. Extracted details:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                  <li>• Pay Item: #12-345</li>
                  <li>• Location: Pier 4, Section B</li>
                  <li>• Issue: Rebar placement conflict</li>
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">78%</span>
                </div>
              </div>
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
                  priority="High"
                  onPrimaryAction={handleStatusReportAction}
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
                  priority="High"
                  onPrimaryAction={handleRFIAction}
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
        taskData={getCurrentTaskData()}
      />
    </>
  )
}