import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">AI Assistant Prototype</CardTitle>
          <CardDescription>
            High-fidelity interactive prototype showcasing AI-powered workflows
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Experience two distinct AI workflows:</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• One-click status report generation</li>
            <li>• Intelligent RFI creation with context extraction</li>
          </ul>
          <Button asChild className="w-full">
            <Link to="/ai-assistant">
              Open AI Assistant Panel
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
