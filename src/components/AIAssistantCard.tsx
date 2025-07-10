import { useState } from "react";
import { Clock, Eye, Trash2, ThumbsUp, ThumbsDown, Loader2, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ReviewTaskModal } from "./ReviewTaskModal";
interface AIAssistantCardProps {
  title: string;
  subtitle: string;
  description: string | React.ReactNode;
  priority: "High" | "Medium" | "Low";
  onPrimaryAction: () => void;
  onRemove?: () => void;
  className?: string;
}
export function AIAssistantCard({
  title,
  subtitle,
  description,
  priority,
  onPrimaryAction,
  onRemove,
  className
}: AIAssistantCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { toast } = useToast();
  
  const handlePrimaryAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    onPrimaryAction();
    setIsLoading(false);
  };

  const handleThumbsUp = () => {
    setThumbsUpClicked(true);
    toast({
      description: "I am glad I was able to help",
      duration: 3000,
    });
    setTimeout(() => setThumbsUpClicked(false), 300);
  };

  const handleReview = () => {
    setShowReviewModal(true);
  };
  return <Card className={cn("relative", className)}>
      {isLoading && <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <Badge 
            variant={priority === "High" ? "destructive" : priority === "Medium" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={handlePrimaryAction}
          >
            Priority: {priority}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-3" onClick={handleReview}>
            <Eye className="h-4 w-4 mr-1" />
            Review
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3" onClick={onRemove}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Paperclip className="h-4 w-4 mr-1" />
            Attachment to be added
          </Button>
          <div className="flex-1" />
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 w-8 p-0 transition-all duration-300",
              thumbsUpClicked && "animate-scale-in text-green-600"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>

      <ReviewTaskModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        fullscreen={true}
        taskData={{
          emailSubject: title,
          project: subtitle,
          detectedIntent: title.includes("RFI") ? "Create RFI" : title.includes("Status") ? "Create Status Report" : "Create Health Report",
          confidence: 85,
          proposedAction: `Generate ${title}`,
          draftContent: typeof description === 'string' ? description : title,
          originalEmail: "Original email content here...",
          saveLocation: `/documents/${title.toLowerCase().replace(/\s+/g, '-')}`
        }}
      />
    </Card>;
}