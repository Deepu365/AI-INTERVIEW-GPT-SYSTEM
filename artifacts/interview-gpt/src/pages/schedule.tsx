import { useListSchedule, useCreateScheduledInterview, useDeleteScheduledInterview } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Building, Plus, Trash2, MapPin, Video, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Schedule() {
  const { data: schedule, isLoading, refetch } = useListSchedule();
  const createMutation = useCreateScheduledInterview();
  const deleteMutation = useDeleteScheduledInterview();
  const { toast } = useToast();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState<any>("technical");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleCreate = () => {
    if (!company || !role || !date || !time) return;
    
    // Combine date and time
    const scheduledAt = new Date(`${date}T${time}`).toISOString();

    createMutation.mutate(
      { data: { company, role, type, scheduledAt, notes } },
      {
        onSuccess: () => {
          setCompany("");
          setRole("");
          setDate("");
          setTime("");
          setNotes("");
          toast({ title: "Interview scheduled!" });
          refetch();
        }
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "Interview removed" });
        refetch();
      }
    });
  };

  const getTypeIcon = (t: string) => {
    switch(t) {
      case 'onsite': return <MapPin className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Schedule</h1>
        <p className="text-muted-foreground mt-1">Keep track of your upcoming interviews and logistics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Add Interview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Google" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Frontend Engineer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="hr">HR / Behavioral</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="phone">Phone Screen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes / Logistics</label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Zoom link, interviewer name, etc." className="resize-none" />
              </div>
              <Button className="w-full" onClick={handleCreate} disabled={createMutation.isPending || !company || !date || !time}>
                {createMutation.isPending ? "Adding..." : "Schedule Interview"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Upcoming</h2>
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground border rounded-lg">Loading schedule...</div>
          ) : !schedule?.length ? (
            <div className="p-12 text-center border border-dashed rounded-lg bg-muted/20">
              <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No upcoming interviews</h3>
              <p className="text-muted-foreground text-sm mt-1">Add your scheduled interviews on the left to track them here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedule.map(item => {
                const dateObj = new Date(item.scheduledAt);
                return (
                  <Card key={item.id} className="relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                    <CardContent className="p-0 flex flex-col sm:flex-row">
                      {/* Date Block */}
                      <div className="bg-muted/30 p-6 flex flex-col justify-center items-center min-w-[120px] border-b sm:border-b-0 sm:border-r">
                        <span className="text-xs font-bold uppercase text-primary tracking-wider">{format(dateObj, 'MMM')}</span>
                        <span className="text-3xl font-black text-foreground leading-none my-1">{format(dateObj, 'dd')}</span>
                        <span className="text-xs text-muted-foreground font-medium">{format(dateObj, 'EEEE')}</span>
                      </div>
                      
                      {/* Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                              {item.company}
                            </h3>
                            <p className="text-muted-foreground font-medium">{item.role}</p>
                          </div>
                          <Badge variant="outline" className="capitalize flex items-center gap-1 bg-background">
                            {getTypeIcon(item.type)} {item.type}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {format(dateObj, 'h:mm a')}
                          </div>
                        </div>

                        {item.notes && (
                          <div className="mt-4 text-sm bg-muted/50 p-3 rounded border text-muted-foreground italic">
                            {item.notes}
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
