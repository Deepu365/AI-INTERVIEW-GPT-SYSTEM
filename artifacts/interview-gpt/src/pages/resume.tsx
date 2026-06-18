import { useListResumes, useCreateResume, useDeleteResume } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, CheckCircle2, XCircle, AlertCircle, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Resume() {
  const { data: resumes, isLoading, refetch } = useListResumes();
  const createMutation = useCreateResume();
  const deleteMutation = useDeleteResume();
  const { toast } = useToast();

  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("My_Resume.txt");

  const handleAnalyze = () => {
    if (!content.trim()) return;
    createMutation.mutate({ data: { content, fileName } }, {
      onSuccess: () => {
        setContent("");
        toast({ title: "Resume analyzed successfully!" });
        refetch();
      }
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "Resume deleted" });
        refetch();
      }
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Upload/Paste Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
          <p className="text-muted-foreground mt-1">Get an instant ATS score and targeted feedback.</p>
        </div>

        <Card className="border-primary/20 shadow-sm">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              New Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resume Name</label>
              <Input value={fileName} onChange={e => setFileName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Paste Resume Content</label>
              <Textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                placeholder="Paste your plain text resume here..."
                className="h-[300px] resize-none font-mono text-sm"
              />
            </div>
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleAnalyze}
              disabled={!content.trim() || createMutation.isPending}
            >
              {createMutation.isPending ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* History & Results */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-xl font-semibold">Your Analyzed Resumes</h2>
        
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground border rounded-lg">Loading...</div>
        ) : !resumes?.length ? (
          <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No resumes analyzed yet. Paste your resume text on the left to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map(resume => (
              <Card key={resume.id} className="overflow-hidden">
                <CardHeader className="p-4 bg-muted/30 flex flex-row items-center justify-between border-b">
                  <div>
                    <CardTitle className="text-base">{resume.fileName}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{resume.atsScore}%</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">ATS Score</div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(resume.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                  
                  {resume.suggestions?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" /> Key Suggestions
                      </h4>
                      <ul className="text-sm space-y-2">
                        {resume.suggestions.slice(0, 3).map((s, i) => (
                          <li key={i} className="text-muted-foreground bg-orange-500/5 p-2 rounded border border-orange-500/10">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" /> Found Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {resume.skills?.slice(0, 8).map(s => (
                          <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                        ))}
                        {resume.skills?.length > 8 && <Badge variant="secondary" className="text-[10px]">+{resume.skills.length - 8} more</Badge>}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-destructive" /> Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {resume.missingSkills?.map(s => (
                          <Badge key={s} variant="outline" className="text-[10px] text-destructive border-destructive/30">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
