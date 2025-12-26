import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Plus,
  MessageCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const GenerateTickets: React.FC = () => {
  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      // For now, we'll use empty data until backend API is ready
      setTickets([]);

      // TODO: Replace with real API call when backend endpoint is ready
      // const response = await authAPI.getTickets();
      // setTickets(response.data);
    } catch (error: any) {
      console.error("Failed to load tickets:", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Generate Tickets</h1>
        </div>
        <Button className="bg-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" />
          Create New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Ticket */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl text-primary">
              Create Support Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter ticket subject" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Select Category</option>
                <option value="payment">Payment Issues</option>
                <option value="account">Account Related</option>
                <option value="commission">Commission Queries</option>
                <option value="technical">Technical Support</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full p-3 border border-gray-300 rounded-md h-32"
                placeholder="Describe your issue in detail..."
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary-dark">
              <MessageCircle className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Ticket Statistics */}
        <div className="space-y-6">
          <Card className="border-sky-200 bg-sky-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700">Open Tickets</p>
                  <p className="text-2xl font-bold text-sky-600">1</p>
                </div>
                <AlertCircle className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-sky-200 bg-sky-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700">In Progress</p>
                  <p className="text-2xl font-bold text-sky-600">1</p>
                </div>
                <MessageCircle className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">Resolved</p>
                  <p className="text-2xl font-bold text-purple-600">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ticket History */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Your Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          #{ticket.id}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Created: {ticket.created}
                          </span>
                          <span className="text-xs text-gray-500">
                            Updated: {ticket.updated}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <Badge
                          variant={
                            ticket.status === "Resolved"
                              ? "default"
                              : ticket.status === "In Progress"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            ticket.status === "Resolved"
                              ? "bg-sky-600"
                              : ticket.status === "In Progress"
                              ? "bg-sky-600"
                              : "bg-orange-500"
                          }
                        >
                          {ticket.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {ticket.priority}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateTickets;
