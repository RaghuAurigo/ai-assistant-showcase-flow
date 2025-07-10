import { useState } from "react";
import { X, Edit, Paperclip, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface ReviewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullscreen?: boolean;
  taskData: {
    emailSubject: string;
    project: string;
    detectedIntent: string;
    confidence: number;
    proposedAction: string;
    draftContent: string;
    originalEmail: string;
    saveLocation: string;
  };
}

export function ReviewTaskModal({ isOpen, onClose, fullscreen = false, taskData }: ReviewTaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(taskData.draftContent);
  
  const isRFITask = taskData.detectedIntent === "Create RFI";

  const handleFinalize = () => {
    // Handle finalize action
    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={fullscreen ? "max-w-full max-h-full w-screen h-screen overflow-y-auto m-0 rounded-none" : "max-w-4xl max-h-[90vh] overflow-y-auto"}>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs">👁️</span>
            </div>
            <h2 className="text-xl font-semibold">Review AI-Generated Task</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Summary */}
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Task Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Email Subject</p>
                    <p className="font-medium">{taskData.emailSubject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Detected Intent</p>
                    <p className="font-medium">{taskData.detectedIntent}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-medium">{taskData.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                    <div className="flex items-center gap-2">
                      <Progress value={taskData.confidence} className="flex-1" />
                      <span className="text-sm font-medium">{taskData.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Proposed Action</p>
              <p className="font-medium">{taskData.proposedAction}</p>
            </div>
          </div>

          {/* Content Section */}
          {isRFITask ? (
            // RFI Content
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Contractor</p>
                    <p className="font-medium">Contractor XYZ</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Priority</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="bg-red-500 text-white">High</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Question/Clarifications Required</p>
                  <Textarea
                    value="Per your request, please provide clarification on the rebar placement conflict at Pier 4, Section B, concerning Pay Item #12-345."
                    rows={4}
                    className="resize-none"
                    readOnly
                  />
                </div>

                {/* Impact Assessment */}
                <div className="bg-muted/20 rounded-lg p-4 border">
                  <h4 className="font-semibold mb-4">Impact Assessment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Impact on Scope</p>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Impact to Schedule</p>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">High</Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Impact of Budget</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Low</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // AI Draft Content Only
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">AI Draft Content</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  {isEditing ? "Stop Editing" : "Edit"}
                </Button>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4 border">
                {isEditing ? (
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                    placeholder="Edit the draft content..."
                  />
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {editedContent}
                  </pre>
                )}
              </div>
              
              {/* Attachments Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Attachments</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Add Attachment
                  </Button>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-4 border">
                  <div className="space-y-3">
                    {/* Sample attachments */}
                    <div className="flex items-center gap-3 p-2 rounded border bg-background">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Project_Health_Report_Q4.pdf</span>
                      <Badge variant="secondary" className="text-xs">PDF</Badge>
                      <div className="ml-auto text-xs text-muted-foreground">2.3 MB</div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded border bg-background">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Budget_Variance_Analysis.xlsx</span>
                      <Badge variant="secondary" className="text-xs">XLSX</Badge>
                      <div className="ml-auto text-xs text-muted-foreground">1.8 MB</div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded border bg-background">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Site_Photos_Latest.zip</span>
                      <Badge variant="secondary" className="text-xs">ZIP</Badge>
                      <div className="ml-auto text-xs text-muted-foreground">15.2 MB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              This will be saved to: <span className="font-medium">{taskData.saveLocation}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleFinalize} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <span className="mr-2">📋</span>
                {isRFITask ? "Create RFI" : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}