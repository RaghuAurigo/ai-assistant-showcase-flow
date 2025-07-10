import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function RFIForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const prefillData = location.state || {
    project: "",
    contractor: "",
    subject: "",
    question: ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "RFI Created Successfully",
      description: "Your RFI has been submitted and is awaiting response.",
    })
    navigate("/ai-assistant")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/ai-assistant")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Assistant
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">Create New RFI</h1>
          <p className="text-muted-foreground mt-2">
            Request for Information - Pre-filled by AI Assistant
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>RFI Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  defaultValue={prefillData.project}
                  className="bg-accent/50"
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contractor">Contractor</Label>
                <Input
                  id="contractor"
                  defaultValue={prefillData.contractor}
                  className="bg-accent/50"
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  defaultValue={prefillData.subject}
                  className="bg-accent/50"
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  defaultValue={prefillData.question}
                  rows={6}
                  className="resize-none"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Submit RFI
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/ai-assistant")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}