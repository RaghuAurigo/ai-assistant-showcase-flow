import { useState } from "react";
import { Clock, Eye, Edit, Trash2, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
interface AIAssistantCardProps {
  title: string;
  subtitle: string;
  description: string | React.ReactNode;
  progress: number;
  progressColor?: string;
  primaryAction: string;
  onPrimaryAction: () => void;
  onRemove?: () => void;
  className?: string;
}
export function AIAssistantCard({
  title,
  subtitle,
  description,
  progress,
  progressColor = "bg-primary",
  primaryAction,
  onPrimaryAction,
  onRemove,
  className
}: AIAssistantCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handlePrimaryAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    onPrimaryAction();
    setIsLoading(false);
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
          <Button variant="outline" size="sm" className="bg-background border-border text-foreground hover:bg-accent" onClick={handlePrimaryAction} disabled={isLoading}>
            {primaryAction}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
        
        
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>;
}