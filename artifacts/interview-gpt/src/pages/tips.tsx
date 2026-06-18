import { useListTips } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";

export default function Tips() {
  const [category, setCategory] = useState<string>("technical");
  const { data: tips, isLoading } = useListTips({
    query: { queryKey: ['tips', category] }
  });

  const categories = [
    { id: "technical", label: "Technical" },
    { id: "behavioral", label: "Behavioral" },
    { id: "resume", label: "Resume" },
    { id: "negotiation", label: "Negotiation" },
    { id: "general", label: "General" }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <PageHeader
        icon={<Lightbulb className="w-7 h-7 text-white" />}
        title="Tips & Resources"
        description="Curated expert advice and proven strategies to help you ace every interview round."
        gradient="from-yellow-500 via-amber-500 to-orange-500"
        iconBg="bg-white/20"
        badge="Expert Curated"
      />

      <Tabs value={category} onValueChange={setCategory} className="w-full">
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {categories.map(c => (
            <TabsTrigger key={c.id} value={c.id} className="flex-1 min-w-[120px]">
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={category} className="mt-0">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading expert tips...</div>
          ) : !tips?.length ? (
            <div className="p-12 text-center border border-dashed rounded-lg bg-muted/20">
              <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No tips available for this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map(tip => (
                <Card key={tip.id} className="border-l-4 border-l-primary hover-elevate transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
                      {tip.content}
                    </div>
                    {tip.tags && tip.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                        {tip.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground flex items-center gap-1 font-normal">
                            <Tag className="w-3 h-3" /> {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
