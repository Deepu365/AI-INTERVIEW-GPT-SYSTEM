import { useListBookmarks, useDeleteBookmark } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkMinus, Code2, Users, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Bookmarks() {
  const { data: bookmarks, isLoading, refetch } = useListBookmarks();
  const deleteMutation = useDeleteBookmark();
  const { toast } = useToast();

  const handleRemove = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "Bookmark removed" });
        refetch();
      }
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'coding': return <Code2 className="w-4 h-4 text-blue-500" />;
      case 'hr': return <Users className="w-4 h-4 text-green-500" />;
      case 'aptitude': return <BrainCircuit className="w-4 h-4 text-purple-500" />;
      default: return null;
    }
  };

  const getLink = (type: string, id: number) => {
    switch (type) {
      case 'coding': return `/coding/${id}`;
      case 'hr': return `/hr?q=${id}`;
      case 'aptitude': return `/aptitude`;
      default: return '#';
    }
  };

  if (isLoading) return <div className="p-8">Loading bookmarks...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Questions</h1>
        <p className="text-muted-foreground mt-1">Review questions you've bookmarked for later.</p>
      </div>

      {!bookmarks?.length ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <BookmarkMinus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No bookmarks yet</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
              When you find a tricky question in practice sessions, save it to review later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {getIcon(bookmark.questionType)}
                    {bookmark.questionType}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive -mr-2 -mt-2"
                    onClick={() => handleRemove(bookmark.id)}
                  >
                    <BookmarkMinus className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg leading-tight mt-2 line-clamp-2">
                  <Link href={getLink(bookmark.questionType, bookmark.questionId)} className="hover:text-primary transition-colors">
                    {bookmark.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto pt-0 flex gap-2">
                {bookmark.difficulty && (
                  <Badge variant="secondary" className="capitalize">{bookmark.difficulty}</Badge>
                )}
                {bookmark.category && (
                  <Badge variant="outline" className="capitalize">{bookmark.category.replace('_', ' ')}</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
