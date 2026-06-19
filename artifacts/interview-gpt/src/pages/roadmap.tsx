import { useGetLearningRoadmap } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Map, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export default function Roadmap() {
  const { data: roadmap, isLoading } = useGetLearningRoadmap();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50/60 to-purple-50">
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        icon={<Map className="w-7 h-7 text-white" />}
        title="Learning Roadmap"
        description="Your personalized 8-week path to interview readiness based on your target role and skills."
        gradient="from-indigo-600 via-violet-500 to-purple-500"
        iconBg="bg-white/20"
        badge="Personalized"
      />

      {isLoading ? (
        <div className="text-center p-12 text-muted-foreground">Generating your personalized roadmap...</div>
      ) : !roadmap?.weeks?.length ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Map className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">Update your profile</h3>
            <p className="text-muted-foreground mt-2">Set your target role and skills in your profile to generate a roadmap.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {roadmap.weeks.map((week, index) => (
            <div key={week.week} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {week.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground">{week.week}</span>
                )}
              </div>
              
              <Card className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ${week.isCompleted ? 'border-primary/50 bg-primary/5' : ''} hover-elevate transition-all`}>
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={week.isCompleted ? "default" : "secondary"}>
                      Week {week.week}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{week.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Topics</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {week.topics.map(t => (
                        <Badge key={t} variant="outline" className="text-xs font-normal">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {week.resources && week.resources.length > 0 && (
                    <div className="pt-3 border-t">
                      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Recommended Resources
                      </h4>
                      <ul className="text-sm space-y-1.5">
                        {week.resources.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <Circle className="w-1.5 h-1.5 mt-1.5 fill-current shrink-0 opacity-50" />
                            <span className="leading-tight">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
