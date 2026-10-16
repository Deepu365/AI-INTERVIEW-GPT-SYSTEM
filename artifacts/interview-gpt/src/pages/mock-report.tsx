import {
  useGetMockInterview,
  useSubmitMockAnswer,
  useCompleteMockInterview
} from "@workspace/api-client-react";

import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Target,
  Award,
  BrainCircuit,
  MessageSquare,
  StopCircle,
  Play,
  Mic,
  MicOff,
  Volume2
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function MockSession() {
  const { id } = useParams();
  const { toast } = useToast();

  const interviewId = id ? Number(id) : undefined;

  const { data: session, isLoading, refetch } = useGetMockInterview(
    interviewId as any,
    { query: { enabled: !!interviewId } } as any
  );

  const submitAnswerMutation = useSubmitMockAnswer();
  const completeMutation = useCompleteMockInterview();

  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const listeningRef = useRef(false);

  useEffect(() => {
    if (session?.currentQuestion && session.status === "in_progress") {
      speakText(session.currentQuestion);
    }
  }, [session?.currentQuestion, session?.status]);

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: "Not supported",
        description: "Please type your answer."
      });
      return;
    }

    if (isListening) {
      listeningRef.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      setAnswer(transcript.trim());
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Error:", event.error);

      if (
        event.error === "network" ||
        event.error === "aborted" ||
        event.error === "no-speech"
      ) {
        return;
      }

      toast({
        title: "Voice Error",
        description: event.error
      });
    };

    recognition.onend = () => {
      if (listeningRef.current) {
        // Restarting immediately can throw InvalidStateError in
        // some browsers because the engine hasn't fully torn down
        // yet. A short delay avoids that race condition.
        setTimeout(() => {
          if (!listeningRef.current) return;
          try {
            recognition.start();
          } catch (e) {
            console.log("Restart failed, stopping mic", e);
            listeningRef.current = false;
            setIsListening(false);
            toast({
              title: "Mic stopped",
              description: "Please tap Speak again to continue."
            });
          }
        }, 250);
      } else {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      listeningRef.current = true;
      setIsListening(true);
    } catch (e) {
      setIsListening(true);
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading session...
      </div>
    );

  if (!session)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Session not found
      </div>
    );

  const handleAnswerSubmit = () => {
    if (!answer.trim()) return;

    submitAnswerMutation.mutate(
      {
        id: session.id,
        data: {
          questionIndex: session.questionsAnswered || 0,
          answer
        }
      } as any,
      {
        onSuccess: () => {
          setAnswer("");
          toast({
            title: "Answer recorded",
            description: "Loading next question..."
          });
          refetch();
        }
      }
    );
  };

  const handleComplete = () => {
    completeMutation.mutate(
      {
        id: session.id,
        data: { sessionData: "completed" }
      } as any,
      {
        onSuccess: () => {
          toast({
            title: "Interview completed!",
            description: "Generating your final report..."
          });
          refetch();
        }
      }
    );
  };

  // ---------------- ACTIVE SESSION ----------------
  if (session.status === "in_progress") {
    const qAnswered = session.questionsAnswered || 0;
    const qTotal = session.totalQuestions || 5;
    const progress = (qAnswered / qTotal) * 100;

    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight capitalize">
              {session.type} Interview Session
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Speak clearly and structure your thoughts.
            </p>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleComplete}
            disabled={completeMutation.isPending}
          >
            <StopCircle className="w-4 h-4 mr-2" />
            End Interview
          </Button>
        </div>

        <Progress value={progress} />

        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between gap-3">
              <span>
                {session.currentQuestion || "Tell me about yourself."}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => speakText(session.currentQuestion || "")}
              >
                <Volume2 />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <MessageSquare className="w-4 h-4" />
                Your Answer
              </label>

              <Button
                variant={isListening ? "destructive" : "outline"}
                onClick={toggleListening}
              >
                {isListening ? <MicOff /> : <Mic />}
                {isListening ? "Stop" : "Speak"}
              </Button>
            </div>

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-1"
              placeholder="Type or speak your answer..."
            />
          </CardContent>

          <div className="p-4 border-t flex justify-end">
            <Button
              onClick={handleAnswerSubmit}
              disabled={!answer.trim()}
            >
              Submit Answer <Play className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ---------------- REPORT ----------------
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/mock">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold capitalize">
            {session.type} Report
          </h1>
        </div>

        <Badge className="ml-auto capitalize">
          {session.status}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-5xl font-bold">
            {session.overallScore || 0}/100
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle><Award /> Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          {session.strengths?.map((s: any, i: number) => (
            <div key={i} className="flex gap-2">
              <CheckCircle2 className="text-green-500" />
              {s}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle><Target /> Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          {session.weaknesses?.map((w: any, i: number) => (
            <div key={i} className="flex gap-2">
              <ChevronRight className="text-orange-500" />
              {w}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle><BrainCircuit /> Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          {session.recommendations?.map((r: any, i: number) => (
            <div key={i} className="p-3 border rounded">
              {r}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
