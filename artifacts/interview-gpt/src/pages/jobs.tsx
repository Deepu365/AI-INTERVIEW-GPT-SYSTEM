import { useListJobDescriptions, useAnalyzeJobDescription } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, CheckCircle2, XCircle, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/page-header";

export default function Jobs() {
  const { data: jobs, isLoading, refetch } = useListJobDescriptions();
  const analyzeMutation = useAnalyzeJobDescription();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");

  const handleAnalyze = () => {
    if (!title || !company || !content) return;
    analyzeMutation.mutate({ data: { title, company, content } }, {
      onSuccess: () => {
        setTitle("");
        setCompany("");
        setContent("");
        toast({ title: "Job analyzed successfully" });
        refetch();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50/60 to-indigo-50">
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        icon={<Briefcase className="w-7 h-7 text-white" />}
        title="Job Match Analyzer"
        description="Paste any job description to see your skill match %, gaps, and what to learn next."
        gradient="from-cyan-600 via-blue-500 to-indigo-500"
        iconBg="bg-white/20"
        badge="Placement Predictor"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analyze New Job</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Frontend Engineer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Acme Corp" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Description</label>
                <Textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  placeholder="Paste the full job description here..."
                  className="h-48 resize-none text-sm"
                />
              </div>
              <Button className="w-full" onClick={handleAnalyze} disabled={analyzeMutation.isPending || !title || !company || !content}>
                {analyzeMutation.isPending ? "Analyzing..." : "Find Skill Gaps"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Analyzed Roles</h2>
          {isLoading ? (
            <div className="p-8 text-center border rounded-lg text-muted-foreground">Loading...</div>
          ) : !jobs?.length ? (
            <div className="p-12 text-center border border-dashed rounded-lg bg-muted/20">
              <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No jobs analyzed</h3>
              <p className="text-muted-foreground text-sm mt-1">Paste a job description to see how well you match.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <Card key={job.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row border-b">
                    <div className="flex-1 p-5 bg-muted/10">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
                        <Building className="w-4 h-4" /> {job.company}
                      </div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                    </div>
                    <div className="bg-primary/5 p-5 flex items-center justify-center min-w-[150px] border-l">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary flex items-center justify-center">
                          {job.matchScore} <Percent className="w-5 h-5 opacity-50 ml-1" />
                        </div>
                        <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-1">Match Score</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-green-600 dark:text-green-500">
                        <CheckCircle2 className="w-4 h-4" /> Skills You Have
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.matchedSkills?.map(s => (
                          <Badge key={s} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">{s}</Badge>
                        ))}
                        {!job.matchedSkills?.length && <span className="text-sm text-muted-foreground">None matched</span>}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-destructive">
                        <XCircle className="w-4 h-4" /> Missing Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.missingSkills?.map(s => (
                          <Badge key={s} variant="outline" className="text-destructive border-destructive/30 bg-destructive/5">{s}</Badge>
                        ))}
                        {!job.missingSkills?.length && <span className="text-sm text-muted-foreground">Perfect match!</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
