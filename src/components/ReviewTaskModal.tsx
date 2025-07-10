import { useState } from "react";
import { X, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface ReviewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function ReviewTaskModal({ isOpen, onClose, taskData }: ReviewTaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(taskData.draftContent);

  const handleFinalize = () => {
    // Handle finalize action
    onClose();
  };

  const handleDiscard = () => {
    // Handle discard action
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

          {/* Content Tabs */}
          <Tabs defaultValue="draft" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="draft">AI Draft Content</TabsTrigger>
              <TabsTrigger value="original">Original Email</TabsTrigger>
            </TabsList>
            
            <TabsContent value="draft" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Draft Content for Review</h3>
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
            </TabsContent>
            
            <TabsContent value="original" className="space-y-4">
              <h3 className="text-lg font-semibold">Original Email</h3>
              <div className="bg-muted/20 rounded-lg p-4 border">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {taskData.originalEmail}
                </pre>
              </div>
            </TabsContent>
          </Tabs>

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
              <Button variant="destructive" onClick={handleDiscard}>
                <X className="h-4 w-4 mr-2" />
                Discard
              </Button>
              <Button onClick={handleFinalize} className="bg-primary text-primary-foreground">
                <span className="mr-2">📋</span>
                Finalize & Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}